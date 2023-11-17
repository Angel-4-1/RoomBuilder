import React, { useState } from "react";
import { useAtom } from "jotai";
import { languageAtom, stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { buildModeAtom, mapAtom } from "./PlayStage";

export default function PlayInterface() {
  const [language] = useAtom(languageAtom);
  const [stage, setStage] = useAtom(stageAtom);
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);
  const [map, setMap] = useAtom(mapAtom);

  const fileUploadMsg = useTranslation(TRANSLATIONS.playStage.buttons.map.select);
  const [fileName, setFileName] = useState(fileUploadMsg);
  const [fileSelected, seFileSelected] = useState(false);

  const onBackClick = () => {
    setStage(STAGES[STAGES_MAP.INTRO_STAGE]);
  };

  const onEditorClick = () => {
    setStage(STAGES[STAGES_MAP.EDITOR_STAGE]);
    setBuildMode(true);
  };

  function download(content: string, fileName: string, contentType: string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const onDownload = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // month starts from 0
    const year = date.getFullYear();
    const fileName = "map" + "-" + day + "-" + month + "-" + year + ".txt";
    
    download(JSON.stringify(map), fileName, "text/plain");
  }

  function clearFileInput(ctrl: any) {
    try {
      ctrl.value = null;
    } catch(ex) { }

    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }

    setFileName(fileUploadMsg);
    seFileSelected(false);
  }

  const loadMap = () => {
    // @ts-ignore
    let fileToLoad = document.getElementById("fileToLoad")?.files[0];
    if (!fileToLoad) {
      console.error("ERROR: No file uploaded")
      return;
    }
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
      // @ts-ignore
      let textFromFileLoaded = fileLoadedEvent.target.result;
      let newMap = JSON.parse(textFromFileLoaded as string);
      setMap( newMap );
      clearFileInput(document.getElementById("fileToLoad"));
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  const file = document.querySelector('#fileToLoad');
  file?.addEventListener('change', (e: any) => {
    // Get the selected file
    const [file] = e.target.files;
    if (!file) return;

    // Get the file name and size
    const { name: fileName, size } = file;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    // Set the text content
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    setFileName(fileNameAndSize);
    seFileSelected(true);
  });

  return <div className="play-container">
    <div className="play-elements-container">
      <div className="play-buttons-container">
        <button onClick={onBackClick} className="button-red">
          {useTranslation(TRANSLATIONS.playStage.buttons.back)}
        </button>

        <button onClick={onEditorClick}>
          {useTranslation(TRANSLATIONS.playStage.buttons.editor)}
        </button>

        <button onClick={onDownload}>
          {useTranslation(TRANSLATIONS.playStage.buttons.map.download)}
        </button>
      </div>

      <label htmlFor="fileToLoad" className="input-button">
        {fileName}
          <input
          type="file"
          id="fileToLoad"
          accept=".json,.txt"
          className="input-button"
        />
      </label>

      <input
        type="file"
        id="fileToLoad"
        accept=".json,.txt"
        className="input-button"
      />

      <button onClick={loadMap}
        className={fileSelected ? "button-enabled" : "button-disabled"}
        disabled={!fileSelected}
      >
        {useTranslation(TRANSLATIONS.playStage.buttons.map.load)}
      </button>

      </div>
  </div>
}