import React, { useEffect, useMemo, useRef, useState } from "react";
import { atom, useAtom } from "jotai"
import { default as itemsData } from "~/data/items";
import { Item } from "~/components/Item";
import { AccumulativeShadows, OrbitControls, RandomizedLight, useCursor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { ItemProps } from "~/data/items";
import { useGrid } from "~/hooks/useGrid";
import { charactersAtom, mapAtom, userAtom } from "~/Experience";
// @ts-ignore
import Pathfinding from "pathfinding"
import { Player } from "~/components/Player";
import Show from "~/components/Show";
import { isNullOrUndefined } from "~/utils/utils";

export const allItemsAtom = atom<ItemProps[]>(itemsData);
export const buildModeAtom = atom(false);

export default function PlayStage() {

  const [map, setMap] = useAtom(mapAtom);
  const controls = useRef();
  const state = useThree((state) => state);

  const { gridToVector3, vector3ToGrid } = useGrid();
  
  const accumulativeShadows = useMemo(
    () => (
      <AccumulativeShadows
        temporal
        frames={30}
        alphaTest={0.85}
        scale={50}
        position={[0, 0, 0]}
        color="pink"
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[5, 5, 5]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, -20]}
        />
      </AccumulativeShadows>
    ),
    [map.items]
  );

  useEffect(() => {
    const centerMap = {
      w: map.size[0] / 2,
      h: map.size[1] / 2
    }

    state.camera.position.set(12,7,12);
    //@ts-ignore
    controls.current.target.set(centerMap.w,0,centerMap.h);
  }, []);

  const [onFloor, setOnFloor] = useState(false);
  const scene = useThree((state) => state.scene);
  const [user, setUser] = useAtom(userAtom);
  const [characters, setCharacters] = useAtom(charactersAtom);

  // When mouse on the floor
  useCursor( onFloor );

  /** PATH FINDING **/
  const grid = new Pathfinding.Grid( map.size[0] * map.gridDivision, map.size[1] * map.gridDivision );
  const finder = new Pathfinding.AStarFinder({
    allowDiagonals: true,
    dontCrossCorners: true
  });

  const findPath = (start: any, end: any) => {
    // grid will be modified in each path-finding, and will not be usable afterwards. 
    // If you want to use a single grid multiple times, create a clone for it before calling findPath
    const gridClone = grid.clone();
    const path = finder.findPath( start[0], start[1], end[0], end[1], gridClone );
    return path;
  };

  const updateGrid = () => {
    // Reset grid
    for(let x = 0; x < map.size[0] * map.gridDivision; x++) {
      for(let y = 0; y < map.size[1] * map.gridDivision; y++) {
        grid.setWalkableAt(x,y,true);
      }
    }
  
    // Set walkable cells
    map.items.forEach((item) => {
      if (item.walkable || item.wall ) {
        return;
      }
  
      // reverse w and h depending on the rotation of the item
      const width = item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
      const height = item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
  
      for( let x = 0; x < width; x++ ) {
        for( let y = 0; y < height; y++ ) {
          // tell the grid that we cannot walk on that position because there is an object
          grid.setWalkableAt(
            item.gridPosition[0] + x,
            item.gridPosition[1] + y,
            false
          )
        }
      }
    })
  };
  
  updateGrid();

  const generateRandomPositionGridBasedSystem = () => {
    for(let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * map.size[0] * map.gridDivision);
      const y = Math.floor(Math.random() * map.size[1] * map.gridDivision);
      
      if (grid.isWalkableAt(x,y)) {
        return [x,y]
      }
    }
  
    return [0,0];
  };

  useEffect(() => {
    if (user !== null && !user?.isReady) {
      user.isReady = true;
      user.position = generateRandomPositionGridBasedSystem();
      setUser( user );
    }
  }, [user])

  const [path, setPath] = useState<[]>([]);

  const onPlaneClicked = (e: any) => {
    const myself = scene.getObjectByName(`player`);
    if(!myself) return;

    const from = vector3ToGrid(myself.position);
    const to = vector3ToGrid(e.point) ;

    const path = findPath(from, to);
    if(!path) return;

    if(user) {
      user.path = path;
      setPath( path )
    }
  }

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
    />

    {/* Accumulative shadows */}
    {accumulativeShadows}

    {/* Items */}
    {(map.items).map((item, idx) => (
      <Item
        key={`${item.name}-${idx}`}
        item={item}
        onClick={() => {}} 
        isDragging={false} 
        canDrop={false}        
      />
      ))
    }

    {/* Floor */}
    <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
      onPointerMove={(e) => {}}
      position-x={map.size[0] / 2}
      position-z={map.size[1] / 2}
      receiveShadow
      onClick={onPlaneClicked}
      onPointerEnter={() => setOnFloor(true)}
      onPointerLeave={() => setOnFloor(false)}
    >
      <planeGeometry args={[map.size[0], map.size[1]]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
    
    <Show when={!isNullOrUndefined(user)}>
      <Player
        position={
          gridToVector3(user?.position ? user.position : generateRandomPositionGridBasedSystem())
        }
        externalPath={path}
      />
    </Show>
  </>
}