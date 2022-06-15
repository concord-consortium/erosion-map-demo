import React from "react";
import * as THREE from "three";
import water from "../assets/water.png";

const terrainWidth = 40;

export const Water = () => {
  const texture = new THREE.TextureLoader().load(water);
  const planeLength = 4;

  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, .5, 9]}
      >
        <planeBufferGeometry
          attach={"geometry"}
          args={[terrainWidth, planeLength]}
        />
        <meshStandardMaterial attach={"material"} map={texture}/>
      </mesh>
      {/* front side */}
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, 11]}
      >
      <planeBufferGeometry
        attach={"geometry"}
        args={[terrainWidth, 1]}
      />
      <meshStandardMaterial
        attach={"material"}
        map={texture}
      />
      </mesh>
      {/* right side*/}
      <mesh
        position={[-20, 0, 9]}
        rotation={[0, -Math.PI / 2, 0]}
      >
      <planeBufferGeometry
        attach={"geometry"}
        args={[planeLength, 1]}
      />
      <meshStandardMaterial
        attach={"material"}
        map={texture}
      />
      </mesh>
      {/* left side*/}
      <mesh
        position={[20, 0, 9]}
        rotation={[0, -Math.PI / 2, 0]}
      >
      <planeBufferGeometry
        attach={"geometry"}
        args={[planeLength, 1]}
      />
      <meshStandardMaterial
        map={texture}
        side={THREE.BackSide}
      />
      </mesh>
    </>
  );
};
