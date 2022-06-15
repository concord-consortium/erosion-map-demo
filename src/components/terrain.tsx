import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import sand from "../assets/sand.png";
import { ITransectPoint } from "../data/fake-data";

const gridWidth = 3;
const gridLength = 6;
const terrainWidth = 40;
const terrainLength = 14;

interface TerrainProps {
  data: Array<ITransectPoint>
}

export const Terrain = (props: TerrainProps) => {
  const {data} = props;

  const terrainRef = useRef<THREE.BufferGeometry>();
  const rightSideRef = useRef<THREE.BufferGeometry>();
  const leftSideRef = useRef<THREE.BufferGeometry>();
  const backSideRef = useRef<THREE.BufferGeometry>();

  const texture = new THREE.TextureLoader().load(sand);

  useEffect(() => {
    setTerrainElevation();
    setSideElevation("right");
    setSideElevation("left");
    setSideElevation("back");
  }, []);


  const getRef = (type: string) => {
    if (type === "right") {
      return rightSideRef;
    } else if (type === "left") {
      return leftSideRef;
    } else if (type === "back") {
      return backSideRef;
    } else {
      return terrainRef;
    }
  };

  const getData =(coord: string, val: number) => {
    const transectData = [];

    for (let i = 0; i < data.length; i++){
      const coordinate = coord === "x" ? data[i].x : data[i].y;

      if (coordinate === val){
        transectData.push(data[i]);
      }
    }

    return transectData;
  };

  const setSideElevation = (type: string) => {
    const side = getRef(type).current!;
    const sidePosArray = side.attributes.position.array as number[];

    const sideSpecificData = type === "right" ?  getData("x", -40) : type === "left" ? getData("x", 20) : getData("y", 6);

    for (let i = 0; i < sideSpecificData.length; i++){
      sidePosArray[i * 3 + 1] = sideSpecificData[i].z;
    }
  };

  const setTerrainElevation = () => {
    const terrain = terrainRef.current!;
    const terrainArray = terrain.attributes.position.array as number[];

    for (let i = 0; i < data.length; i++){
      terrainArray[i * 3 + 2] = data[i].z;
    }
  };

  const renderPlane = (type: string, meshPositions: [x: number, y: number, z: number], rotation: [x: number, y: number, z: number], args: [width?: number | undefined, height?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined], side?: typeof THREE.BackSide) => {
    return (
      <mesh
      position={meshPositions}
      rotation={rotation}
      >
        <planeBufferGeometry
          ref={getRef(type)}
          attach={"geometry"}
          args={args}
        />
        <meshStandardMaterial
          side={side? side : THREE.FrontSide}
          wireframe
          map={texture}
        />
      </mesh>
    );
  };


  return (
    <>
      {renderPlane("terrain", [0, 0, 0], [-Math.PI / 2, 0, 0], [terrainWidth, terrainLength, gridWidth, gridLength])}
      {renderPlane("right", [-20, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength])}
      {renderPlane("left", [20, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], THREE.BackSide)}
      {renderPlane("back", [0, 0, -7], [0, 0, 0], [terrainWidth, 1, gridWidth], THREE.BackSide)}
    </>
  );
};