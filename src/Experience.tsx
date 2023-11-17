import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Lights from './components/Lights';
import { atom, useAtom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, STAGES_MAP, StageProps } from './constants';
import PlayStage from './stages/Play/PlayStage';
import Show from './components/Show';
import EditorStage from './stages/Editor/EditorStage';

/** Define global ATOMS **/
export const languageAtom = atom<LanguageProps>(LANGUAGES[0]);
export const stageAtom = atom<StageProps>(STAGES[0]);

/** Main Experience **/
export default function Experience() {

  const [stage, setStage] = useAtom(stageAtom);
  
  return (
    <>
      <OrbitControls makeDefault />

      <Lights />

      {/* <mesh castShadow position-x={-2}>
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
      </mesh> */}

      <Show when={stage.id === STAGES_MAP.PLAY_STAGE}>
        <PlayStage />
      </Show>
      
      <Show when={stage.id === STAGES_MAP.EDITOR_STAGE}>
        <EditorStage />
      </Show>
    </>
  )
}
