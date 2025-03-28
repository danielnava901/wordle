import React, { useEffect, useState } from "react";
import Modal from "../aa_components/Modal.jsx";
import Board from "./components/Board.jsx";
import db from "../../../db/wordle.db.json";

function isValidChar(char) {
  return "abcdefghijklmnñopqrstuvwxyz".includes(char.toLowerCase());
}
const WordleWrapper = ({ setNextGame }) => {
  const [wordl, setWordl] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState(0);
  const [finalState, setFinalState] = useState("playing"); // win|lose
  const [openModal, setOpenModal] = useState(false);

  const handleKeyboard = (ev) => {
    ev.preventDefault();

    if (finalState === "win" || finalState === "lose") return;

    if (isValidChar(ev.key)) {
      setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses];
        if (newGuesses[currentGuess].length < 5) {
          newGuesses[currentGuess] += ev.key.toLowerCase();
        }
        return newGuesses;
      });
    } else if (ev.key === "Enter") {
      setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses];

        if (newGuesses[currentGuess].length === 5) {
          if (newGuesses[currentGuess] === wordl.toLowerCase()) {
            setFinalState((prev) => {
              setCurrentGuess((prev) => prev + 1);
              window.removeEventListener("keydown", handleKeyboard);
              setOpenModal(true);
              return "win";
            });
          } else if (
            currentGuess === 5 &&
            newGuesses[currentGuess] !== wordl.toLowerCase()
          ) {
            setFinalState((prev) => {
              setCurrentGuess((prev) => prev + 1);
              window.removeEventListener("keydown", handleKeyboard);
              setOpenModal(true);
              return "lose";
            });
          } else {
            setCurrentGuess((prev) => prev + 1);
          }
        }
        return newGuesses;
      });
    } else if (ev.key === "Backspace") {
      setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses];

        let w = newGuesses[currentGuess];
        if (newGuesses[currentGuess].length > 0) {
          w = w.split("");
          w.pop();
          w = w.join("");
          newGuesses[currentGuess] = w;
        }

        return newGuesses;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [guesses, currentGuess]);

  useEffect(() => {
    console.log("init");
    const getData = async () => {
      console.log(db);
      let response = db;
      /*
      let response = await fetch("db/wordle.json");
      console.log(response);
      response = await response.json();
      */
      console.log({ response });
      let index = Math.floor(Math.random() * response.length);
      let wrd = response[index];

      setWordl(wrd);
    };

    getData();
  }, []);

  return (
    <div
      className="flex flex-col bg-gray-700"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <div className="w-full flex justify-between px-4 py-3">
        <div className="text-white">
          <span>Intento: {currentGuess + 1} - </span>
          <span className="font-bold uppercase">{finalState}</span>
        </div>
      </div>
      <Board
        guesses={guesses}
        currentLine={currentGuess}
        wordl={wordl.toLowerCase()}
      />
      {openModal && (
        <Modal
          className="w-[400px]"
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="flex flex-col h-[150px]">
            <div className="flex w-full flex-col flex-1">
              <span className="text-2xl font-bold w-full flex justify-center">
                {finalState === "win" ? "Ganaste!!!" : ""}
              </span>
              <span className="text-2xl font-bold w-full flex justify-center">
                {finalState === "lose" ? "Perdiste" : ""}
              </span>
              <span className="text-sm w-full flex justify-center">
                La palabra correcta era:
              </span>
              <span className="font-bold text-xl w-full flex justify-center">
                {wordl.toUpperCase()}
              </span>
            </div>
            <span
              className={`
                            border-1 
                            rounded 
                            ${
                              finalState === "win"
                                ? "bg-green-400"
                                : "bg-red-400"
                            } 
                            p-3 
                            cursor-pointer
                            w-full 
                            text-center uppercase text-white font-bold`}
              onClick={() => {
                setNextGame((prev) => prev + 1);
              }}
            >
              Nuevo juego
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

const WordleContainer = () => {
  const [nextGame, setNextGame] = useState(0);
  return (
    <div
      key={nextGame}
      className="h-full"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <WordleWrapper setNextGame={setNextGame} />
    </div>
  );
};

export default WordleContainer;
