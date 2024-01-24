import React, { useCallback, useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai"
import { MapItemProps, default as mapData } from "~/data/map";
import { Item } from "~/components/Item";
import { Grid, Html, OrbitControls, PivotControls, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useGrid } from "~/hooks/useGrid";
import Show from "~/components/Show";
import { Shop } from "./Shop";
import { Quaternion, Vector3 } from "three";
import { ItemProps } from "~/data/items";
import { mapAtom, userAtom } from "~/Experience";
import Wrapper from "~/components/Wrapper";
import { isNullOrUndefined } from "~/utils/utils";

export enum ItemActions {
  NONE = 0,
  MOVE = 1,
  ROTATE = 2,
  DELETE = 3,
  CLEAN_EVERYTHING = 4,
}

type Nullable<T> = T | null;

export const draggedItemAtom = atom<Nullable<number>>(null);
export const draggedItemRotationAtom = atom(0);
export const itemActionAtom = atom<ItemActions>(ItemActions.NONE);
export const shopModeAtom = atom(false);

export default function EditorStage() {

  const [map, setMap] = useAtom(mapAtom);
  const [items, setItems] = useState( map.items );
  const { vector3ToGrid, gridToVector3 } = useGrid();

  const [user, setUser] = useAtom(userAtom);

  const centerMap = {
    w: map.size[0] / 2,
    h: map.size[1] / 2
  }

  const controls = useRef();
  const state = useThree((state) => state);

  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [draggedItemRotation, setDraggedItemRotation] = useAtom(draggedItemRotationAtom);
  const [itemAction, setItemAction] = useAtom(itemActionAtom);
  const [dragPosition, setDragPosition] = useState([0,0]);
  const [canDrop, setCanDrop] = useState(false);
  const [shopMode, setShopMode] = useAtom(shopModeAtom);
  const [editorCameraPostition, setEditorCameraPosition] = useState<Vector3>(new Vector3( 12, 7, 12 ));

  useEffect(() => {
    setItems(map?.items || []);
    state.camera.position.set(
      editorCameraPostition.x, 
      editorCameraPostition.y, 
      editorCameraPostition.z
    );
    //@ts-ignore
    controls.current.target.set(centerMap.w,0,centerMap.h);
  }, []);

  useEffect(() => {
    if (user !== null) {
      // That way we will force PlayStage to reposition again the user
      user.isReady = false;
      user.path = [];
      setUser( user );
    }
  }, [user])

  useEffect(() => {
    if(shopMode) {
      //setEditorCameraPosition(state.camera.position);
      state.camera.position.set(0,4,8);
      // @ts-ignore
      controls.current.target.set(0,0,0);
    } else {
      state.camera.position.set(
        editorCameraPostition.x, 
        editorCameraPostition.y, 
        editorCameraPostition.z
      );
      // @ts-ignore
      controls.current.target.set(centerMap.w,0,centerMap.h);
    }
  }, [shopMode])

  useEffect(() => {
    if(draggedItem === null) {
      //@ts-ignore
      setItems((prev) => prev.filter((item) => !item.tmp));
    }
  }, [draggedItem]);

  const saveItem = (newGridPosition?: number[]) => {
    if(draggedItem !== null) {
      setItems((prev) => {
        const newItems = [...prev];
        // @ts-ignore
        delete newItems[draggedItem].tmp; // remove tmp property because now the item os not temporal anymore
        if (newGridPosition) {
          newItems[draggedItem].gridPosition = newGridPosition;
        }
        newItems[draggedItem].rotation = draggedItemRotation;
        return newItems;
      })
      map.items = items;
      setMap( map )
    }
  }
  
  const deleteItem = () => {
    if(draggedItem !== null) {
      delete items[draggedItem];
      map.items = items;
      setMap( map )
      setDraggedItem(null);
    }
  }
  
  const deleteAllItems = () => {
    setItems([])
    map.items = items;
    setMap( map );
    setDraggedItem( null );
  }

  const onPlaneClicked = (e: any) => {
    if(draggedItem !== null) {
      if(canDrop && (itemAction === ItemActions.MOVE)) {
        saveItem(vector3ToGrid(e.point));
      }
      setDraggedItem(null);
      setItemAction(ItemActions.NONE);
    }
  };

  useEffect(() => {
    switch(itemAction) {
      case ItemActions.ROTATE:
        saveItem();
        break;
      case ItemActions.DELETE:
        deleteItem();
        break;
      case ItemActions.CLEAN_EVERYTHING:
        deleteAllItems();
        break;
      default:
        break;
    };
  }, [itemAction])

  useEffect(() => {
    if(draggedItem === null || draggedItem === undefined) return;

    const item = items[draggedItem];
    const width = draggedItemRotation === 1 || draggedItemRotation === 3 ? item.size[1] : item.size[0];
    const height = draggedItemRotation === 1 || draggedItemRotation === 3 ? item.size[0] : item.size[1];
    
    let droppable = true;

    // check if item is on the map grid
    if(dragPosition[0] < 0 || dragPosition[0] + width > map.size[0] * map.gridDivision) {
      droppable = false;
    }
    if(dragPosition[1] < 0 || dragPosition[1] + height > map.size[1] * map.gridDivision) {
      droppable = false;
    }

    // check if item is not colliding with other items
    if(!item.walkable) {
      items.forEach((otherItem, idx) => {
        //ignore itself
        if (idx === draggedItem) return;

        if (item.wall) {  // for a wall item we only care about other walls
          if (!otherItem.wall) return;
        } else {
          if (otherItem.walkable || otherItem.wall) return;
        }

        const otherWidth = otherItem.rotation === 1 || otherItem.rotation === 3 ? otherItem.size[1] : otherItem.size[0];
        const otherHeight = otherItem.rotation === 1 || otherItem.rotation === 3 ? otherItem.size[0] : otherItem.size[1];
      
        if (
          dragPosition[0] < otherItem.gridPosition[0] + otherWidth &&
          dragPosition[0] + width > otherItem.gridPosition[0] &&
          dragPosition[1] < otherItem.gridPosition[1] + otherHeight &&
          dragPosition[1] + height > otherItem.gridPosition[1]
        ) {
          droppable = false;
        }
      })
    }

    setCanDrop(droppable);
  }, [dragPosition, draggedItem, items, draggedItemRotation])

  const onItemSelected = ( item: ItemProps ) => {
    setShopMode(false);
    setItems((prev) => [
      ...prev,
      {
        ...item,
        gridPosition: [centerMap.w, centerMap.h],
        tmp: true,  // tell its temporal
      },
    ]);
    setDraggedItem(items.length);
    setDraggedItemRotation(0);
    setItemAction(ItemActions.MOVE);
  };

  // Catch updateStage event
  document.addEventListener("onItemSelectedForShop", function (e) {
    // @ts-ignore
    const itemSelected = e.detail;
    onItemSelected(itemSelected)
  });

  useEffect(() => {
    console.log( "items updated")
    map.items = items;
    setMap( map );
  }, [items])
  
  useEffect(() => {
    console.log( "map updated")
    setItems( map.items );
  }, [map])

  return <>
    {/* Controls */}
    <OrbitControls
      // @ts-ignore
      ref={controls}
      minDistance={5}
      maxDistance={20}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      screenSpacePanning={false}
      enableZoom={!shopMode}
    />

    <Show when={!shopMode}>
      {/* Items */}
      {items.map((item, idx) => (
          <Item
            key={`${item.name}-${idx}`}
            item={item}
            onClick={() => {
              console.log("clicked")
              // @ts-ignore
              setDraggedItem((prev) => (prev === null ? idx : prev));
              setDraggedItemRotation(item.rotation || 0);
              setDragPosition(item.gridPosition);
            } }     
            isDragging={draggedItem === idx}
            dragPosition={dragPosition}
            dragRotation={draggedItemRotation}
            canDrop={canDrop}
            isDebug={true}
          />
        ))
      }

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
        onClick={onPlaneClicked}
        onPointerMove={(e) => {
          if(itemAction === ItemActions.MOVE) {
            const newPosition = vector3ToGrid(e.point);
            if (!dragPosition || newPosition[0] !== dragPosition[0] || newPosition[1] !== dragPosition[1]) {
              setDragPosition(newPosition);
            }
          }
        }}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
        receiveShadow
      >
        <planeGeometry args={[map.size[0], map.size[1]]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* [0,0] */}
      <Html position={gridToVector3([0,0])}>
        <p className="editor-coordinate">(0,0)</p>
      </Html>

      {/* [width,0] */}
      <Html position={gridToVector3([map.size[0] * map.gridDivision,0])}>
        <p className="editor-coordinate">({map.size[0] * map.gridDivision},0)</p>
      </Html>
      
      {/* [0,height] */}
      <Html position={gridToVector3([0,map.size[1] * map.gridDivision])}>
        <p className="editor-coordinate">(0,{map.size[1] * map.gridDivision})</p>
      </Html>
      
      {/* [width, height] */}
      <Html position={gridToVector3([map.size[0] * map.gridDivision, map.size[1] * map.gridDivision])}>
        <p className="editor-coordinate">({map.size[0] * map.gridDivision},{map.size[1] * map.gridDivision})</p>
      </Html>

      {/* {
      draggedItem && 
        <Html position={gridToVector3(items[draggedItem].gridPosition)}>
          <div className="editor-draggedItem-container">
            <button>Move</button>
            <p>Item</p>
          </div>
        </Html>
      } */}

      {/* Grid */}
      <Grid infiniteGrid fadeDistance={50} fadeStrength={5}/>
    </Show>

    <Show when={shopMode}>
      <ScrollControls pages={4}>
        <Shop onItemSelected={onItemSelected}/>
      </ScrollControls>
    </Show>
  </>
}
