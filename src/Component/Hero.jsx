// import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Link,
} from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";
const Hero = () => {
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head> */}

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          my={{ base: 5, md: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Launch your NFT project <br />
            <Text as={"span"} color={"blue.200"}>
              in 10 minutes
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Why work 9-6 when you an be rich by uploading images to blockchain?{" "}
            <br />
            NFT Launcher lets you launch NFT and earn <s>scam</s> money with 0
            effort, 0 creativity and 0 knowledge
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"blue.200"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              <Link _hover={{ textDecoration: "none" }} href="/#guide">
                Launch your NFT now
              </Link>
            </Button>
            <Button variant={"link"} colorScheme={"teal"} size={"sm"}>
              <Link as={RLink} to="/about">
                Learn more
              </Link>
            </Button>
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
              Upload a random image to get started
            </Heading>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Hero;
