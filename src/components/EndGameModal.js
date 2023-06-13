import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import App from "../App";
import PlayContainer from "../containers/PlayContainer";
import score from "../containers/PlayContainer"
import setScore from "../containers/PlayContainer"
import highScore from "../containers/PlayContainer"
import setHighScore from "../containers/PlayContainer"
import setLives from "../containers/PlayContainer"
import { Filecontext } from "../reactrouter/FileContext";
const EndGameModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const score = location.state?.score;
    const {currentGame, setCurrentGame} = useContext(Filecontext);
    const {player, setPlayer} = useContext(Filecontext);

    const handlePlayAgain = async () => {
        const response = await fetch(`http://localhost:8080/games?playerId=${player.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      
        const newGame = await response.json();
        setCurrentGame(newGame);
        navigate("/play");
      };      
      
    const handleMainMenu = () => {
            navigate ("/")
        };
return (
            <>
                <h1>Game Over!</h1>
                <p>Final Score: {score}</p>
                <button onClick={handlePlayAgain}>Play again</button>
                <button onClick={handleMainMenu}>Main Menu</button>
            </>
         );
      
        };
export default EndGameModal;