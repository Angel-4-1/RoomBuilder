import React, { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { mapAtom, stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { allItemsAtom, buildModeAtom } from "../Play/PlayStage";
import { ItemActions, draggedItemAtom, draggedItemRotationAtom, itemActionAtom, shopModeAtom } from "./EditorStage";
import Show from "~/components/Show";
import { isNullOrUndefined } from "~/utils/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ItemEditor } from "./ItemEditor";

const AlertType = {
  SUCCESS: "alert-success",
  ERROR: "alert-error",
};

const createAlertBox = (message: string, alertType?: string) => {
  // Get container where to add the message
  let alertContainer = document.getElementById("alert-container");

  // Content
  let alertContent = document.createElement('DIV');
  alertContent.classList.add('alert-content');
  alertContent.innerText = message;
  
  // Close icon
  let alertClose = document.createElement('A');
  alertClose.classList.add('alert-close');
  alertClose.setAttribute('href', '#');

  // Create the box message
  let alertBox = document.createElement('DIV');
  alertBox.classList.add('alert-box');
  if (alertType) {
    alertBox.classList.add(alertType);
  }
  alertBox.appendChild(alertContent);
  alertBox.appendChild(alertClose);
  
  alertContainer?.appendChild(alertBox);

  // Hide box
  const hide = () => {
    alertBox.classList.add('hide');
    let hideBoxTimeout = setTimeout(function() {
      alertBox.parentNode?.removeChild(alertBox);
      clearTimeout(hideBoxTimeout);
    }, 500);
  }
  alertClose.addEventListener('click', function(event) {
    event.preventDefault();
    hide(); 
  });

  // Hide box automatically after X seconds if user does not close it
  let hideBoxAutoTimeout = setTimeout(function() {
    hide();
    clearTimeout(hideBoxAutoTimeout);
  }, 10000);
};

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

  /** ITEM ACTIONS **/
  const onRotateClick = () => {
    if (isNullOrUndefined(draggedItem)) {
      return;
    }

		setDraggedItemRotation(
      draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
    )
    setItemAction(ItemActions.ROTATE);
	};

  const onMoveClick = () => {
    if (isNullOrUndefined(draggedItem)) {
      return;
    }

    setItemAction((prev) => prev === ItemActions.MOVE ? ItemActions.NONE : ItemActions.MOVE);
  }
  
  const onDeleteClick = () => {
    if (isNullOrUndefined(draggedItem)) {
      return;
    }

    setItemAction((prev) => prev === ItemActions.MOVE ? ItemActions.NONE : ItemActions.DELETE);
  }

  useEffect(() => {
    if(draggedItem !== null && draggedItem !== undefined && draggedItem < items.length) {
      // @ts-ignore
      setItemSelected(items[draggedItem]);
    } else {
      setItemSelected(null);
    }
  }, [draggedItem])

  /** GO TO THE SHOP **/
  const onShopClick = () => {
    setShopMode(!shopMode);
  }
  
  /** REMOVE EVERYTHING FROM THE MAP **/
  const confirmText = useTranslation(TRANSLATIONS.editorStage.buttons.clean.confirmation);
  const cleanAlertText = useTranslation(TRANSLATIONS.editorStage.alertMsg.clean);
  const onCleanClick = () => {
    if (confirm(confirmText)) {
      setItemAction((prev) => prev === ItemActions.CLEAN_EVERYTHING ? ItemActions.NONE : ItemActions.CLEAN_EVERYTHING);
      createAlertBox(cleanAlertText, AlertType.SUCCESS);
    }
  }

  /** LOAD MAP **/
  const [map, setMap] = useAtom(mapAtom);
  const [items, setItems] = useState( map.items );
  const fileUploadMsg = useTranslation(TRANSLATIONS.editorStage.buttons.map.select);
  const mapSuccessMsg = useTranslation(TRANSLATIONS.editorStage.alertMsg.map.success);
  const mapErrorMsg = useTranslation(TRANSLATIONS.editorStage.alertMsg.map.error);
  const [fileName, setFileName] = useState(fileUploadMsg);
  const [fileSelected, seFileSelected] = useState(false);
  
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
      createAlertBox(mapErrorMsg, AlertType.ERROR);
      return;
    }
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
      // @ts-ignore
      let textFromFileLoaded = fileLoadedEvent.target.result;
      let newMap = JSON.parse(textFromFileLoaded as string);
      setMap( newMap );
      clearFileInput(document.getElementById("fileToLoad"));

      createAlertBox(mapSuccessMsg, AlertType.SUCCESS);
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

  const [allItems] = useAtom(allItemsAtom);

  const [itemSelected, setItemSelected] = useState(null);

  const shopItems = useMemo(() => { 
    return Object.values(allItems).map((item, index) => {
      const event = new CustomEvent("onItemSelectedForShop", { detail: item });

      const onClick = () => {
        document.dispatchEvent(event)
      }

      const onMouseEnter = () => {
        // @ts-ignore
        setItemSelected(item);
      }
      
      const onMouseLeave = () => {
        // @ts-ignore
        setItemSelected(null);
      }

      return (
        <>
          <div className="editor-items-row" key={index}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            // style={{
            //   backgroundImage: `url(${item.image})`,
            //   backgroundRepeat: 'no-repeat',
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'center'
            // }}
          />
        </>
      )
    })
  }, [items])

  const onChangeMapSize = () => {
    // @ts-ignore
    const widthMap = document.getElementById("widthMap")?.value;
    // @ts-ignore
    const heightMap = document.getElementById("heightMap")?.value;
    map.size = [widthMap, heightMap];
    setMap(map);
  }

	return <>
  <div>
    <div className="editor-container">
      <div className="editor-elements-container">
        <div className="editor-buttons-container">
          <button onClick={onPlayClick}>
            {useTranslation(TRANSLATIONS.editorStage.buttons.stopEditing)}
          </button>
          
          <button
            onClick={onCleanClick}
            className={"button-red"}
          >
            {useTranslation(TRANSLATIONS.editorStage.buttons.clean.description)}
          </button>


        </div>
        
        <div>
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
            {useTranslation(TRANSLATIONS.editorStage.buttons.map.load)}
          </button>
        </div>

        <div>
          <label htmlFor="widthMap">Width (between 5 and 20)</label>
          <input type="number" id="widthMap" name="quantity" min="5" max="20" defaultValue={map.size[0]}>
          </input>
          <br/>
          
          <label htmlFor="heightMap">Height (between 5 and 20)</label>
          <input type="number" id="heightMap" name="quantity" min="5" max="20" defaultValue={map.size[1]}>
          </input>
          <br/>

          <button onClick={onChangeMapSize}>
            Change
          </button>
        </div>

        <Show when={(!isNullOrUndefined(draggedItem))}>
          <div className={"editor-item-actions-container"}>
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
              className={"button-red"}
            >
              {useTranslation(TRANSLATIONS.editorStage.buttons.item.delete)}
            </button>
          </div>
        </Show>
      </div>
      
      <div className="editor-items-container">
        {shopItems}
      </div>
    </div>

    <div className="editor-item-preview">
      {useTranslation(TRANSLATIONS.editorStage.itemPreviewm.title)}
    </div>

    <Canvas className="previewItem"
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [1.75, 3.5, 5],
      }}
    >
      <color attach="background" args={['#faf8eb']} />
      <OrbitControls target={[ 0, 0.5, 0]}/>
      <Show when={itemSelected !== null}>

        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.3} castShadow />

        {/* Item Preview */}
        <ItemEditor 
          // @ts-ignore
          item={itemSelected} 
        />
      </Show>
    </Canvas>

  </div>

    <div id="alert-container" />
  </>
}