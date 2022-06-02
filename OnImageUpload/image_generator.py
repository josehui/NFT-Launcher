import functools
import os
import io
from matplotlib import gridspec
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import logging
from . import storage_client

# @title Load example images  { display-mode: "form" }

# @param {type:"string"}
content_image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Golden_Gate_Bridge_from_Battery_Spencer.jpg/640px-Golden_Gate_Bridge_from_Battery_Spencer.jpg'
# @param {type:"string"}
style_image_url = 'https://lh3.googleusercontent.com/-ujfQIoEPFrdEP6JtNMDRSFT7-k_Hs0PHgxHFICVq130XA4NJso6D3Tfhd-zPV5tBEbYAFt35rR57K_48hKd7qV_Xlm5-ndYKaODntiyE9RUMCf7QakOe6XKKr_jG1nxz_oWbTyaGzjP7kpOC3X5SpsyQBy4lqqT5dLA8eL_EAxADRE4OqMKG71Wib9fcnC4Tnnw2BAAdFwfXY2dXSJATvHwTABDbjwjhSkekRvUuLufu759BZkZv0oB0yzyWt71yB-JC8HgqbeA8j5RQIZ5_OnC9ZP72JXCdcAZlBRSqgzkLJ2a9IYU9W88EDvo523z87C_6P5iKsYrXDhMUtvKwFW6zbDJkN51r1hIg2jGjCIwwoN8foaHyDnxZdMvU7CXjNo1PUX_eEnnoEuJhRbcZeFNIJ3zjzvDNji98RoAPLx4Zyf-UkoIHmFGVLLczYd9_gS3l67BqkhtIlsJ0JuJk0GgYTqc4BN4SyTGfG_NPoB3lwgcP_x3Hig8IEYCb7Hn1lGer3aKTZof1G1mRawg1dG_afyPe6-ulH6t6k0VwXP88WLGuJH1-SC98nqXypTYQHYDd0_483IwCc_s4OZipM55pLePWQwOrzyScRAO4qjkpuMS_e5JZAw86Pj7Bjjuxd_W4uTGRJk1gwRySQR_WvJJTL7jTtwVJAo-A6vJ39gotSu0NgGVfUy5uk77n-uoTWNXBqMQTvL229A4mJyLaFwSy-6aTkJx7jII4xq6F_w-fB-RlJbi1WcnNpkTlqU=w768-h1024-no?authuser=0'
output_image_size = 500  # @param {type:"integer"}

# The content image size can be arbitrary.
content_img_size = (output_image_size, output_image_size)
# Model trained with 256x256
style_img_size = (256, 256)

# Load TF Hub module.
hub_handle = '/Users/josehui/Downloads/magenta_arbitrary-image-stylization-v1-256_2'
hub_module = hub.load(hub_handle)


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
    image_path = tf.keras.utils.get_file(
        os.path.basename(image_url)[-128:], image_url)
    # Load and convert to float32 numpy array, add batch dimension, and normalize to range [0, 1].
    img = tf.io.decode_image(
        tf.io.read_file(image_path),
        channels=3, dtype=tf.float32)[tf.newaxis, ...]
    img = crop_center(img)
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img


def generate_image():
    content_image = load_image(content_image_url, content_img_size)
    style_image = load_image(style_image_url, style_img_size)
    style_image = tf.nn.avg_pool(
        style_image, ksize=[3, 3], strides=[1, 1], padding='SAME')
    stylized_image = hub_module(tf.constant(
        content_image), tf.constant(style_image))[0]
    img_file = io.BytesIO()
    tf.keras.utils.save_img(img_file, stylized_image[0], file_format='jpeg')
    img_file.seek(0)
    return img_file

# main batch process func


def process_images():
    img_file = generate_image()
    res = storage_client.uploadFile(img_file)
    return res


def testHihi():
    logging.info('testing Hhi')
    print('aabb', type(hub_module))
    print("TF Version: ", tf.__version__)
    print("TF Hub version: ", hub.__version__)
    print("Eager mode enabled: ", tf.executing_eagerly())
    print("GPU available: ", tf.config.list_physical_devices('GPU'))
    return
