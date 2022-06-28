import React, { useState, useEffect } from "react";
import Row from "./Row";
import Modal from "./Modal";
import * as myConstants from "../constants/words";
import "../styles/Grid.css";

const Grid = () => {
  const wordList = myConstants.WORDS;
  const [solution, setSolution] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
    setIsModalShown(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyPressed = e.key.toLowerCase();

      //general
      if (isGameOver) {
        return;
      }

      //modal close
      if (keyPressed === "escape" && isModalShown === true) {
        setIsModalShown(false);
      }

      //backspace
      if (keyPressed === "backspace" && isModalShown === false) {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      //submit
      if (keyPressed === "enter") {
        if (currentGuess.length !== 5) {
          setModalMessage("Зборот треба да е со 5 букви.");
          setIsModalShown(true);
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[newGuesses.findIndex((el) => el === null)] = currentGuess;
        const isFinalEntry = newGuesses.every((el) => el !== null);
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = currentGuess === solution;
        if (isCorrect || isFinalEntry) {
          setIsGameOver(true);
          isCorrect === true
            ? setModalMessage(
                `Браво! Го погодивте зборот '${solution}', за да добиете нов збор рефреширајте ја страната.`
              )
            : setModalMessage(
                `Штета! Одговорот беше '${solution}', за да добиете нов збор рефреширајте ја страната.`
              );
          setIsModalShown(true);
        }
      }

      //current guess is already at 5 letters
      if (currentGuess.length === 5) {
        return;
      }

      //check if letter was pressed
      const isLetter = keyPressed.match(/^[a-z]{1}$/) !== null;
      const isCyrillicLetter = keyPressed.match(/^[\u0400-\u04FF]+$/) !== null;
      if ((isLetter || isCyrillicLetter) && isModalShown === false) {
        setCurrentGuess((oldGuess) => oldGuess + keyPressed);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, guesses, isGameOver, solution, isModalShown, modalMessage]);

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
        <Modal
          message={modalMessage}
          modalHandler={closeModal}
          isGameOver={isGameOver}
        />
      ) : null}
    </>
  );
};

export default Grid;
