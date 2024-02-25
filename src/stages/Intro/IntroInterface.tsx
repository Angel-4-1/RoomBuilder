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
		setStage(STAGES[STAGES_MAP.ROOM_SELECTION]);
	};

	const [language, setLanguage] = useAtom(languageAtom);

	const onButtonLanguageClick = (languageId: number) => {
		setLanguage(LANGUAGES[languageId]);
		onStartClick();
	};

	return <div className="intro-container">
		<div className="title">
			<h1 className="white-text">{useTranslation(TRANSLATIONS.introStage.title)}</h1>
		</div>

		<div className="subtitle">
			<h3 className="white-text" style={{ margin: 0 }}>{useTranslation(TRANSLATIONS.introStage.subtitle)}</h3>
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
			{/* 
			// @ts-ignore */}
			<h4 className="white-text">{APP_VERSION}</h4>
		</div>
		
		<div className="links">
			<a href="https://angel-4-1.github.io/" target="_blank">
				<img className="link-images" src="icon.png" />
			</a>

			<a className="link-code" href="https://github.com/Angel-4-1/room-builder" target="_blank">
				<img className="link-images" src="github.png" />
			</a>
		</div>
	</div>
}