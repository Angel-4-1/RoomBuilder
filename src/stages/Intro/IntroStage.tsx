import React from "react"
import './style.css'
import IntroWorld from "~/components/IntroWorld/IntroWorld";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";

export default function IntroStage()
{
  const topText = useTranslation(TRANSLATIONS.introStage.message.top);
  const bottomText = useTranslation(TRANSLATIONS.introStage.message.bottom);

  return <>
    <IntroWorld 
      texts={{
        top: topText,
        bottom: bottomText
      }} 
    />
  </>
}