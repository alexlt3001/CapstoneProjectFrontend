// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Filecontext } from '../reactrouter/FileContext';
// import LogInModal from './LogInModal';

// const LogInForm = () => {

//   const navigate = useNavigate();

//   const [listOfUsers, setListOfUsers] = useState([]);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isUserRegistered, setIsUserRegistered] = useState(false);
//   // const [player, setPlayer] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);

//   const {currentGame, setCurrentGame, player, setPlayer} = useContext(Filecontext);

//   const handleJoin = () => {
//     setShowLoginModal(true);
//   };

//   const handleLogin = async (username, password) => {
//     if (!username || !password) {
//       alert('Please enter both username and password');
//       return;
//     }

//     const newPlayer = { username, password };
//     setListOfUsers([...listOfUsers, newPlayer]);
//     setShowLoginModal(false);
//     setIsUserRegistered(true);
//     await postPlayer(newPlayer);
//   };

//   const handlePlay = async () => {
//     if (!isUserRegistered) {
//       alert('User not created, please create a user first to play');
//     } else {
//       const response = await fetch(`http://localhost:8080/games?playerId=${player.id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const newGame = await response.json();
//       setCurrentGame(newGame);
//         setGameStarted(true);
//         navigate('/play');
//     }
//   };
  

//   const postPlayer = async (newPlayer) => {
//     console.log(newPlayer);
//     const response = await fetch('http://localhost:8080/api/players', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newPlayer),
//     });
//     const savedPlayer = await response.json();
//     setPlayer(savedPlayer); // Update player state with the saved player
//   };

//   return (
//     <>
//       <div className='title-screen'>
//         <h1>Higher or Lower: Pokémon edition</h1>
//       </div>
//       <button onClick={handleJoin}>Join</button>
//       <button onClick={handlePlay} disabled={gameStarted}>
//         Play
//       </button>
//       <button>LeaderBoard</button>

//       {showLoginModal && <LogInModal handleLogin={handleLogin} />}

//       {isUserRegistered && <p>User created, you can now play</p>}
//     </>
//   );
// };

// export default LogInForm;


import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filecontext } from '../reactrouter/FileContext';
import LogInModal from './LogInModal';
import LeaderboardModal from './LeaderboardModal';

const LogInForm = () => {

  const navigate = useNavigate();

  const [listOfUsers, setListOfUsers] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  // const [player, setPlayer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [playerScores, setPlayerScores] = useState([]);

  const {currentGame, setCurrentGame, player, setPlayer} = useContext(Filecontext);

  const handleJoin = () => {
    setShowLoginModal(true);
  };

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    const newPlayer = { username, password };
    setListOfUsers([...listOfUsers, newPlayer]);
    setShowLoginModal(false);
    setIsUserRegistered(true);
    await postPlayer(newPlayer);
  };

  const handlePlay = async () => {
    if (!isUserRegistered) {
      alert('User not created, please create a user first to play');
    } else {
      const response = await fetch(`http://localhost:8080/games?playerId=${player.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const newGame = await response.json();
      setCurrentGame(newGame);
        setGameStarted(true);
        navigate('/play');
    }
  };
  

  const postPlayer = async (newPlayer) => {
    console.log(newPlayer);
    const response = await fetch('http://localhost:8080/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    });
    const savedPlayer = await response.json();
    setPlayer(savedPlayer); // Update player state with the saved player
  };

  const fetchPlayerScores = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/players');
      const players = await response.json();

      // Extract username and highest score for each player
      const playerScores = players.map((player) => {
        const { username, games } = player;
        const highestScore = Math.max(...games.map((game) => game.score));
        return { username, highestScore };
      });

      // Sort the player scores in descending order based on highest score
      playerScores.sort((a, b) => b.highestScore - a.highestScore);

      // Set the player scores in state
      setPlayerScores(playerScores);


       // Open the leaderboard modal
       setShowLeaderboardModal(true);
      } catch (error) {
        console.error('Error fetching player scores:', error);
      }
    };
  
    const handleLeaderboard = () => {
      fetchPlayerScores();
    };
  

    return (
      <>
        <div className='title-screen'>
          <h1>Higher or Lower: Pokémon edition</h1>
        </div>
        <button onClick={handleJoin}>Join</button>
        <button onClick={handlePlay} disabled={gameStarted}>
          Play
        </button>
        <button onClick={handleLeaderboard}>LeaderBoard</button>
    
        {showLoginModal && <LogInModal handleLogin={handleLogin} onClose={() => setShowLoginModal(false)} />}
    
        {isUserRegistered && <p>User created, you can now play</p>}
    
        {showLeaderboardModal && (
          <LeaderboardModal
            playerScores={playerScores}
            onClose={() => setShowLeaderboardModal(false)}
          />
        )}
      </>
    );
    
};

export default LogInForm;