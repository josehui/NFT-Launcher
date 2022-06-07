// import { Box, Center,Flex, VStack, Spinner, Text, Image} from '@chakra-ui/react'
import {
  Text,
  Spinner,
  VStack,
  Center,
  Button,
  HStack,
  Link,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import * as rax from "retry-axios";
import { useState, useEffect } from "react";
import Carousels from "./Carousels";
import Alert from "./Alert";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const Loader = () => (
  <VStack spacing={4} align="center">
    <Text fontSize="xl">Image generating...</Text>
    <Spinner mx={4} size="xl" />
  </VStack>
);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Viewer = ({ Item }) => {
  const [GeneratingImage, setGeneratingImage] = useState(false);
  const [BundleUrl, setBundleUrl] = useState("");
  const [PreviewImages, setPreviewImages] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  rax.attach();
  axios.defaults.baseURL = import.meta.env.VITE_API_SERVER;

  useEffect(async () => {
    setGeneratingImage(true);
    setBundleUrl("");
    const reqConfig = {
      raxConfig: {
        retry: 25,
        retryDelay: 4000,
        statusCodesToRetry: [
          [400, 429],
          [500, 599],
        ],
        backoffType: "static",
        onRetryAttempt: (err) => {
          const cfg = rax.getConfig(err);
          console.log(
            `Get images retry attempt -  #${cfg.currentRetryAttempt}`
          );
        },
      },
    };
    try {
      await delay(1000);
      const res = await axios.get(
        `/api/GetGeneratedImage?id=${Item.clientRequestId}`,
        reqConfig
      );
      setBundleUrl(res.data.data.bundleUrl);
      setPreviewImages(res.data.data.previewImages);
      setGeneratingImage(false);
    } catch (error) {
      console.log(error);
      setGeneratingImage(false);
      setErrorMsg("Something went wrong, please try again.");
    }
  }, [Item]);

  return (
    <>
      <Center mt={10}>{GeneratingImage && <Loader />}</Center>
      {ErrorMsg && <Alert msg={ErrorMsg} />}
      {PreviewImages && (
        <Carousels images={PreviewImages} setImages={setPreviewImages} />
      )}
      {BundleUrl && (
        <HStack mt={10} spacing={8} justify="center">
          <Button onClick={onOpen}>Buy me coffee</Button>
          <Link href={BundleUrl} style={{ textDecoration: "none" }} isExternal>
            <Button colorScheme="messenger">Download zip</Button>
          </Link>
        </HStack>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy me coffee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Thanks but support{" "}
            <Link
              color="teal.500"
              href="https://www.facebook.com/fundraisers/explore/search/charities/?query=ukraine"
              isExternal
            >
              Ukraine
            </Link>{" "}
            instead
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() =>
                toast({
                  colorScheme: "teal",
                  title: "Ok, I love you",
                  description: "Let's get lunch!",
                  status: "info",
                  position: "top",
                  duration: 4000,
                  isClosable: true,
                  render: () => (
                    <Box color="white" borderRadius="md" p={3} bg="blue.300">
                      <b>Ok, I love you</b> <br />
                      <Link
                        color="teal"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        isExternal
                      >
                        https://payme.hsbc/muscleman
                      </Link>
                    </Box>
                  ),
                })
              }
            >
              I insist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Viewer;
