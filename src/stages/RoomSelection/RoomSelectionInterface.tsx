import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React, { Suspense, useEffect, useRef, useState } from "react";
import { mapAtom, roomAtom, stageAtom, worldAtom } from "~/Experience";
import { STAGES, STAGES_MAP } from "~/constants";
import { RoomProps } from "~/data/world";
import { MapProps } from "~/data/map";
import { Variants, motion } from "framer-motion";
import { StarIcon } from "./StartIcon";

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

	const initialInputFields = {
		name: "",
		description: "",
	}

	const [inputFields, setInputFields] = useState(initialInputFields);

	const resetFormValues = () => {
		setInputFields(initialInputFields);
		const formName = document.getElementById("form-name") as HTMLInputElement;
		if (formName) {
			formName.value = "";
		}
		const formDescription = document.getElementById("form-description") as HTMLInputElement;
		if (formDescription) {
			formDescription.value = "";
		}
	}

	const onOpenPopUp = () => {
		resetFormValues();
		setIsPopUpOpen( true );
	}
	
	const onCancel = () => {
		setIsPopUpOpen( false );
	}

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

	/* STAR */
	const [isHover, setIsHover] = useState(false);

	const buttonVariants: Variants = {
		rest: {
			// @ts-ignore
			"--button-star-greyscale": "100%",
			"--button-star-contrast": "0%",
			transition: { duration: 0.7 }
		},
		hover: {
			// @ts-ignore
			"--button-star-greyscale": "0%",
			"--button-star-contrast": "100%",
			// scale: 1.2,
			// y: -8
		},
	};

	return <>
	<div className={`room-container ${isPopUpOpen ? 'blur' : ''}`}>
		<div className="title">
			<h2>{useTranslation(TRANSLATIONS.roomSelectionStage.title)}</h2>
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

			<motion.button
				className="btn-room create-room"
				initial={false}
				animate={[isHover ? "hover" : "rest"]}
				whileTap="press"
				variants={buttonVariants}
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => setIsHover(false)}
				onClick={() => onOpenPopUp()}
			>
				<motion.div
					className="icon"
					variants={{
						hover: { opacity: 1 }
					}}
				>
					<Suspense fallback={null}>
						<StarIcon isHover={isHover} isLiked={false} />
					</Suspense>
				</motion.div>
					
					<span className="create-room-text">
						{useTranslation(TRANSLATIONS.roomSelectionStage.buttons.createRoom)}
					</span>
				
			</motion.button>
		</div>
	</div>

	{/* Pop up to create a new room */}
	<div className={`room-popup ${isPopUpOpen ? '' : 'hidden'}`} id="myForm">
		<div className="form-container" >
			<h1 className="form-title">
				{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.title)}
			</h1>

			{/* Name input */}
			<span className="form-label-container">
				<label className="label-principal" htmlFor="name">
					<b>{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.name)}</b>
				</label>
				<span className="label-secondary">
					{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.mandatory)}
				</span>
			</span>
			
			<textarea 
				id="form-name"
				// @ts-ignore
				className={`form-input ${errors?.name ? 'mandatory' : '' }`} 
				placeholder={useTranslation(TRANSLATIONS.roomSelectionStage.popUp.placeholder.name)}
				name="name"
				onChange={handleChange}
			/>

			{/* Description input */}
			<label htmlFor="description">
				<b>{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.description)}</b>
			</label>

			<textarea
				id="form-description"
				className="form-input"
				placeholder={useTranslation(TRANSLATIONS.roomSelectionStage.popUp.placeholder.description)}
				name="description"
				onChange={handleChange}
			/>

			{/* Buttons */}
			<button type="submit" className="btn" onClick={handleSubmit}>
				{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.buttons.create)}
			</button>
			<button className="btn cancel" onClick={onCancel}>
				{useTranslation(TRANSLATIONS.roomSelectionStage.popUp.buttons.cancel)}
			</button>
		</div>
	</div>

</>
}