import map, { MapProps } from "./map";

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
    }
  ]
}

export default world;