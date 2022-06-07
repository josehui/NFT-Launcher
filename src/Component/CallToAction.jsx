import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import samplePic from "@//Assets/Images/sample.png";
import deepSea from "@//Assets/Images/deep-sea.jpeg";
import javaPic from "@//Assets/Images/java.webp";

export const CallToActionOne = (props) => {
  return (
    <Container id="guide" maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            height={[300, 300, 400, 400]}
            rounded={"2xl"}
            boxShadow={"2xl"}
            // width={"100%"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={samplePic}
            />
          </Box>
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2  xl", sm: "3xl", lg: "4xl" }}
          >
            <Text as={"span"} color={".400"}>
              1. Upload and generate your future NFTs
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Upload and edit your image then we handle the rest! A set of 10
            artistic images will be crafted by our hard-working employee in{" "}
            <b>real-time</b>
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"facebook"}
              _hover={{ bg: "red.500" }}
            >
              Get started
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export const CallToActionSecond = (props) => {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row-reverse" }}
      >
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"100%"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={deepSea}
            />
          </Box>
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2  xl", sm: "3xl", lg: "4xl" }}
          >
            <Text as={"span"} color={".400"}>
              2. Publish your NFTs to Opensea
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Publish your handcrafted NFTs to the most popular market on the
            planet
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"facebook"}
              _hover={{ bg: "red.500" }}
            >
              Lazy, later do
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export const CallToActionThird = (props) => {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            height={[300, 300, 400, 400]}
            rounded={"2xl"}
            boxShadow={"2xl"}
            // width={"100%"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={javaPic}
            />
          </Box>
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2  xl", sm: "3xl", lg: "4xl" }}
          >
            <Text as={"span"} color={".400"}>
              3. Generate your project website
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Think of some marketing buzzwords and our talented web developers
            will create your beautfully designed website in <b>real-time</b>
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"facebook"}
              _hover={{ bg: "red.500" }}
            >
              Lazy, later do
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

const CallToActions = () => (
  <>
    <CallToActionOne />
    <CallToActionSecond />
    <CallToActionThird />
  </>
);

export default CallToActions;
