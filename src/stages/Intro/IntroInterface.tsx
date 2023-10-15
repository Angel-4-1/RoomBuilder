//@ts-nocheck
import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React from "react";
import { languageAtom, stageAtom } from "~/Experience";
import { LANGUAGES, STAGES, STAGES_MAP } from "~/constants";

export default function IntroInterface() {
	const [stage, setStage] = useAtom(stageAtom);

	const onStartClick = () => {
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};

	const [language, setLanguage] = useAtom(languageAtom);

	const onButtonLanguageClick = (languageId: number) => {
		setLanguage(LANGUAGES[languageId]);
		onStartClick();
	};

	return <div className="intro-container">
		<div className="title">
			<h1 className="white-text">{useTranslation(TRANSLATIONS.introStage)}</h1>
		</div>

		<div className="languages">
			{LANGUAGES.map((language, index) => {
				return <button key={index} className="btn-language"
					style={{
						backgroundImage: `url(${language.image})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
					onClick={() => onButtonLanguageClick(language.id)}
				>{language.name}</button>
			})}
		</div>

		<div className="version">
			<h4 className="white-text">{APP_VERSION}</h4>
		</div>
	</div>
}