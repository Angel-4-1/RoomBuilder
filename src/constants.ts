/** LANGUAGES **/
export interface LanguageProps {
  name: string;
  id: number;
  screen_name: string;
  image: string;
};

export const LANGUAGES: LanguageProps[] = [
  { name: "English", id: 0 , screen_name: "English" , image: "assets/languages/english.png" },
  { name: "Spanish", id: 1 , screen_name: "Español" , image: "assets/languages/spain.png" },
];

/** STAGES **/
export interface StageProps {
  name: string;
  id: number;
};

export const STAGES_MAP = {
  INTRO_STAGE: 0,
  ROOM_SELECTION: 1,
  PLAY_STAGE: 2,
  EDITOR_STAGE: 3,
};

export const STAGES: StageProps[] = [
  { name: "Intro", id: STAGES_MAP.INTRO_STAGE },
  { name: "Room Selection", id: STAGES_MAP.ROOM_SELECTION },
  { name: "Play", id: STAGES_MAP.PLAY_STAGE },
  { name: "Editor", id: STAGES_MAP.EDITOR_STAGE },
]