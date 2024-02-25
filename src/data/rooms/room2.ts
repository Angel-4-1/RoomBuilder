import { MapProps } from "../map";
import { getItemByName } from "../items";

const room2Map: MapProps = {
  size: [10, 10],
  gridDivision: 2,
  items: [
    {
      ...getItemByName("televisionModern"),
      gridPosition: [0, 8],
      rotation: 3,
    },
    {
      ...getItemByName("speaker"),
      gridPosition: [0, 7],
      rotation: 1,
    },
    {
      ...getItemByName("speaker"),
      gridPosition: [0, 12],
      rotation: 1,
    },
    {
      ...getItemByName("rugRounded"),
      gridPosition: [3, 7],
      rotation: 1,
      walkable: true,
    },
    {
      ...getItemByName("deskComputer"),
      gridPosition: [7, 1],
    },
    {
      ...getItemByName("chair"),
      gridPosition: [8, 3],
    },
    {
      ...getItemByName("deskComputer"),
      gridPosition: [12, 1],
    },
    {
      ...getItemByName("chairCushion"),
      gridPosition: [13, 3],
    },
    {
      ...getItemByName("lampRoundFloor"),
      gridPosition: [5, 0],
      light: {
        isActive: true
      }
    },
    {
      ...getItemByName("lampRoundFloor"),
      gridPosition: [16, 0],
      light: {
        isActive: true
      }
    },
  ],
};

export default room2Map;