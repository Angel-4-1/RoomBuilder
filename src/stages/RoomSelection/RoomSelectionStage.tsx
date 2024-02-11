import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion-3d";
import { Html, OrbitControls, Text3D } from "@react-three/drei";
import './style.css'
import { useAtom } from "jotai";
import { worldAtom } from "~/Experience";
import { RoomProps } from "~/data/world";
import { useThree } from "@react-three/fiber";
import { degToRad } from "~/utils/utils";

export default function RoomSelectionStage()
{
  const controls = useRef();
  const state = useThree((state) => state);
  useEffect(() => {
    state.camera.position.set(0,1.5,3);
    //@ts-ignore
    // controls.current.target.set(centerMap.w,0,centerMap.h);
  }, []);

  return <>
    {/* Controls */}
    <OrbitControls
      // @ts-ignore
      ref={controls}
      minDistance={5}
      maxDistance={20}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      screenSpacePanning={false}
    />

    {/* Floor */}
    <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
      receiveShadow
    >
      <planeGeometry args={[20, 7]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>

    <group position-z={-2} rotation-y={Math.PI / 6}>
      <Text3D
        font={"fonts/fugaz.json"}
        position-z={1}
        size={0.3}
        position-x={-3}
        castShadow
        rotation-y={degToRad(10)}
        bevelEnabled
        bevelThickness={0.005}
        letterSpacing={0.012}
      >
        Room
        <meshStandardMaterial color="red" />
      </Text3D>

      <Text3D
        font={"fonts/fugaz.json"}
        position-z={2.5}
        size={0.3}
        position-x={-3}
        castShadow
        rotation-y={degToRad(10)}
        bevelEnabled
        bevelThickness={0.005}
        letterSpacing={0.012}
      >
        Builder
        <meshStandardMaterial color="green" />
      </Text3D>
      {/* <Skyscraper scale={1.32} />
      <Skyscraper scale={1} position-x={-3} position-z={-1} />
      <Skyscraper scale={0.8} position-x={3} position-z={-0.5} /> */}
    </group>
  </>
}