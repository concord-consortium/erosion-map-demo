import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Terrain } from "./terrain";

import "./app.scss";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 100;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

export const App = () => {
  const cameraPos: [number, number, number] = [-20, 10, 10];
  return (
    <div className="canvas-container">
      <Canvas camera={{ fov: 33, position: cameraPos }}>
        <CameraController/>
        <color attach="background" args={["blue"]}/>
        <directionalLight color="white" position={[0, 0, 5]} />
        <ambientLight intensity={0.1}/>
        <Terrain/>
      </Canvas>
    </div>
  );
};
