import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Container, Center} from '@chakra-ui/react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import '@/src/style/FilePond.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import uploadFileToBlob, { isStorageConfigured } from '@/src/lib/azure-blob';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageEdit)

const Uploader = ({ setItem, setImageUploaded}) => {
  const [files, setFiles] = useState([])
  return (
    <Container>
      <FilePond
        acceptedFileTypes = {['image/*']}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        instantUpload={false}
        onprocessfile = {() => {setImageUploaded(true)}}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            uploadFileToBlob(file)
            .then(res => {
              console.log(res.clientRequestId)  
              load(res)
              setItem(res)

            })
            .catch(err => {
              error(err)
              console.log(err)
            })
            
            return {
              abort: () => {
                abort()
              }
            }
        }
        }}
        name="files"
        labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
      <Container>
      </Container>
    </Container>
  )
}

export default Uploader