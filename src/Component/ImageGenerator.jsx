import Uploader from "./FileUploader";
import ImageEditor from "./TEST-ImageEditor";
import Viewer from "./ImageViewer";
import { useState } from "react";
import { Container, Stack, Switch, Text, HStack } from "@chakra-ui/react";

const ImageGenerator = () => {
  const [Item, setItem] = useState("");
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [PixelStyle, setPixelStyle] = useState(false);
  const [EditImage, setEditImage] = useState(false);
  return (
    <Container maxW={"2xl"}>
      <Stack mb={12} direction="row" spacing={[5, 12, 24]} justify="center">
        <HStack>
          <Switch
            size="lg"
            onChange={() => {
              setEditImage(!EditImage);
            }}
            isChecked={EditImage}
          />
          <Text>Edit image before upload</Text>
        </HStack>
        <HStack>
          <Switch
            size="lg"
            onChange={() => {
              setPixelStyle(!PixelStyle);
            }}
            isChecked={PixelStyle}
          />
          <Text>Pixel style (Trust me, dont do it)</Text>
        </HStack>
      </Stack>
      <Uploader
        setItem={setItem}
        setImageUploaded={setImageUploaded}
        PixelStyle={PixelStyle}
      />
      {ImageUploaded && <Viewer Item={Item} />}
      <ImageEditor />
    </Container>
  );
};

export default ImageGenerator;
