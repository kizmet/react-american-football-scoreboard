import React, { useState } from "react";

const ScoresButton = props => {
  return (
    <button
      className="homeButtons__touchdown"
      onClick={

        props.handleScore
      }
      
    >{props.text}
    </button>
  );
};

export default ScoresButton;
