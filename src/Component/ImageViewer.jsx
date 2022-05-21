// import { Box, Center,Flex, VStack, Spinner, Text, Image} from '@chakra-ui/react'
import {
  Text,
  Box,
  Image,
  Spinner,
  VStack,
  Center,
} from "@chakra-ui/react";
import axios from 'axios';
import * as rax from 'retry-axios';
import { useState, useEffect } from 'react';
import Carousels from "./Carousels";



const Loader = () => (
  <VStack
    spacing={4}
    align='center'
  >
    <Text fontSize='xl'>Image generating...</Text>
    <Spinner mx={4} size='xl' />
  </VStack>
)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))


const Viewer = ({ Item }) => {
  const [GeneratingImage, setGeneratingImage] = useState(false)
  const [ImageUrl, setImageUrl] = useState("")
  const [PreviewImages, setPreviewImages] =  useState("")
  rax.attach();
  axios.defaults.baseURL = import.meta.env.VITE_API_SERVER

  useEffect(async () => {
    setGeneratingImage(true)
    setImageUrl("")
    const reqConfig = {
      raxConfig: {
        retry: 5,
        retryDelay: 1000,
        statusCodesToRetry: [[400, 429], [500, 599]],
        onRetryAttempt: err => {
          const cfg = rax.getConfig(err);
          console.log(`Get images retry attempt -  #${cfg.currentRetryAttempt}`);
        }
      }
    }
    try {
      await delay(1000)
      const res = await axios.get(`/api/GetGeneratedImage?id=${Item.clientRequestId}`, reqConfig)
      setImageUrl(res.data.data.url)
      console.log(res.data.data.previewImages)
      console.log(typeof(res.data.data.previewImages))
      setPreviewImages(res.data.data.previewImages)
      setGeneratingImage(false)
      
    } catch(error) {
      console.log(error)
      setGeneratingImage(false)
    }
  }, [Item])

  return (
    <>
    <Center mt={10}>
    { GeneratingImage && 
      <Loader />
    }
    </Center>
    {PreviewImages && 
      <Carousels images={PreviewImages}/>
    }
    </>
    
  )
  
}

export default Viewer