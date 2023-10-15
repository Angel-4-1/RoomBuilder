import { useAtom } from "jotai";
import React from "react";
import { stageAtom } from "./Experience";
import IntroInterface from "./stages/Intro/IntroInterface";
import Show from "./components/Show";
import { STAGES_MAP } from "./constants";

export default function Interface()
{
  const [stage] = useAtom(stageAtom);

  return <>
    <Show when={stage.id === STAGES_MAP.INTRO_STAGE}>
      <IntroInterface />
    </Show>
  </>
}