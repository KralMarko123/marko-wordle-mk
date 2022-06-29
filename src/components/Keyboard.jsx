import React from "react";
import * as myConstants from "../constants/letters";
import { MdOutlineBackspace } from "react-icons/md";
import "../styles/Keyboard.css";

const Keyboard = () => {
  const firstRowLetters = myConstants.FIRST_ROW_LETTERS;
  const secondRowLetters = myConstants.SECOND_ROW_LETTERS;
  const thirdRowLetters = myConstants.THIRD_ROW_LETTERS;

  const handleKeyboardPress = (e, letter) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));

    e.target.classList.add("clicked");

    setTimeout(() => {
      e.target.classList.remove("clicked");
    }, 50);
  };

  return (
    <section className="keyboard">
      <div className="keyboard-row">
        {firstRowLetters.map((letter, i) => {
          return (
            <span
              key={i}
              className="keyboard-letter"
              onClick={(e) => handleKeyboardPress(e, letter)}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="keyboard-row">
        {secondRowLetters.map((letter, i) => {
          return (
            <span
              key={i}
              className="keyboard-letter"
              onClick={(e) => handleKeyboardPress(e, letter)}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="keyboard-row">
        <span
          className="keyboard-letter"
          onClick={(e) => handleKeyboardPress(e, "enter")}
        >
          Внеси
        </span>
        {thirdRowLetters.map((letter, i) => {
          return (
            <span
              key={i}
              className="keyboard-letter"
              onClick={(e) => handleKeyboardPress(e, letter)}
            >
              {letter}
            </span>
          );
        })}

        <span
          className="keyboard-letter"
          onClick={(e) => handleKeyboardPress(e, "backspace")}
        >
          <MdOutlineBackspace />
        </span>
      </div>
    </section>
  );
};

export default Keyboard;
