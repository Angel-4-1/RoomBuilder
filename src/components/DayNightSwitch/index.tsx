// Component to render a switch to toggle between day and night
import { useAtom } from "jotai";
import React from "react";
import { isDayAtom } from "~/Experience";
import './style.css'

const DayNightSwitch = () => {
  const [isDay, setIsDay] = useAtom(isDayAtom);

  const onChangeDay = () => {
    setIsDay((prev) => !prev);
  }

	return (
    <label className="switch">
      <input type="checkbox" onChange={onChangeDay} checked={!isDay}/>
      <div className="slider"></div>
    </label>
  )
};

export default DayNightSwitch;