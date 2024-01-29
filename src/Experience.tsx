import React, { useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import Lights from './components/Lights';
import { atom, useAtom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, STAGES_MAP, StageProps } from './constants';
import PlayStage from './stages/Play/PlayStage';
import Show from './components/Show';
import EditorStage from './stages/Editor/EditorStage';
import { MapProps, default as mapData } from './data/map';
import { isNullOrUndefined } from './utils/utils';
import { useThree } from '@react-three/fiber';
import world, { RoomProps, WorldProps } from './data/world';

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
export const roomAtom = atom<RoomProps>(world.rooms[0]);
export const isDayAtom = atom<boolean>(true);
export const worldAtom = atom<WorldProps>(world);

/** Main Experience **/
export default function Experience() {

  const [stage, setStage] = useAtom(stageAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isDay, setIsDay] = useAtom(isDayAtom);

  useEffect(() => {
    setUser({
      id: 0,
      isReady: false
    });
  }, []);

  useEffect(() => {
    const root = document.getElementById('root');
    if(isNullOrUndefined(root)) {
      return;
    }

    if(isDay) {
      root?.classList.remove("night-bg")
      root?.classList.add("day-bg")
    } else {
      root?.classList.remove("day-bg")
      root?.classList.add("night-bg")
    }
  }, [isDay])

  const gl = useThree((state) => state.gl)

  // Create event listener just once at the beginning
  useEffect(() => {
    window.addEventListener("onMakeScreenshot", function(e) {
      e.preventDefault();

      const fileName = "canvas.png";
      const link = document.createElement('a');
      link.setAttribute('download', fileName);
      link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
      link.click();
    });
  }, [])

  return (
    <>
      <OrbitControls makeDefault />

      <Show when={stage.id === STAGES_MAP.PLAY_STAGE}>
        <Lights isDebug={ false } isDay={isDay} />
        <PlayStage />
      </Show>
      
      <Show when={stage.id === STAGES_MAP.EDITOR_STAGE}>
        <Lights isDebug={ true } isDay={isDay} />
        <EditorStage />
      </Show>
    </>
  )
}
