import React, { useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import Lights from './components/Lights';
import { atom, useAtom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, STAGES_MAP, StageProps } from './constants';
import PlayStage from './stages/Play/PlayStage';
import Show from './components/Show';
import EditorStage from './stages/Editor/EditorStage';
import { MapProps, default as mapData } from './data/map';

export interface Character {
  id: number;
  position: number[];
  isMyself: boolean;
  path: any;
}

export interface PlayerProps {
  id: number;
  isReady: boolean;
  position?: number[];
  path?: any;
}

/** Define global ATOMS **/
export const languageAtom = atom<LanguageProps>(LANGUAGES[0]);
export const stageAtom = atom<StageProps>(STAGES[0]);
export const charactersAtom = atom<Character[]>([]);
export const userAtom = atom<PlayerProps|null>(null);
export const mapAtom = atom<MapProps>(mapData);

/** Main Experience **/
export default function Experience() {

  const [stage, setStage] = useAtom(stageAtom);
  const [user, setUser] = useAtom(userAtom);
  const [map, setMap] = useAtom(mapAtom);

  useEffect(() => {
    setUser({
      id: 0,
      isReady: false
    });
  }, []);

  return (
    <>
      <OrbitControls makeDefault />

      <Show when={stage.id === STAGES_MAP.PLAY_STAGE}>
        <Lights isDebug={ false } />
        <PlayStage />
      </Show>
      
      <Show when={stage.id === STAGES_MAP.EDITOR_STAGE}>
        <Lights isDebug={ true } />
        <EditorStage />
      </Show>
    </>
  )
}
