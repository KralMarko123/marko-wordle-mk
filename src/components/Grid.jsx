import React, { useState, useEffect } from "react";
import Row from "./Row";
import Modal from "./Modal";
import * as myConstants from "../constants/words";
import "../styles/Grid.css";

const Grid = () => {
  const [wordList, setWordList] = useState(myConstants.WORDS);
  const [solution, setSolution] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleModal = () => {
    setIsModalShown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyPressed = e.key.toLowerCase();

      //general
      if (isGameOver) {
        return;
      }

      //backspace
      if (keyPressed === "backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      //submit
      if (keyPressed === "enter") {
        if (currentGuess.length !== 5) {
          setModalMessage("Зборот треба да е со 5 букви.");
          toggleModal();
          return;
        }

        if (!wordList.includes(currentGuess)) {
          setModalMessage("Зборот не се наоѓа во списокот на можни зборови.");
          toggleModal();
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[newGuesses.findIndex((el) => el === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = currentGuess === solution;
        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      //current guess is already at 5 letters
      if (currentGuess.length === 5) {
        return;
      }

      //check if letter was pressed
      const isLetter = keyPressed.match(/^[a-z]{1}$/) !== null;
      const isCyrillicLetter = keyPressed.match(/^[\u0400-\u04FF]+$/) !== null;
      if (isLetter || isCyrillicLetter) {
        setCurrentGuess((oldGuess) => oldGuess + keyPressed);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, guesses, isGameOver, solution, modalMessage]);

  return (
    <>
      <section className="grid">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((el) => el === null);

          return (
            <Row
              key={i}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinalGuess={!isCurrentGuess && guess !== null}
              solution={solution}
            />
          );
        })}
      </section>

      {isModalShown === true ? (
        <Modal message={modalMessage} modalHandler={toggleModal} />
      ) : null}
    </>
  );
};

export default Grid;
