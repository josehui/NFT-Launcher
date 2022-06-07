import functools
import os
import io
import tensorflow as tf
import tensorflow_hub as hub
from . import storage_client
import random
import zipfile


# @title Load example images  { display-mode: "form" }

# @param {type:"string"}
# style_image_url = 'https://nftlstorage.blob.core.windows.net/style-art-basel-2022/art-basel-2022-1.jpg'
style_base_url = 'https://nftlstorage.blob.core.windows.net/'
styles_container = 'style-art-basel-2022'

# The content image size can be arbitrary.
output_image_size = 384
output_img_size = (output_image_size, output_image_size)
# Number of generated images
output_batch_size = 10
preview_size = 5
# Model trained with 256x256
style_img_size = (256, 256)

# Load TF Hub module.
hub_handle = 'https://nftlstorage.blob.core.windows.net/tf-model/magenta_arbitrary-image-stylization-v1-256_2.tar.gz'
hub_module = hub.load(hub_handle)

# Load TFLite model
style_predict_path = tf.keras.utils.get_file(
    'style_predict.tflite', 'https://nftlstorage.blob.core.windows.net/tf-model/magenta_arbitrary-image-stylization-v1-256_int8_prediction_1.tflite')
style_transform_path = tf.keras.utils.get_file(
    'style_transform.tflite', 'https://nftlstorage.blob.core.windows.net/tf-model/magenta_arbitrary-image-stylization-v1-256_int8_transfer_1.tflite')


def get_random_styles(sample_size=10):
    result = []
    count = 0
    # Reservoir sampling in case number of blobs is very large
    # Likely, overkill, but happy to learn something new.
    # Simple solution would be list(style_gen)
    style_gen = storage_client.listFile(styles_container)
    for style in style_gen:
        count += 1
        if count <= sample_size:
            result.append(
                f"{style_base_url}{styles_container}/{style.name}")
        else:
            r = random.randint(0, count)
            if r < sample_size:
                result[r] = f"{style_base_url}{styles_container}/{style.name}"

    return result


def crop_center(image):
    """Returns a cropped square image."""
    shape = image.shape
    new_shape = min(shape[1], shape[2])
    offset_y = max(shape[1] - shape[2], 0) // 2
    offset_x = max(shape[2] - shape[1], 0) // 2
    image = tf.image.crop_to_bounding_box(
        image, offset_y, offset_x, new_shape, new_shape)
    return image


@functools.lru_cache(maxsize=None)
def load_image(image_url, image_size=(256, 256), preserve_aspect_ratio=True):
    """Loads and preprocesses images."""
    # Cache image file locally.
    image_name = os.path.basename(image_url)
    image_path = tf.keras.utils.get_file(image_name, image_url)
    # Load and convert to float32 numpy array, add batch dimension, and normalize to range [0, 1].
    img = tf.io.decode_image(
        tf.io.read_file(image_path),
        channels=3, dtype=tf.float32, expand_animations=False)[tf.newaxis, ...]
    img = crop_center(img)
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img


def generate_image(content_image, style_image_url, isPixel):
    style_image = load_image(style_image_url, style_img_size)
    style_image = tf.nn.avg_pool(
        style_image, ksize=[3, 3], strides=[1, 1], padding='SAME')
    stylized_image = hub_module(tf.constant(
        content_image), tf.constant(style_image))[0]
    if (isPixel):
        stylized_image = tf.image.resize(
            stylized_image, (48, 48), preserve_aspect_ratio=True)
        stylized_image = tf.image.resize(
            stylized_image, (output_image_size, output_image_size), method='nearest', preserve_aspect_ratio=True)
    img_data = io.BytesIO()
    tf.keras.utils.save_img(img_data, stylized_image[0], file_format='jpeg')
    img_data.seek(0)
    return img_data

# Function to run style prediction on preprocessed style image.


def run_style_predict(preprocessed_style_image):
    # Load the model.
    interpreter = tf.lite.Interpreter(model_path=style_predict_path)

    # Set model input.
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    interpreter.set_tensor(input_details[0]["index"], preprocessed_style_image)

    # Calculate style bottleneck.
    interpreter.invoke()
    style_bottleneck = interpreter.tensor(
        interpreter.get_output_details()[0]["index"]
    )()

    return style_bottleneck

# Run style transform on preprocessed style image


def run_style_transform(style_bottleneck, preprocessed_content_image):
    # Load the model.
    interpreter = tf.lite.Interpreter(model_path=style_transform_path)

    # Set model input.
    input_details = interpreter.get_input_details()
    interpreter.allocate_tensors()

    # Set model inputs.
    interpreter.set_tensor(
        input_details[0]["index"], preprocessed_content_image)
    interpreter.set_tensor(input_details[1]["index"], style_bottleneck)
    interpreter.invoke()

    # Transform content image.
    stylized_image = interpreter.tensor(
        interpreter.get_output_details()[0]["index"]
    )()

    return stylized_image


def generate_image_lite(content_image, style_image_url, isPixel):
    style_image = load_image(style_image_url, style_img_size)
    style_bottleneck = run_style_predict(style_image)
    stylized_image = run_style_transform(style_bottleneck, content_image)
    if (isPixel):
        stylized_image = tf.image.resize(
            stylized_image, (48, 48), preserve_aspect_ratio=True)
        stylized_image = tf.image.resize(
            stylized_image, (output_image_size, output_image_size), method='nearest', preserve_aspect_ratio=True)
    img_data = io.BytesIO()
    tf.keras.utils.save_img(img_data, stylized_image[0], file_format='jpeg')
    img_data.seek(0)
    return img_data


def generate_zip(files):
    mem_zip = io.BytesIO()
    with zipfile.ZipFile(mem_zip, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        for f in files:
            zf.writestr(f[0], f[1])
    return mem_zip.getvalue()


def process_images(source_image_url, isPixel=False):
    preview_images = []
    image_files = []
    source_image = load_image(source_image_url, output_img_size)
    image_name_prefix = os.path.splitext(os.path.basename(source_image_url))[0]
    random_styles_url = get_random_styles(output_batch_size)
    for i, style in enumerate(random_styles_url):
        img_data = generate_image_lite(source_image, style, isPixel)
        img_name = f"{image_name_prefix}_nftl_{i}.jpg"
        if i < preview_size:
            preview_img = storage_client.uploadFile(
                img_data, file_name=img_name, file_type='image/jpeg')
            preview_images.append({'img': preview_img})
        image_files.append((img_name, img_data.getvalue()))
    image_zip = generate_zip(image_files)
    zip_name = f"{image_name_prefix}_nftl.zip"
    zip_url = storage_client.uploadFile(image_zip, file_name=zip_name)
    return (preview_images, zip_url)
