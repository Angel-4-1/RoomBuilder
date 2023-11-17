import React from "react";
import { useAtom } from "jotai";
import { stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { buildModeAtom } from "../Play/PlayStage";
import { ItemActions, draggedItemAtom, draggedItemRotationAtom, itemActionAtom } from "./EditorStage";

export default function EditorInterface() {

  const [stage, setStage] = useAtom(stageAtom);
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);

  const [draggedItemRotation, setDraggedItemRotation] = useAtom(
    draggedItemRotationAtom
  );
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [itemAction, setItemAction] = useAtom(itemActionAtom);
	
  const onPlayClick = () => {
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
    setBuildMode(false);
	};
  
  const onRotateClick = () => {
    if (!draggedItem) {
      return;
    }

		setDraggedItemRotation(
      draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
    )
    setItemAction(ItemActions.ROTATE);
	};

  const onMoveClick = () => {
    if (!draggedItem) {
      return;
    }

    setItemAction((prev) => prev === ItemActions.MOVE ? ItemActions.NONE : ItemActions.MOVE);
  }

	return <div className="editor-container">
    <div className="editor-elements-container">
      <div className="editor-buttons-container">
        <button onClick={onPlayClick}>
          {useTranslation(TRANSLATIONS.editorStage.buttons.stopEditing)}
        </button>

        <button onClick={onRotateClick}>
          {useTranslation(TRANSLATIONS.editorStage.buttons.item.rotate)}
        </button>

        <button
          onClick={onMoveClick}
          className={itemAction === ItemActions.MOVE ? "button-enabled" : "button-disabled"}
        >
          {useTranslation(TRANSLATIONS.editorStage.buttons.item.move)}
        </button>
      </div>
    </div>
  </div>
}