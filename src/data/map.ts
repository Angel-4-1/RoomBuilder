import { ItemProps, getItemByName } from "./items";

export interface MapItemProps extends ItemProps {
  gridPosition: number[];
  rotation?: number;
};

export interface MapProps {
  size: number[];
  gridDivision: number;
  items: MapItemProps[];
};

const map: MapProps = {
  size: [10, 10],
  gridDivision: 2,
  items: [
    {
      ...getItemByName("showerRound"),
      gridPosition: [0, 0],
    },
    {
      ...getItemByName("toiletSquare"),
      gridPosition: [0, 3],
      rotation: 1,
    },
    {
      ...getItemByName("washer"),
      gridPosition: [5, 0],
    },
    {
      ...getItemByName("bathroomSink"),
      gridPosition: [7, 0],
    },
    {
      ...getItemByName("trashcan"),
      gridPosition: [0, 5],
      rotation: 1,
    },
    {
      ...getItemByName("bathroomCabinetDrawer"),
      gridPosition: [3, 0],
    },
    {
      ...getItemByName("bathtub"),
      gridPosition: [4, 4],
    },
    {
      ...getItemByName("bathtub"),
      gridPosition: [0, 8],
      rotation: 3,
    },
    {
      ...getItemByName("bathroomCabinet"),
      gridPosition: [3, 0],
    },
    {
      ...getItemByName("bathroomMirror"),
      gridPosition: [0, 8],
      rotation: 1,
    },
    {
      ...getItemByName("bathroomMirror"),
      gridPosition: [0, 10],
      rotation: 1,
    },
    {
      ...getItemByName("tableCoffee"),
      gridPosition: [10, 8],
    },
    {
      ...getItemByName("rugRectangle"),
      gridPosition: [8, 7],
    },
    {
      ...getItemByName("loungeSofaCorner"),
      gridPosition: [6, 10],
    },
    {
      ...getItemByName("bear"),
      gridPosition: [0, 3],
      rotation: 1,
    },
    {
      ...getItemByName("plant"),
      gridPosition: [11, 13],
    },
    {
      ...getItemByName("cabinetBedDrawerTable"),
      gridPosition: [13, 19],
    },
    {
      ...getItemByName("cabinetBedDrawer"),
      gridPosition: [19, 19],
    },
    {
      ...getItemByName("bedDouble"),
      gridPosition: [14, 15],
    },
    {
      ...getItemByName("bookcaseClosedWide"),
      gridPosition: [12, 0],
      rotation: 2,
    },
    {
      ...getItemByName("speaker"),
      gridPosition: [11, 0],
    },
    {
      ...getItemByName("speakerSmall"),
      gridPosition: [15, 0],
      rotation: 2,
    },
    {
      ...getItemByName("loungeChair"),
      gridPosition: [10, 4],
    },
    {
      ...getItemByName("loungeSofaOttoman"),
      gridPosition: [14, 4],
    },
    {
      ...getItemByName("loungeDesignSofa"),
      gridPosition: [18, 0],
      rotation: 1,
    },
    {
      ...getItemByName("kitchenCabinetCornerRound"),
      gridPosition: [2, 18],
      rotation: 2,
    },
    {
      ...getItemByName("kitchenCabinetCornerInner"),
      gridPosition: [0, 18],
      rotation: 2,
    },
    {
      ...getItemByName("kitchenStove"),
      gridPosition: [0, 16],
      rotation: 1,
    },
    {
      ...getItemByName("dryer"),
      gridPosition: [0, 14],
      rotation: 1,
    },
    {
      ...getItemByName("lampRoundFloor"),
      gridPosition: [0, 12],
    },
  ],
};

export default map;