import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React, { useEffect, useRef, useState } from "react";
import { mapAtom, stageAtom, worldAtom } from "~/Experience";
import { STAGES, STAGES_MAP } from "~/constants";
import { RoomProps } from "~/data/world";
import { MapProps } from "~/data/map";
import { isNullOrUndefined } from "~/utils/utils";

export default function RoomSelectionInterface() {
	const [stage, setStage] = useAtom(stageAtom);
	const [world, setWorld] = useAtom(worldAtom);
	const [map, setMap] = useAtom(mapAtom)

	const onContinueWithRoom = (room: RoomProps) => {
		setMap( room.map )
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};
	
	const onCreateNewRoom = (index: number) => {
		const newMap: MapProps = {
			size: [10, 10],
			gridDivision: 2,
			items: []
		};

		const newRoom: RoomProps = {
			name: `Nem Room ${index}`,
			description: "New description",
			map: newMap,
		};

		world.rooms.push( newRoom );
		setWorld( world );
		setMap( newMap );
		setStage(STAGES[STAGES_MAP.EDITOR_STAGE]);
	};

	const onOpenPopUp = () => {
		// @ts-ignore
		document.getElementById("myForm").style.display = "block";

		const popup = document.getElementById('myForm');
    if(isNullOrUndefined(popup)) {
      return;
    }
		popup?.classList.remove("hidden")
	}
	
	const onCancel = () => {
		const popup = document.getElementById('myForm');
    if(isNullOrUndefined(popup)) {
      return;
    }
		popup?.classList.add("hidden")
	}

	// const [val, setVal] = useState("");
  // const textAreaRef = useRef(null);

	// const resizeTextArea = () => {
	// 	if(!isNullOrUndefined(textAreaRef)) {
	// 		return;
	// 	}

  //   textAreaRef.current.style.height = "auto";
  //   textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  // };

  // useEffect(resizeTextArea, [val]);

	// const onChange = (e: any) => {
  //   setVal(e.target.value);
  // };

	return <div className="room-container">
		<div className="title">
			<h2 className="white-text">Select a room</h2>
		</div>

		<div className="rooms">
			{world.rooms.map((room, index) => {
				return <button key={index} className="btn-room"
					onClick={() => onContinueWithRoom(room)}
				>
					<p className="btn-room-title">{room.name}</p>
					<p className="btn-room-subtitle">{room.description}</p>
					</button>
			})}

			<button key={"room-new"} className="btn-room"
				onClick={() => onOpenPopUp()}
			>Create a new room</button>
		</div>

		<div className="room-popup hidden" id="myForm">
			<form className="form-container">
				<h1>Room set up</h1>

				<label htmlFor="name">
					<b>Name</b>
				</label>
				<br />
				<textarea className="form-input" placeholder="Enter Room name" name="name" required onChange={() => {}}/>

				<label htmlFor="description">
					<b>Description</b>
				</label>
				<br />
				<textarea className="form-input" placeholder="Enter Room description" name="description" />

				<button type="submit" className="btn"  onClick={() => onCreateNewRoom(world.rooms.length)}>Create</button>
				<button className="btn cancel" onClick={() => onCancel()}>Close</button>
			</form>
		</div>

	</div>
}