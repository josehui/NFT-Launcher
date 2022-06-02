import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

const TeamInfo = [
  {
    name: "Muscle man",
    des: "Code",
    img: "https://ih1.redbubble.net/image.2017580507.9449/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    name: "Fatboi 1",
    des: "Full of ideas; did nothing",
    img: "https://m.media-amazon.com/images/I/51687CO61NL._AC_SL1500_.jpg",
  },
  {
    name: "Fatboi 2",
    des: "Photoshop your image",
    img: "https://m.media-amazon.com/images/I/51687CO61NL._AC_SL1500_.jpg",
  },
];
const Team = () => {
  return (
    <>
      <Heading as="h2" size="xl" mt={6} mb={2} textAlign="center">
        World's mightiest heroes
      </Heading>
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        w="full"
        p={5}
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid columns={[1, 1, 2, 3]} spacingX={20} spacingY={10}>
          {TeamInfo.map((member) => (
            <Box
              w="xs"
              bg={useColorModeValue("white", "gray.800")}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={56}
                fit="cover"
                src={member.img}
                alt="avatar"
              />

              <Box py={5} textAlign="center">
                <Link
                  display="block"
                  fontSize="2xl"
                  color={useColorModeValue("gray.800", "white")}
                  fontWeight="bold"
                >
                  {member.name}
                </Link>
                <chakra.span
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {member.des}
                </chakra.span>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Team;
