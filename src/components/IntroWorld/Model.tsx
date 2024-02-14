import { useGLTF } from "@react-three/drei";
import React, { Suspense, useMemo } from "react";
import Show from "~/components/Show";
import { degToRad, isNullOrUndefined } from "~/utils/utils";
import { SkeletonUtils } from "three-stdlib"
import { Object3D, Object3DEventMap } from "three";

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
  const ASSET_PATH = `assets/room-selection/${variant}.glb`;
  let clone: Object3D<Object3DEventMap> | null = null;

  try {
    const { scene } = useGLTF( ASSET_PATH );
  
    if ( scene ) {
      // Skinned meshes cannot be re-used in threejs without cloning them
      clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
      
      clone?.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  } catch (e) {
    // console.error("Error while loading", ASSET_PATH, e)
  }

  return (
    <Show when={!isNullOrUndefined( clone )}>
      <Suspense fallback={null}>
        <primitive
          // @ts-ignore
          object={clone}
          position-x={position.x}
          position-y={position.y}
          position-z={position.z}
          scale={scale ?? 1}
          rotation-y={degToRad(rotationInDeg ?? 0)}
        />
      </Suspense>
    </Show>
  )
}