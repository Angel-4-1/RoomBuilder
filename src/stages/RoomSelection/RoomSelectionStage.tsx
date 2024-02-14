import React from "react"
import IntroWorld from "~/components/IntroWorld/IntroWorld";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";

export default function RoomSelectionStage()
{
  const topText = useTranslation(TRANSLATIONS.roomSelectionStage.message.top);
  const bottomText = useTranslation(TRANSLATIONS.roomSelectionStage.message.bottom);

  return <>
    <IntroWorld
      texts={{
        top: topText,
        bottom: bottomText
      }} 
    />
  </>
}