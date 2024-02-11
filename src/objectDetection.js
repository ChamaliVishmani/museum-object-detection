import { useCallback, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { Container } from "@chakra-ui/react";
import Webcam from "react-webcam";

function ObjectDetection({ setObjectNo }) {
  const webcamRef = useRef(null);

  const detect = useCallback(async (net) => {
    // check if data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const classes = await obj[4].array();
      const scores = await obj[3].array();

      const confidence = 0.8;
      if (scores[0][0] > confidence) {
        const objectNumber = classes[0][0];
        setObjectNo(objectNumber);
      }

      // Dispose tensors
      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  }, []);

  const runCoco = useCallback(async () => {
    // Load network
    const modelUrl =
      "https://musuemtfod.s3.us-south.cloud-object-storage.appdomain.cloud/model.json";

    const loadedNet = await tf.loadGraphModel(modelUrl);

    // Loop and detect objects
    const intervalId = setInterval(() => {
      detect(loadedNet);
    }, 16.7);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [detect]);

  useEffect(() => {
    runCoco();
  }, [runCoco]);

  return (
    <Container>
      <Webcam
        ref={webcamRef}
        muted={true}
        videoConstraints={{ facingMode: "environment" }}
      />
    </Container>
  );
}

export default ObjectDetection;
