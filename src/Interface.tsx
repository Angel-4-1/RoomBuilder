import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { stageAtom } from "./Experience";
import IntroInterface from "./stages/Intro/IntroInterface";
import Show from "./components/Show";
import { STAGES_MAP } from "./constants";
import PlayInterface from "./stages/Play/PlayInterface";
import EditorInterface from "./stages/Editor/EditorInterface";

export default function Interface()
{
  const [stage] = useAtom(stageAtom);

  return <>
    <Show when={stage.id === STAGES_MAP.INTRO_STAGE}>
      <IntroInterface />
    </Show>
    
    <Show when={stage.id === STAGES_MAP.PLAY_STAGE}>
      <PlayInterface />
    </Show>
    
    <Show when={stage.id === STAGES_MAP.EDITOR_STAGE}>
      <EditorInterface />
    </Show>
  </>
}