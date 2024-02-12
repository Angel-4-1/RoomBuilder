import { useGLTF } from "@react-three/drei";
import React from "react";
import { degToRad } from "~/utils/utils";

export enum HouseVariant {
  HOUSE_1 = "house",
  HOUSE_2 = "house2",
  HOUSE_3 = "house3",
  HOUSE_4 = "house4",
}

interface HouseProps {
  position: {
    x: number;
    y: number;
    z: number;
  },
  scale?: number,
  rotationInDeg?: number,
  variant?: HouseVariant,
}

export function House({
  position,
  scale,
  rotationInDeg,
  variant = HouseVariant.HOUSE_1,
} : HouseProps) {

  const { scene } = useGLTF(`/assets/room-selection/${variant}.glb`);

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      object={scene}
      position-x={position.x}
      position-y={position.y}
      position-z={position.z}
      scale={scale ?? 1}
      rotation-y={degToRad(rotationInDeg ?? 0)}
    />
  )
}