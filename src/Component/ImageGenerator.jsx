import Uploader from "./FileUploader";
import Viewer from "./ImageViewer";
import { useState } from "react";
import {
  Container,
  Stack,
  Switch,
  Text,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

const ImageGenerator = () => {
  const [Item, setItem] = useState("");
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [PixelStyle, setPixelStyle] = useState(false);
  const [EditImage, setEditImage] = useState(false);
  return (
    <Container maxW={"2xl"}>
      <Stack
        mb={12}
        direction="row"
        spacing={{ base: 2, md: 24 }}
        justify="center"
      >
        <HStack>
          <Switch
            size="lg"
            onChange={() => {
              setEditImage(!EditImage);
            }}
            isChecked={EditImage}
          />
          <Text>Edit before upload</Text>
        </HStack>
        <HStack>
          <Tooltip label="Trust me, don't do it" placement="top-start">
            <Switch
              size="lg"
              onChange={() => {
                setPixelStyle(!PixelStyle);
              }}
              isChecked={PixelStyle}
            />
          </Tooltip>
          <Text>Pixel style</Text>
        </HStack>
      </Stack>
      <Uploader
        setItem={setItem}
        setImageUploaded={setImageUploaded}
        EditImage={EditImage}
        PixelStyle={PixelStyle}
      />
      {ImageUploaded && <Viewer Item={Item} />}
      {/* <ImageEditor /> */}
    </Container>
  );
};

export default ImageGenerator;
