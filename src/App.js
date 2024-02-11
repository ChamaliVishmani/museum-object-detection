import {
  Card,
  CardBody,
  Center,
  ChakraProvider,
  Container,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import ObjectDetection from "./objectDetection";
import { useState } from "react";

const objectDescription = require("./objectDescriptions.json");

function App() {
  const [objectNo, setObjectNo] = useState();
  return (
    <ChakraProvider>
      <Card
        backgroundImage={require("./mueumObjects/topImage.jpg")}
        backgroundSize="cover"
        minHeight={450}
        maxHeight={500}
        width="100%"
        align={"center"}
      >
        <Heading size="2xl" color="black" padding={4}>
          Colombo National Museum
        </Heading>

        <Heading size="2xl" color="GrayText" padding={4}>
          Cultural Garment Scanner
        </Heading>
      </Card>
      <Container>
        <Card variant="filled" margin={4}>
          <Center>
            <Heading size="sm" margin="4">
              Scan your object here
            </Heading>
          </Center>
          <ObjectDetection setObjectNo={setObjectNo} />
        </Card>

        {objectNo == undefined ? (
          <Card size="lg" margin={4} variant={"unstyled"}>
            <Center>
              <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text padding={4} color="GrayText">
                Scanning object...
              </Text>
            </Center>
          </Card>
        ) : (
          <Card size="lg" margin={4}>
            <CardBody>
              <Image src={require(`./mueumObjects/${objectNo}.jpg`)} />
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  {objectDescription[objectNo].objectName}
                </Heading>
                <Text scrollBehavior={"auto"}>
                  {objectDescription[objectNo].description}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        )}
      </Container>
    </ChakraProvider>
  );
}

export default App;
