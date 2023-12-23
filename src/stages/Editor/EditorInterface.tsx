import React from "react";
import { useAtom } from "jotai";
import { stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { buildModeAtom } from "../Play/PlayStage";
import { ItemActions, draggedItemAtom, draggedItemRotationAtom, itemActionAtom, shopModeAtom } from "./EditorStage";

export default function EditorInterface() {

  const [stage, setStage] = useAtom(stageAtom);
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);

  const [draggedItemRotation, setDraggedItemRotation] = useAtom(
    draggedItemRotationAtom
  );
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [itemAction, setItemAction] = useAtom(itemActionAtom);
  const [shopMode, setShopMode] = useAtom(shopModeAtom);
	
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
  
  const onDeleteClick = () => {
    if (!draggedItem) {
      return;
    }

    setItemAction((prev) => prev === ItemActions.MOVE ? ItemActions.NONE : ItemActions.DELETE);
  }

  const onShopClick = () => {
    console.log(shopMode ? "open shop" : "close shop");
    setShopMode(!shopMode);
  }
  
  const confirmText = useTranslation(TRANSLATIONS.editorStage.buttons.clean.confirmation);
  const onCleanClick = () => {
    if (confirm(confirmText)) {
      setItemAction((prev) => prev === ItemActions.CLEAN_EVERYTHING ? ItemActions.NONE : ItemActions.CLEAN_EVERYTHING);
    } else {
      // Do nothing
    }
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
        
        <button
          onClick={onDeleteClick}
          className={draggedItem ? "button-red" : "button-disabled"}
        >
          {useTranslation(TRANSLATIONS.editorStage.buttons.item.delete)}
        </button>

        <button onClick={onShopClick}>
          {useTranslation(TRANSLATIONS.editorStage.buttons.shop)}
        </button>
        
        <button
          onClick={onCleanClick}
          className={"button-red"}
        >
          {useTranslation(TRANSLATIONS.editorStage.buttons.clean.description)}
        </button>
      </div>
    </div>
  </div>
}