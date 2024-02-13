import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import Show from "~/components/Show";
import { degToRad, isNullOrUndefined } from "~/utils/utils";
import { SkeletonUtils } from "three-stdlib"

export enum ModelVariant {
  HOUSE_1 = "house",
  HOUSE_2 = "house2",
  HOUSE_3 = "house3",
  HOUSE_4 = "house4",
  TREE_1  = "tree",
  TREE_2  = "tree2",
}

interface ModelProps {
  position: {
    x: number;
    y: number;
    z: number;
  },
  scale?: number,
  rotationInDeg?: number,
  variant?: ModelVariant,
}

export function Model({
  position,
  scale,
  rotationInDeg,
  variant = ModelVariant.HOUSE_1,
} : ModelProps) {

  const { scene } = useGLTF(`assets/room-selection/${variant}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  clone?.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <Show when={!isNullOrUndefined( scene )}>
      <primitive
        object={clone}
        position-x={position.x}
        position-y={position.y}
        position-z={position.z}
        scale={scale ?? 1}
        rotation-y={degToRad(rotationInDeg ?? 0)}
      />
    </Show>
  )
}