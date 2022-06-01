import Uploader from './FileUploader'
import ImageEditor from './TEST-ImageEditor'
import Viewer from './ImageViewer'
import { useState } from 'react'
import { Container, Button, HStack, Link, useDisclosure, useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'



const ImageGenerator = () => {
  const [Item, setItem] = useState("")
  const [ImageUploaded, setImageUploaded] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  return (
    <Container maxW={'2xl'}>
      <Uploader setItem={setItem} setImageUploaded={setImageUploaded}/>
      {ImageUploaded && <Viewer Item={Item}/>}
      {/* <ImageEditor /> */}
      <HStack mt={10} spacing={8} justify='center'>
        <Button onClick={onOpen}>Buy me coffee</Button>
        <Button colorScheme='messenger'>Download Zip</Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy me coffee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Thanks but support {' '}
            <Link color='teal.500' href="https://www.facebook.com/fundraisers/explore/search/charities/?query=ukraine" isExternal>
              Ukraine
            </Link>
            {' '}instead
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() =>
              toast({
                colorScheme: 'teal',
                title: 'You are on9, I like you',
                description: "Let's get lunch!",
                status: 'info',
                position: 'top',
                duration: 4000,
                isClosable: true,
            })}>
            I insist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Container>
  )
}

export default ImageGenerator