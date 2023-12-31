export interface ItemProps {
  name: string;
  image: string;
  size: number[];
  wall?: boolean;
  walkable?: boolean;
};

export const getItemByName = (name: string): ItemProps => {
  let defaultItem: ItemProps = {
    name: "empty",
    image: "empty",
    size: [0,0]
  }
  
  return items.filter((item) => item.name === name)[0] || defaultItem;
};

const items: ItemProps[] = [
  {
    name: "washer",
    image: "assets/languages/english.png",
    size: [2, 2]
  },
  {
    name: "toiletSquare",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "trashcan",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "bathroomCabinetDrawer",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "bathtub",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "bathroomMirror",
    image: "assets/languages/english.png",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomCabinet",
    image: "assets/languages/english.png",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomSink",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "showerRound",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "tableCoffee",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "loungeSofaCorner",
    image: "assets/languages/english.png",
    size: [5, 5],
  },
  {
    name: "bear",
    image: "assets/languages/english.png",
    size: [2, 1],
    wall: true,
  },
  {
    name: "loungeSofaOttoman",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "tableCoffeeGlassSquare",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "loungeDesignSofaCorner",
    image: "assets/languages/english.png",
    size: [5, 5],
  },
  {
    name: "loungeDesignSofa",
    image: "assets/languages/english.png",
    size: [5, 2],
  },
  {
    name: "loungeSofa",
    image: "assets/languages/english.png",
    size: [5, 2],
  },
  {
    name: "bookcaseOpenLow",
    image: "assets/languages/english.png",
    size: [2, 1],
  },
  {
    name: "kitchenBar",
    image: "assets/languages/english.png",
    size: [2, 1],
  },
  {
    name: "bookcaseClosedWide",
    image: "assets/languages/english.png",
    size: [3, 1],
  },
  {
    name: "bedSingle",
    image: "assets/languages/english.png",
    size: [3, 5],
  },
  {
    name: "bench",
    image: "assets/languages/english.png",
    size: [2, 1],
  },
  {
    name: "bedDouble",
    image: "assets/languages/english.png",
    size: [5, 5],
  },
  {
    name: "benchCushionLow",
    image: "assets/languages/english.png",
    size: [2, 1],
  },
  {
    name: "loungeChair",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "cabinetBedDrawer",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "cabinetBedDrawerTable",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "table",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "tableCrossCloth",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "plant",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "plantSmall",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "rugRounded",
    image: "assets/languages/english.png",
    size: [6, 4],
    walkable: true,
  },
  {
    name: "rugRound",
    image: "assets/languages/english.png",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugSquare",
    image: "assets/languages/english.png",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugRectangle",
    image: "assets/languages/english.png",
    size: [8, 4],
    walkable: true,
  },
  {
    name: "televisionVintage",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "televisionModern",
    image: "assets/languages/english.png",
    size: [4, 2],
  },
  {
    name: "kitchenCabinetCornerRound",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "kitchenCabinetCornerInner",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "kitchenCabinet",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "kitchenBlender",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "dryer",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "chairCushion",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "chair",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "deskComputer",
    image: "assets/languages/english.png",
    size: [3, 2],
  },
  {
    name: "desk",
    image: "assets/languages/english.png",
    size: [3, 2],
  },
  {
    name: "chairModernCushion",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "chairModernFrameCushion",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "kitchenMicrowave",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "coatRackStanding",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "kitchenSink",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "lampRoundFloor",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "lampRoundTable",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "lampSquareFloor",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "lampSquareTable",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "toaster",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "kitchenStove",
    image: "assets/languages/english.png",
    size: [2, 2],
  },
  {
    name: "laptop",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "radio",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "speaker",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "speakerSmall",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "stoolBar",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
  {
    name: "stoolBarSquare",
    image: "assets/languages/english.png",
    size: [1, 1],
  },
];

export default items;