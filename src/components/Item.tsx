import React, { useEffect, useMemo, useState } from 'react'
import { useCursor, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib"
import { useAtom } from "jotai";
import { useGrid } from '../hooks/useGrid';
import Show from "./Show"
import { MapItemProps } from '~/data/map';
import { buildModeAtom } from '~/stages/Play/PlayStage';
import { mapAtom } from '~/Experience';
import { Box3 } from 'three';

interface ItemElementProps {
  item: MapItemProps;
  onClick: () => void;
  isDragging: boolean;
  dragPosition?: any;
  dragRotation?: any;
  canDrop: boolean;
  isDebug?: boolean;
}

export const Item = ({
  item,
  onClick,
  isDragging = false,
  dragPosition,
  dragRotation,
  canDrop = false,
  isDebug = false,
}: ItemElementProps) => {
  const { name, gridPosition, size, rotation: itemRotation, light } = item;

  const rotation = isDragging ? dragRotation : itemRotation;
  const [map] = useAtom(mapAtom);
  const { gridToVector3 } = useGrid();

  const isLightActive = light?.isActive ?? false;

  const { scene } = useGLTF(`models/items/${name}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  // Since we are on a grid, if we rotate the items we need to get the correct with and height
  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  const [hover, setHover] = useState(false);
  const [buildMode] = useAtom(buildModeAtom);
  useCursor( buildMode ? hover : false);

  useEffect(() => {
    clone.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    })
  }, [])

  let lightPosition = 0;
  if(isLightActive) {
    const boundingBox = new Box3().setFromObject(clone)
    //const ySize = boundingBox.max.y - boundingBox.min.y
    lightPosition = boundingBox.max.y;
  }

  return <group
    onClick={onClick}
    position={gridToVector3(isDragging ? (dragPosition || gridPosition) : gridPosition, width, height)}
    onPointerEnter={() => setHover(true)}
    onPointerLeave={() => setHover(false)}
  >
    <primitive
      object={clone}
      rotation-y={ (rotation || 0) * Math.PI / 2}
    />
    <Show when={!isDragging && isLightActive}>
      <Show when={isDebug}>
        <mesh position-y={lightPosition}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Show>

      <Show when={!isDebug}>
        <pointLight
          intensity={1}
          color="#e07951"
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          position-y={lightPosition}
        />
      </Show>
    </Show>

    <Show when={isDragging}>
      <mesh>
        <boxGeometry args={[width / map.gridDivision, 0.2, height / map.gridDivision]} />
        <meshBasicMaterial color={canDrop ? "green" : "red"} opacity={0.3} transparent/>
      </mesh>
    </Show>
  </group>;

  // rotation = 0 -> 0
  // rotation = 1 -> 90
  // rotation = 2 -> 180
  // rotation = 3 -> 270
}
