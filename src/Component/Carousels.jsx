import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  chakra,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

const Carousels = ({ images, setImages }) => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [ClickCount, setClickCount] = useState(0);

  const slidesCount = images.length;

  const easterEgg = () => {
    if (ClickCount === 9) {
      setImages([
        ...images,
        {
          img: "https://nftlstorage.blob.core.windows.net/coolstuff/surprise.jpeg",
        },
      ]);
    }
    setClickCount(ClickCount + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <>
      <chakra.span
        fontSize="md"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        Image preview
      </chakra.span>
      <Flex
        w="full"
        bg={useColorModeValue("gray.200", "gray.600")}
        borderRadius={10}
        p={5}
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" overflow="hidden" pos="relative">
          <Flex w="full" {...carouselStyle}>
            {images.map((slide, sid) => (
              <Box
                onClick={sid === 4 ? easterEgg : null}
                key={`slide-${sid}`}
                boxSize="full"
                shadow="md"
                flex="none"
              >
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <Center>
                  <Image
                    src={slide.img}
                    alt="carousel image"
                    // boxSize="full"
                    backgroundSize="cover"
                  />
                </Center>
              </Box>
            ))}
          </Flex>
          <Text {...arrowStyles} left="0" onClick={prevSlide}>
            &#10094;
          </Text>
          <Text {...arrowStyles} right="0" onClick={nextSlide}>
            &#10095;
          </Text>
          <HStack justify="center" pos="absolute" bottom="8px" w="full">
            {Array.from({ length: slidesCount }).map((_, slide) => (
              <Box
                key={`dots-${slide}`}
                cursor="pointer"
                boxSize={["7px", "15px"]}
                m="0 2px"
                bg={
                  currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"
                }
                rounded="50%"
                display="inline-block"
                transition="background-color 0.6s ease"
                _hover={{ bg: "blackAlpha.800" }}
                onClick={() => setSlide(slide)}
              ></Box>
            ))}
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Carousels;
