import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion-3d";
import { Grid, Html, OrbitControls, Text3D } from "@react-three/drei";
import './style.css'
import { useAtom } from "jotai";
import { worldAtom } from "~/Experience";
import { RoomProps } from "~/data/world";
import { useThree } from "@react-three/fiber";
import { degToRad } from "~/utils/utils";
import { House, HouseVariant } from "./House";

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

    <group position-z={-2}>
      <Text3D
        font={"fonts/fugaz.json"}
        position-z={3}
        size={0.3}
        position-x={-1.5}
        castShadow
        rotation-y={degToRad(30)}
        bevelEnabled
        bevelThickness={0.005}
        letterSpacing={0.012}
      >
        Room
        <meshStandardMaterial color="red" />
      </Text3D>

      <Text3D
        font={"fonts/fugaz.json"}
        position-z={4}
        size={0.3}
        position-x={-1.5}
        castShadow
        rotation-y={degToRad(30)}
        bevelEnabled
        bevelThickness={0.005}
        letterSpacing={0.012}
      >
        Builder
        <meshStandardMaterial color="green" />
      </Text3D>

      {/* Houses */}
      <House
        position={{
          x: 1,
          y: 0,
          z: 2.5,
        }}
        rotationInDeg={140}
      />
      <House
        position={{
          x: 3,
          y: 0,
          z: 0.5,
        }}
        scale={1.25}
        rotationInDeg={140}
        variant={HouseVariant.HOUSE_2}
      />
      <House
        position={{
          x: -2.5,
          y: 0,
          z: 0.5,
        }}
        rotationInDeg={220}
        variant={HouseVariant.HOUSE_3}
      />
      <House
        position={{
          x: -2.5,
          y: 0,
          z: 2.5,
        }}
        scale={0.8}
        rotationInDeg={230}
        variant={HouseVariant.HOUSE_4}
      />
      {/* <Grid infiniteGrid fadeDistance={50} fadeStrength={5}/> */}
    </group>
  </>
}