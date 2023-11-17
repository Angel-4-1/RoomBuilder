import React, { useEffect, useMemo, useRef } from "react";
import { atom, useAtom } from "jotai"
import { MapProps, default as mapData } from "~/data/map";
import { Item } from "~/components/Item";
import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const mapAtom = atom<MapProps>(mapData);
export const buildModeAtom = atom(false);

export default function PlayStage() {

  const [map, setMap] = useAtom(mapAtom);
  const controls = useRef();
  const state = useThree((state) => state);
  
  const accumulativeShadows = useMemo(
    () => (
      <AccumulativeShadows
        temporal
        frames={30}
        alphaTest={0.85}
        scale={50}
        position={[0, 0, 0]}
        color="pink"
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[5, 5, 5]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, -20]}
        />
      </AccumulativeShadows>
    ),
    [map.items]
  );

  useEffect(() => {
    const centerMap = {
      w: map.size[0] / 2,
      h: map.size[1] / 2
    }

    state.camera.position.set(12,7,12);
    //@ts-ignore
    controls.current.target.set(centerMap.w,0,centerMap.h);
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
      //enableZoom={!shopMode}
    />

    {/* Accumulative shadows */}
    {accumulativeShadows}

    {/* Items */}
    {(map.items).map((item, idx) => (
      <Item
        key={`${item.name}-${idx}`}
        item={item}
        onClick={() => {}} 
        isDragging={false} 
        canDrop={false}        
      />
      ))
    }

    {/* Floor */}
    <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
      onPointerMove={(e) => {}}
      position-x={map.size[0] / 2}
      position-z={map.size[1] / 2}
      receiveShadow
    >
      <planeGeometry args={[map.size[0], map.size[1]]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  </>
}