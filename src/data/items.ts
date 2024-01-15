export interface ItemProps {
  name: string;
  image: string;
  size: number[];
  wall?: boolean;
  walkable?: boolean;
  light?: {
    isActive: boolean;
    color?: string;
    intensity?: number;
  }
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
    image: "assets/items/washer.jpg",
    size: [2, 2]
  },
  {
    name: "toiletSquare",
    image: "assets/items/toiletSquare.jpg",
    size: [2, 2],
  },
  {
    name: "trashcan",
    image: "assets/items/trashcan.jpg",
    size: [1, 1],
  },
  {
    name: "bathroomCabinetDrawer",
    image: "assets/items/bathroomCabinetDrawer.jpg",
    size: [2, 2],
  },
  {
    name: "bathtub",
    image: "assets/items/bathtub.jpg",
    size: [4, 2],
  },
  {
    name: "bathroomMirror",
    image: "assets/items/bathroomMirror.jpg",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomCabinet",
    image: "",
    size: [2, 1],
    wall: true,
  },
  {
    name: "bathroomSink",
    image: "",
    size: [2, 2],
  },
  {
    name: "showerRound",
    image: "",
    size: [2, 2],
  },
  {
    name: "tableCoffee",
    image: "",
    size: [4, 2],
  },
  {
    name: "loungeSofaCorner",
    image: "",
    size: [5, 5],
  },
  {
    name: "bear",
    image: "assets/items/bear.jpg",
    size: [2, 1],
    wall: true,
  },
  {
    name: "loungeSofaOttoman",
    image: "",
    size: [2, 2],
  },
  {
    name: "tableCoffeeGlassSquare",
    image: "",
    size: [2, 2],
  },
  {
    name: "loungeDesignSofaCorner",
    image: "",
    size: [5, 5],
  },
  {
    name: "loungeDesignSofa",
    image: "",
    size: [5, 2],
  },
  {
    name: "loungeSofa",
    image: "",
    size: [5, 2],
  },
  {
    name: "bookcaseOpenLow",
    image: "",
    size: [2, 1],
  },
  {
    name: "kitchenBar",
    image: "",
    size: [2, 1],
  },
  {
    name: "bookcaseClosedWide",
    image: "",
    size: [3, 1],
  },
  {
    name: "bedSingle",
    image: "assets/items/bedSingle.jpg",
    size: [3, 5],
  },
  {
    name: "bench",
    image: "",
    size: [2, 1],
  },
  {
    name: "bedDouble",
    image: "",
    size: [5, 5],
  },
  {
    name: "benchCushionLow",
    image: "",
    size: [2, 1],
  },
  {
    name: "loungeChair",
    image: "",
    size: [2, 2],
  },
  {
    name: "cabinetBedDrawer",
    image: "",
    size: [1, 1],
  },
  {
    name: "cabinetBedDrawerTable",
    image: "",
    size: [1, 1],
  },
  {
    name: "table",
    image: "",
    size: [4, 2],
  },
  {
    name: "tableCrossCloth",
    image: "",
    size: [4, 2],
  },
  {
    name: "plant",
    image: "",
    size: [1, 1],
  },
  {
    name: "plantSmall",
    image: "",
    size: [1, 1],
  },
  {
    name: "rugRounded",
    image: "",
    size: [6, 4],
    walkable: true,
  },
  {
    name: "rugRound",
    image: "",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugSquare",
    image: "",
    size: [4, 4],
    walkable: true,
  },
  {
    name: "rugRectangle",
    image: "",
    size: [8, 4],
    walkable: true,
  },
  {
    name: "televisionVintage",
    image: "",
    size: [4, 2],
  },
  {
    name: "televisionModern",
    image: "",
    size: [4, 2],
  },
  {
    name: "kitchenCabinetCornerRound",
    image: "",
    size: [2, 2],
  },
  {
    name: "kitchenCabinetCornerInner",
    image: "",
    size: [2, 2],
  },
  {
    name: "kitchenCabinet",
    image: "",
    size: [2, 2],
  },
  {
    name: "kitchenBlender",
    image: "",
    size: [1, 1],
  },
  {
    name: "dryer",
    image: "",
    size: [2, 2],
  },
  {
    name: "chairCushion",
    image: "assets/items/chairCushion.jpg",
    size: [1, 1],
  },
  {
    name: "chair",
    image: "assets/items/chair.jpg",
    size: [1, 1],
  },
  {
    name: "deskComputer",
    image: "assets/items/deskComputer.jpg",
    size: [3, 2],
  },
  {
    name: "desk",
    image: "",
    size: [3, 2],
  },
  {
    name: "chairModernCushion",
    image: "",
    size: [1, 1],
  },
  {
    name: "chairModernFrameCushion",
    image: "",
    size: [1, 1],
  },
  {
    name: "kitchenMicrowave",
    image: "",
    size: [1, 1],
  },
  {
    name: "coatRackStanding",
    image: "",
    size: [1, 1],
  },
  {
    name: "kitchenSink",
    image: "",
    size: [2, 2],
  },
  {
    name: "lampRoundFloor",
    image: "assets/items/lampRoundFloor.jpg",
    size: [1, 1],
    light: {
      isActive: true,
    }
  },
  {
    name: "lampRoundTable",
    image: "assets/items/lampRoundTable.jpg",
    size: [1, 1],
    light: {
      isActive: true,
    }
  },
  {
    name: "lampSquareFloor",
    image: "",
    size: [1, 1],
    light: {
      isActive: true,
    }
  },
  {
    name: "lampSquareTable",
    image: "",
    size: [1, 1],
    light: {
      isActive: true,
    }
  },
  {
    name: "toaster",
    image: "",
    size: [1, 1],
  },
  {
    name: "kitchenStove",
    image: "",
    size: [2, 2],
  },
  {
    name: "laptop",
    image: "",
    size: [1, 1],
  },
  {
    name: "radio",
    image: "",
    size: [1, 1],
  },
  {
    name: "speaker",
    image: "",
    size: [1, 1],
  },
  {
    name: "speakerSmall",
    image: "",
    size: [1, 1],
  },
  {
    name: "stoolBar",
    image: "",
    size: [1, 1],
  },
  {
    name: "stoolBarSquare",
    image: "",
    size: [1, 1],
  },
];

export default items;