import map, { MapProps } from "./map";
import room2Map from "./rooms/room2";

export interface RoomProps {
  map: MapProps;
  name: string;
  description?: string;
}


export interface WorldProps {
  rooms: RoomProps[];
}

const world: WorldProps = {
  rooms: [
    {
      name: "Default Room",
      description: "Lorem ipsum dolor sit amet consectetur",
      map: map,
    },
    {
      name: "Sample Room",
      description: "Lorem ipsum dolor sit",
      map: room2Map,
    }
  ]
}

export default world;