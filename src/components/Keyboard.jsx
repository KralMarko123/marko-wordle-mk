import React from "react";
import * as myConstants from "../constants/letters";
import { MdOutlineBackspace } from "react-icons/md";
import "../styles/Keyboard.css";

const Keyboard = () => {
  const firstRowLetters = myConstants.FIRST_ROW_LETTERS;
  const secondRowLetters = myConstants.SECOND_ROW_LETTERS;
  const thirdRowLetters = myConstants.THIRD_ROW_LETTERS;

  return (
    <section className="keyboard">
      <div className="keyboard-row">
        {firstRowLetters.map((letter) => {
          return <span className="keyboard-letter">{letter}</span>;
        })}
      </div>
      <div className="keyboard-row">
        {secondRowLetters.map((letter) => {
          return <span className="keyboard-letter">{letter}</span>;
        })}
      </div>
      <div className="keyboard-row">
        <span className="keyboard-letter">Submit</span>
        {thirdRowLetters.map((letter) => {
          return <span className="keyboard-letter">{letter}</span>;
        })}
        <MdOutlineBackspace className="backspace" />
      </div>
    </section>
  );
};

export default Keyboard;
