import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import sand from "../assets/sand.png";
import { fakeAggregatedData } from "../data/fake-data";

const gridWidth = 4;
const gridLength = 7;
const terrainWidth = 40;
const terrainLength = 14;
const meshHeight = terrainLength / terrainWidth;

const getZValues = () => {
  const zValues: Array<number> = [];

  fakeAggregatedData.forEach((el) => {
    for (let j = 0; j < 7; j++){
      zValues.push(el[j].z);
    }
  });

  return zValues;
};

export const Terrain = () => {
  const terrainRef = useRef<THREE.BufferGeometry>();
  const texture = new THREE.TextureLoader().load(sand);

  useEffect(() => {
    const geometry = terrainRef.current!;
    const positionArray = geometry.attributes.position.array as number[];
    const zValues = getZValues();

    for (let i = 0; i < zValues.length; i++){
      positionArray[i * 3 + 2] = zValues[i];
    }

    geometry.computeVertexNormals();
    (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[.05, meshHeight, 0]}>
      <planeBufferGeometry
        attach="geometry"
        ref={terrainRef}
        center-x={0} center-y={0}
        args={[terrainWidth, terrainLength, gridWidth, gridLength]}
      />
      <meshStandardMaterial
        attach={"material"}
        map={texture}
      />
    </mesh>
  );
};

