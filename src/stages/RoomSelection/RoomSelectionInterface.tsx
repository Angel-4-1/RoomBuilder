import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React, { useEffect, useRef, useState } from "react";
import { mapAtom, roomAtom, stageAtom, worldAtom } from "~/Experience";
import { STAGES, STAGES_MAP } from "~/constants";
import { RoomProps } from "~/data/world";
import { MapProps } from "~/data/map";
import { isNullOrUndefined } from "~/utils/utils";

export default function RoomSelectionInterface() {
	const [stage, setStage] = useAtom(stageAtom);
	const [world, setWorld] = useAtom(worldAtom);
	const [map, setMap] = useAtom(mapAtom)
	const [room, setRoom] = useAtom(roomAtom);
	const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

	const onContinueWithRoom = (room: RoomProps) => {
		setRoom( room );
		setMap( room.map )
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};
	
	const onCreateNewRoom = () => {
		const newMap: MapProps = {
			size: [10, 10],
			gridDivision: 2,
			items: []
		};

		const newRoom: RoomProps = {
			name: inputFields.name,
			description: inputFields.description,
			map: newMap,
		};

		world.rooms.push( newRoom );
		setRoom( newRoom );
		setWorld( world );
		setMap( newMap );
		setStage(STAGES[STAGES_MAP.EDITOR_STAGE]);
	};

	const onOpenPopUp = () => {
		setIsPopUpOpen( true );
	}
	
	const onCancel = () => {
		setIsPopUpOpen( false );
	}

	const [inputFields, setInputFields] = useState({
		name: "",
		description: "",
	});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState<boolean>(false);

	const validateValues = (inputValues: any) => {
		let errors = {};
		if (inputValues.name.length < 1) {
			// @ts-ignore
			errors.name = "Room Name is mandatory"
		}
		return errors;
	};

	const handleChange = (e: any) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value });
		setErrors({});
	};

	const handleSubmit = (e :any) => {
		e.preventDefault();
		setErrors(validateValues(inputFields));
		setSubmitting(true);
	};
	
	const finishSubmit = () => {
		console.log(inputFields);
		// clear form
		onCreateNewRoom();
	};

	useEffect(() => {
		if(!submitting) return;

		setSubmitting(false);
		if (Object.keys(errors).length === 0 && submitting) {
			finishSubmit();
		} else {
			console.log(errors)
		}
	}, [errors]);

	return <>
	<div className={`room-container ${isPopUpOpen ? 'blur' : ''}`}>
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

			<button key={"room-new"} className="btn-room create-room"
				onClick={() => onOpenPopUp()}
			>Create a new room</button>
		</div>
	</div>

	<div className={`room-popup ${isPopUpOpen ? '' : 'hidden'}`} id="myForm">
		<form className="form-container" >
			<h1 className="form-title">Room set up</h1>

			<span className="form-label-container">
				<label className="label-principal" htmlFor="name">
					<b>Name</b>
				</label>
				<span className="label-secondary">* mandatory</span>
			</span>
			<textarea className={`form-input ${errors?.name ? 'mandatory' : '' }`} placeholder="Enter Room name" name="name" onChange={handleChange}/>

			<label htmlFor="description">
				<b>Description</b>
			</label>
			<br />
			<textarea className="form-input" placeholder="Enter Room description" name="description" onChange={handleChange}/>

			<button type="submit" className="btn" onClick={handleSubmit}>Create</button>
			<button className="btn cancel" onClick={onCancel}>Close</button>
		</form>
	</div>

</>
}