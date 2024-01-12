import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { MapItemProps } from '~/data/map';
import { SkeletonUtils } from "three-stdlib"
import { useFrame } from "@react-three/fiber";

interface ItemEditorProps {
  item: MapItemProps;
}

export const ItemEditor = ({
  item,
}: ItemEditorProps) => {

  const { name } = item;

  const { scene } = useGLTF(`models/items/${name}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  useEffect(() => {
    clone.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    })
  }, [])

  const ref = useRef();

  useFrame(() => {
    // @ts-ignore
    ref.current.rotation.y += 0.01;
  });

  return <>
    <group>
      <primitive ref={ref} object={clone} />
    </group>
  </>
}