import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'
import { atom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, StageProps } from './constants';

/** Define global ATOMS **/
export const languageAtom = atom<LanguageProps>(LANGUAGES[0]);
export const stageAtom = atom<StageProps>(STAGES[0]);

/** Main Experience **/
export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      <Lights />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
