import { useState } from "react";
import {
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "@/src/style/FilePond.css";

import path from "path-browserify";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import uploadFileToBlob from "@/src/lib/azure-blob";
import ImageEditor from "./ImageEditor";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageEdit
);

const generateImageName = (sourceFileName, isPixel = false) => {
  const pixelTag = isPixel ? "P-" : "";
  return `F-${pixelTag}${Math.random().toString(36).substring(2, 13)}${
    path.parse(sourceFileName).ext
  }`;
};

const Uploader = ({ setItem, setImageUploaded, EditImage, PixelStyle }) => {
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageToEdit, setImageToEdit] = useState();

  const ManualClose = () => {
    return (
      <>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={imageEditor.onclose}
        >
          <ModalOverlay />
          <ModalContent minW={[350, 400, 600, 800]}>
            <ModalHeader>Edit your image</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {imageToEdit && (
                <ImageEditor
                  image={imageToEdit}
                  saveEdit={imageEditor.onconfirm}
                  closeEdit={imageEditor.oncancel}
                />
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={imageEditor.oncancel}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  const imageEditor = {
    // Called by FilePond to edit the image
    // - should open your image editor
    // - receive          s file object and image edit instructions
    open: (file) => {
      const objectURL = window.URL.createObjectURL(file);
      setImageToEdit(objectURL);
      onOpen();
    },

    // Callback set by FilePond
    // - should be called by the editor when user confirms editing
    // - should receive output object, resulting edit information
    onconfirm: (output) => {
      fetch(output.imageBase64)
        .then((res) => res.blob())
        .then((blob) => {
          const fileObject = new File([blob], output.fullName, {
            type: output.mimeType,
          });
          setFiles([fileObject]);
          console.log("edited_file", fileObject);
          onClose();
        });
    },

    // Callback set by FilePond
    // - should be called by the editor when user cancels editing
    oncancel: () => {
      console.log("cancelled");
      onClose();
    },

    // Callback set by FilePond
    // - should be called by the editor when user closes the editor
    onclose: () => {
      console.log("closed");
      setFiles([]);
      onClose();
    },
  };

  return (
    <Container>
      <FilePond
        acceptedFileTypes={["image/*"]}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        instantUpload={!EditImage}
        allowImageEdit={EditImage}
        imageEditEditor={imageEditor}
        styleImageEditButtonEditItemPosition="center"
        onprocessfile={() => {
          setImageUploaded(true);
        }}
        server={{
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options
          ) => {
            uploadFileToBlob(file, generateImageName(file.name, PixelStyle))
              .then((res) => {
                load(res);
                setItem(res);
              })
              .catch((err) => {
                error(err);
                console.log(err);
              });

            return {
              abort: () => {
                abort();
              },
            };
          },
        }}
        name="files"
        labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
      <ManualClose />
    </Container>
  );
};

export default Uploader;
