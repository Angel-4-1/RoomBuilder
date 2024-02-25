import { useMemo } from "react";
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"
import { Object3D, Object3DEventMap } from "three";
import { useGLTF } from "@react-three/drei";

interface useLoadModelProps {
  assetPath: string;
  isSkinnedObject?: boolean;
}

interface useLoadModelOutput {
  scene: Object3D<Object3DEventMap> | null;
}

export const useLoadModel = ({
  assetPath,
  isSkinnedObject = false,
}: useLoadModelProps): useLoadModelOutput => {
  let clone: Object3D<Object3DEventMap> | null = null;

  try {
    const { scene } = useGLTF( assetPath );
  
    if ( scene ) {
      // An object cannot be re-used twice without cloning it
      if (isSkinnedObject) {
        clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
      } else {
        clone = useMemo(() => scene.clone(), [scene])
      }
      
      // Enable shadows
      clone?.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  } catch (e) {
    // No need to do anything, is just to avoid crashing all the application
    // console.error("Error while loading", assetPath, e)
  }

  return {
    scene: clone
  }
}