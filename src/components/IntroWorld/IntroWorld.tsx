import React, { ReactElement, useEffect, useRef } from "react"
import { OrbitControls, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { degToRad } from "~/utils/utils";
import { Model, ModelVariant } from "./Model";

interface IntroWorldProps {
  texts: {
    top: string;
    bottom: string;
  }
}

const Houses = () => {
  return <>
    <Model
      position={{
        x: 1,
        y: 0,
        z: 2.5,
      }}
      rotationInDeg={140}
    />
    <Model
      position={{
        x: 3,
        y: 0,
        z: 0.5,
      }}
      scale={1.25}
      rotationInDeg={140}
      variant={ModelVariant.HOUSE_2}
    />
    <Model
      position={{
        x: -2.5,
        y: 0,
        z: 0.5,
      }}
      rotationInDeg={220}
      variant={ModelVariant.HOUSE_3}
    />
    <Model
      position={{
        x: -2.5,
        y: 0,
        z: 2.5,
      }}
      scale={0.8}
      rotationInDeg={230}
      variant={ModelVariant.HOUSE_4}
    />
  </>
};

const Trees = () => {
  return <>
    <Model
      position={{
        x: -4,
        y: 0,
        z: 0.5,
      }}
      rotationInDeg={0}
      variant={ModelVariant.TREE_1}
    />
    <Model
      position={{
        x: 2.5,
        y: 0,
        z: 3,
      }}
      scale={0.75}
      rotationInDeg={60}
      variant={ModelVariant.TREE_2}
    />
  </>
}

export default function IntroWorld({
  texts
}: IntroWorldProps): ReactElement
{
  const controls = useRef();
  const state = useThree((state) => state);
  useEffect(() => {
    state.camera.position.set(0,1.5,3);
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
        position-z={3.4}
        size={0.3}
        position-x={-2}
        castShadow
        rotation-y={degToRad(30)}
        bevelEnabled
        bevelThickness={0.005}
        letterSpacing={0.012}
      >
        {texts.top}
        <meshStandardMaterial color="#e37e56" />
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
        {texts.bottom}
        <meshStandardMaterial color="#5da85f" />
      </Text3D>

      <Houses />
      <Trees />
    </group>
  </>
}