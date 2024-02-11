import { Center, ChakraProvider, Container, Heading } from "@chakra-ui/react";
import ObjectDetection from "./objectDetection";
import { useState } from "react";

function App() {
  const [objectNo, setObjectNo] = useState();
  return (
    <ChakraProvider>
      <Container centerContent>
        <Heading size="sm">Scan your object here</Heading>
        <ObjectDetection setObjectNo={setObjectNo} />
        {objectNo && <p>Object No: {objectNo}</p>}
      </Container>
    </ChakraProvider>
  );
}

export default App;
