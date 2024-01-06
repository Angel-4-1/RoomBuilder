import { useAtom } from "jotai"
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib"
import { MapItemProps } from "~/data/map";
import { useGrid } from "~/hooks/useGrid";
import { allItemsAtom } from "../Play/PlayStage";
import { ItemProps } from "~/data/items";
import { mapAtom } from "~/Experience";

interface ShopItemsProps {
  item: ItemProps;
  onClick: () => void;
  xPos: number;
}

interface ShopProps {
  onItemSelected: (item: ItemProps) => void;
}

const ShopItem = ({
  item,
  onClick,
  xPos,
}: ShopItemsProps) => {
  const { name, size } = item;
  const { scene } = useGLTF(`models/items/${name}.glb`);
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { gridToVector3 } = useGrid();

  return (
    <group
      onClick={onClick}
      position-x={xPos}
    >
      <group position={gridToVector3([0,0], size[0], size[1])}>
        <primitive object={clone} />
      </group>
    </group>
  );
};

export const Shop = ({
  onItemSelected
}: ShopProps) => {
  const [map] = useAtom(mapAtom);
  const [items] = useAtom(allItemsAtom);

  const maxX = useRef(0);

  const shopItems = useMemo(() => {
    let x = 0;
    return Object.values(items).map((item, index) => {
      const xPos = x;
      x += item.size[0] / map.gridDivision + 1;
      maxX.current = x;
      return (
        <ShopItem xPos={xPos} item={item} onClick={() => onItemSelected(item)} key={index}/>
      )
    })
  }, [items])

  const shopContainer = useRef();
  const scrollData = useScroll();

  useFrame(() => {
    // @ts-ignore
    shopContainer.current.position.x = - scrollData.offset * maxX.current
  });

  // @ts-ignore
  return <group ref={shopContainer}>{shopItems}</group>
}