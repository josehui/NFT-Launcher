import Uploader from './FileUploader'
import ImageEditor from './TEST-ImageEditor'
import Viewer from './ImageViewer'
import { useState } from 'react'
import { Container } from '@chakra-ui/react'



const ImageGenerator = () => {
  const [Item, setItem] = useState("")
  const [ImageUploaded, setImageUploaded] = useState(false)
  return (
    <Container maxW={'2xl'}>
      <Uploader setItem={setItem} setImageUploaded={setImageUploaded}/>
      {ImageUploaded && <Viewer Item={Item}/>}
      {/* <ImageEditor /> */}
  </Container>
  )
}

export default ImageGenerator