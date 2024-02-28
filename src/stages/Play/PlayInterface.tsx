import React from "react";
import { useAtom } from "jotai";
import {mapAtom, roomAtom, stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { buildModeAtom } from "./PlayStage";
import DayNightSwitch from "~/components/DayNightSwitch";
import { createAlertBoxMessage, AlertType } from "~/components/AlertBox";
import { MapItemProps } from "~/data/map";

export default function PlayInterface() {
  const [stage, setStage] = useAtom(stageAtom);
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);
  const [map, setMap] = useAtom(mapAtom);
  const [room, setRoom] = useAtom(roomAtom);

  /** GO BACK TO THE MAIN SCREEN**/
  const onBackClick = () => {
    setStage(STAGES[STAGES_MAP.ROOM_SELECTION]);
  };

  /** GO TO THE EDITOR */
  const onEditorClick = () => {
    setStage(STAGES[STAGES_MAP.EDITOR_STAGE]);
    setBuildMode(true);
  };

  /** SCREENSHOT **/
  const event = new CustomEvent("onMakeScreenshot", { detail: true});

  /** DOWNLOAD MAP **/
  function download(content: string, fileName: string, contentType: string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();

    //window.dispatchEvent(event)
  }
  
  const mapDownloadedAlertText = useTranslation(TRANSLATIONS.playStage.alertMsg.mapDownloaded);
  const mapDownloadedErrorAlertText = useTranslation(TRANSLATIONS.playStage.alertMsg.mapDownloadedError);

  const formatItemAsDev = (item: MapItemProps) => {
    const itemAsText = `
    {
      ...getItemByName("${item.name}"),
      gridPosition: [${item.gridPosition[0]}, ${item.gridPosition[1]}],
      ${item.rotation ? `rotation: ${item.rotation},` : ""}
      ${item.walkable ? "walkable: true," : ""}
      ${item.light ? `light: {
        isActive: true,
        ${item.light.color ? `${item.light.color},`: ""}
        ${item.light.intensity ? `${item.light.intensity},`: ""}
      },` : ""}
    },`

    return itemAsText;
  }

  const formatMapRoomToDownloadAsDev = () => {
    let itemsFormattedAsText = "";
    for (let i = 0; i < map.items.length; i++) {
      const text = formatItemAsDev(map.items[i]);

      itemsFormattedAsText += text;
    }

    const mapAsText = `const roomMap: MapProps = {
      size: [${map.size[0]}, ${map.size[1]}],
      gridDivision: ${map.gridDivision},
      items: [${itemsFormattedAsText}
      ]
    }`

    // without empty line
    return mapAsText.replace(/^\s*\n/gm, "");
  }

  const onDownload = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // month starts from 0
    const year = date.getFullYear();
    const fileName = "map" + "-" + day + "-" + month + "-" + year + ".txt";
    const fileNameDev = "map" + "-" + day + "-" + month + "-" + year + "-dev" + ".txt";
    
    try {
      download(JSON.stringify(map), fileName, "text/plain");
      download(formatMapRoomToDownloadAsDev(), fileNameDev, "text/plain");
      createAlertBoxMessage(mapDownloadedAlertText, AlertType.SUCCESS);
    } catch (e) {
      createAlertBoxMessage(mapDownloadedErrorAlertText, AlertType.ERROR);
    }
  }

  return <div className="play-container">
    <div className="play-elements-container">
      <div className="play-room-details">
        <h4 className="room-name">{room.name}</h4>
      </div>
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

        <DayNightSwitch />
      </div>
    </div>
  </div>
}