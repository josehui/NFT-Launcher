import { Box, Heading, Text, Center, Container } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import PortfolioMeme from '@/public/images/meme1.jpeg'
import NFTmeme from '@/public/images/NFTmeme.png'
const About = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Crpyto is magic, just like the stock market
      </Heading>
      <Text color={'gray.500'}>
        Who needs research when you have memes
      </Text>
      <Center mt={5}>
        <img src={NFTmeme} alt="hihi"></img>
      </Center>
      <Container maxW='600px'>
        <Center mt={5}>
            <img src={PortfolioMeme} alt="hihi"></img>
        </Center>
      </Container>
    </Box>
  );
}

export default About