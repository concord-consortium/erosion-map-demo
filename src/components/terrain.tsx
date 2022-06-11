import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BufferAttribute } from "three";
import { fakeAggregatedData } from "../data/fake-data";

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

  useEffect(() => {
    const geometry = terrainRef.current!;
    const positionArray = geometry.attributes.position.array as number[];
    const zValues = getZValues();

    for (let i = 0; i < zValues.length; i++){
      positionArray[i * 3 + 2] = zValues[i];
    }

    geometry.computeVertexNormals();
    (geometry.attributes.position as BufferAttribute).needsUpdate = true;
  });

  return (
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry
        attach="geometry"
        ref={terrainRef}
        args={[4, 7, 3, 6]}
      />
      <meshPhongMaterial color="gold" attach="material" />
    </mesh>
  );
};
