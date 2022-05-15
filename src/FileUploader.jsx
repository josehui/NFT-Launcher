import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Container, Center} from '@chakra-ui/react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import './style/FilePond.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import uploadFileToBlob, { isStorageConfigured } from './lib/azure-blob';

import ImageEditor from './TEST-ImageEditor'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageEdit)

const Uploader = () => {
  const [files, setFiles] = useState([])
  return (
    <Container>
      <FilePond
        acceptedFileTypes = {['image/*']}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            uploadFileToBlob(file)
            .then(res => {
              load(res)
              console.log(res)
            })
            .catch(err => {
              error(err)
              console.log(err)
            })
            
            return {
              abort: () => {
                console.log('aborted')
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
        <ImageEditor />
      </Container>
    </Container>
  )
}

export default Uploader