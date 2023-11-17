export interface ItemProps {
  name: string;
  size: number[];
  wall?: boolean;
  walkable?: boolean;
};

export const getItemByName = (name: string): ItemProps => {
  let defaultItem: ItemProps = {
    name: "empty",
    size: [0,0]
  }
  
  return items.filter((item) => item.name === name)[0] || defaultItem;
};

const items: ItemProps[] = [
  {
    name: "washer",
    size: [2, 2]
  },
  {
    name: "toiletSquare",
    size: [2, 2],
  },
  {
    name: "trashcan",
    size: [1, 1],
  },
  {
    name: "bathroomCabinetDrawer",
    size: [2, 2],
  },
  {
    name: "bathtub",
    size: [4, 2],
  },
  {
    name: "bathroomMirror",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomCabinet",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomSink",
    size: [2, 2],
  },
  {
    name: "showerRound",
    size: [2, 2],
  },
  {
    name: "tableCoffee",
    size: [4, 2],
  },
  {
    name: "loungeSofaCorner",
    size: [5, 5],
  },
  {
    name: "bear",
    size: [2, 1],
    wall: true,
  },
  {
    name: "loungeSofaOttoman",
    size: [2, 2],
  },
  {
    name: "tableCoffeeGlassSquare",
    size: [2, 2],
  },
  {
    name: "loungeDesignSofaCorner",
    size: [5, 5],
  },
  {
    name: "loungeDesignSofa",
    size: [5, 2],
  },
  {
    name: "loungeSofa",
    size: [5, 2],
  },
  {
    name: "bookcaseOpenLow",
    size: [2, 1],
  },
  {
    name: "kitchenBar",
    size: [2, 1],
  },
  {
    name: "bookcaseClosedWide",
    size: [3, 1],
  },
  {
    name: "bedSingle",
    size: [3, 5],
  },
  {
    name: "bench",
    size: [2, 1],
  },
  {
    name: "bedDouble",
    size: [5, 5],
  },
  {
    name: "benchCushionLow",
    size: [2, 1],
  },
  {
    name: "loungeChair",
    size: [2, 2],
  },
  {
    name: "cabinetBedDrawer",
    size: [1, 1],
  },
  {
    name: "cabinetBedDrawerTable",
    size: [1, 1],
  },
  {
    name: "table",
    size: [4, 2],
  },
  {
    name: "tableCrossCloth",
    size: [4, 2],
  },
  {
    name: "plant",
    size: [1, 1],
  },
  {
    name: "plantSmall",
    size: [1, 1],
  },
  {
    name: "rugRounded",
    size: [6, 4],
    walkable: true,
  },
  {
    name: "rugRound",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugSquare",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugRectangle",
    size: [8, 4],
    walkable: true,
  },
  {
    name: "televisionVintage",
    size: [4, 2],
  },
  {
    name: "televisionModern",
    size: [4, 2],
  },
  {
    name: "kitchenCabinetCornerRound",
    size: [2, 2],
  },
  {
    name: "kitchenCabinetCornerInner",
    size: [2, 2],
  },
  {
    name: "kitchenCabinet",
    size: [2, 2],
  },
  {
    name: "kitchenBlender",
    size: [1, 1],
  },
  {
    name: "dryer",
    size: [2, 2],
  },
  {
    name: "chairCushion",
    size: [1, 1],
  },
  {
    name: "chair",
    size: [1, 1],
  },
  {
    name: "deskComputer",
    size: [3, 2],
  },
  {
    name: "desk",
    size: [3, 2],
  },
  {
    name: "chairModernCushion",
    size: [1, 1],
  },
  {
    name: "chairModernFrameCushion",
    size: [1, 1],
  },
  {
    name: "kitchenMicrowave",
    size: [1, 1],
  },
  {
    name: "coatRackStanding",
    size: [1, 1],
  },
  {
    name: "kitchenSink",
    size: [2, 2],
  },
  {
    name: "lampRoundFloor",
    size: [1, 1],
  },
  {
    name: "lampRoundTable",
    size: [1, 1],
  },
  {
    name: "lampSquareFloor",
    size: [1, 1],
  },
  {
    name: "lampSquareTable",
    size: [1, 1],
  },
  {
    name: "toaster",
    size: [1, 1],
  },
  {
    name: "kitchenStove",
    size: [2, 2],
  },
  {
    name: "laptop",
    size: [1, 1],
  },
  {
    name: "radio",
    size: [1, 1],
  },
  {
    name: "speaker",
    size: [1, 1],
  },
  {
    name: "speakerSmall",
    size: [1, 1],
  },
  {
    name: "stoolBar",
    size: [1, 1],
  },
  {
    name: "stoolBarSquare",
    size: [1, 1],
  },
];

export default items;