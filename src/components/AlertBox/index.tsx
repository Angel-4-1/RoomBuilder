// Component to render messages at the bottom of the screen
import React from "react";
import './style.css'

export const AlertType = {
  SUCCESS: "alert-success",
  ERROR: "alert-error",
};

const CONTAINER_ID = "alert-container";

export const createAlertBoxMessage = (message: string, alertType?: string) => {
  // Get container where to add the message
  let alertContainer = document.getElementById( CONTAINER_ID );

  // Content
  let alertContent = document.createElement('DIV');
  alertContent.classList.add('alert-content');
  alertContent.innerText = message;
  
  // Close icon
  let alertClose = document.createElement('A');
  alertClose.classList.add('alert-close');
  alertClose.setAttribute('href', '#');

  // Create the box message
  let alertBox = document.createElement('DIV');
  alertBox.classList.add('alert-box');
  if (alertType) {
    alertBox.classList.add(alertType);
  }
  alertBox.appendChild(alertContent);
  alertBox.appendChild(alertClose);
  
  alertContainer?.appendChild(alertBox);

  // Hide box
  const hide = () => {
    alertBox.classList.add('hide');
    let hideBoxTimeout = setTimeout(function() {
      alertBox.parentNode?.removeChild(alertBox);
      clearTimeout(hideBoxTimeout);
    }, 500);
  }
  alertClose.addEventListener('click', function(event) {
    event.preventDefault();
    hide(); 
  });

  // Hide box automatically after X seconds if user does not close it
  let hideBoxAutoTimeout = setTimeout(function() {
    hide();
    clearTimeout(hideBoxAutoTimeout);
  }, 7000);
};

export const AlertBoxContainer = () => {
  return (
    <div id={CONTAINER_ID} />
  )
}