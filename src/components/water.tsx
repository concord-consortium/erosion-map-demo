import React from "react";
import * as THREE from "three";
import water from "../assets/water.png";

const terrainWidth = 40;
const terrainLength = 14;
const meshHeight = terrainLength / terrainWidth;

export const Water = () => {
  const texture = new THREE.TextureLoader().load(water);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, meshHeight, 9]}
    >
      <planeBufferGeometry
        attach={"geometry"}
        args={[terrainWidth, 4]}
      />
      <meshStandardMaterial attach={"material"} map={texture}/>
    </mesh>
  );
};
