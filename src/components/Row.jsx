import React from "react";
import "../styles/Row.css";

//Helper functions
const getIndicesForLetter = (text, letter) => {
  const indices = [];
  text.split("").forEach((textLetter, i) => {
    textLetter === letter ? indices.push(i) : null;
  });
  return indices;
};

const getSharedIndicesForLetter = (text1, text2, letter) => {
  return getIndicesForLetter(text1, letter).filter((value) =>
    getIndicesForLetter(text2, letter).includes(value)
  );
};

const countLettersForText = (text) => {
  const letterCounts = {};
  for (const letter of text) {
    if (letterCounts[letter]) {
      letterCounts[letter]++;
    } else {
      letterCounts[letter] = 1;
    }
  }
  return letterCounts;
};

const Row = ({ guess, isFinalGuess, solution }) => {
  const cells = [];
  const isCorrectGuess = guess === solution;
  const solutionLetterCounts = countLettersForText(solution);

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    let classNames = "cell";

    if (isFinalGuess) {
      if (letter === solution[i]) {
        classNames += " correct";
      } else if (solution.includes(letter)) {
        const sharedIndicesForLetter = getSharedIndicesForLetter(
          guess,
          solution,
          letter
        );

        if (sharedIndicesForLetter.length === solutionLetterCounts[letter])
          classNames += " incorrect";
        else if (
          sharedIndicesForLetter.length > 0 &&
          solutionLetterCounts[letter] > 0
        ) {
          classNames += " other-position";
          solutionLetterCounts[letter]--;
        } else if (
          sharedIndicesForLetter.length === 0 &&
          solutionLetterCounts[letter] > 0
        ) {
          classNames += " other-position";
          solutionLetterCounts[letter]--;
        } else {
          classNames += " other-position";
        }
      } else classNames += " incorrect";

      isCorrectGuess ? (classNames += " success") : (classNames += " fail");
    }

    cells.push(
      <span
        key={i}
        data-delay={i}
        className={`${classNames}`}
        style={{ transitionDelay: `${i / 10}s` }}
      >
        {letter}
      </span>
    );
  }

  return <div className="row">{cells}</div>;
};

export default Row;
