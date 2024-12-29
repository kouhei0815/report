import React, { useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import { fetchWeather, calcPlayerStats, attack, initialState, dummyLogs, cities } from "./utils";

const App = () => {
  const [selectedCountry1, setSelectedCountry1] = useState("");
  const [selectedCountry2, setSelectedCountry2] = useState("");
  const [player1, setPlayer1] = useState({ ...initialState, name: "Player 1" });
  const [player2, setPlayer2] = useState({ ...initialState, name: "Player 2" });

  const [weather1, setWeather1] = useState({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });
  const [weather2, setWeather2] = useState({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1Stats, setPlayer1Stats] = useState("");
  const [player2Stats, setPlayer2Stats] = useState("");
  const logRef = useRef(null);
  const [log, setLog] = useState(dummyLogs);

  useEffect(() => {
    if (selectedCountry1) {
      fetchWeather(selectedCountry1, setWeather1, "1", player1, weather2, setPlayer1Stats, setPlayer1);
    } else {
      setWeather1({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });
    }
    if (selectedCountry2) {
      fetchWeather(selectedCountry2, setWeather2, "2", player2, weather1, setPlayer2Stats, setPlayer2);
    } else {
      setWeather2({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });
    }
  }, [selectedCountry1, selectedCountry2]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleSelectCountry1 = (country) => {
    setSelectedCountry1(country);
    setLog((prevLog) => [...prevLog, `Player 1 が ${country} を選択した`]);
  };

  const handleAttackPlayer1 = () => {
    attack(player1, player2, setPlayer2, "Player 1", "Player 2", setLog, setGameOver, setWinner);
    const randomCountry = cities[Math.floor(Math.random() * cities.length)];
    setSelectedCountry2(randomCountry);
    fetchWeather(randomCountry, setWeather2, "2", player2, weather1, setPlayer2Stats, setPlayer2).then(() => {
      attack(player2, player1, setPlayer1, "Player 2", "Player 1", setLog, setGameOver, setWinner);
    });
  };

  const resetGame = () => {
    setPlayer1({ ...initialState, name: "Player 1" });
    setPlayer2({ ...initialState, name: "Player 2" });
    setSelectedCountry1("");
    setSelectedCountry2("");
    setWeather1({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });
    setWeather2({ weather: [{ main: "天気無し" }], main: { temp: "気温null" } });
    setGameOver(false);
    setWinner(null);
    setPlayer1Stats("");
    setPlayer2Stats("");
    setLog(dummyLogs);
  };

  if (gameOver) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "50px" }}>
        <h1>ゲームオーバー</h1>
        <h2>{winner} の勝利！</h2>
        <button onClick={resetGame} style={{ padding: "15px 30px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "18px" }}>
          もう一度遊ぶ
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>天気で対戦ゲーム</h1>
      <div style={{ display: "flex", width: "90%", justifyContent: "center", padding: "10px" }}>
        <Player player={player1} selectedCountry={selectedCountry1} onSelectCountry={handleSelectCountry1} weather={weather1} stats={player1Stats} onAttack={handleAttackPlayer1} />
        <Log log={log} logRef={logRef} resetGame={resetGame} />
        <Player player={player2} selectedCountry={selectedCountry2} onSelectCountry={setSelectedCountry2} weather={weather2} stats={player2Stats} />
      </div>
      
    </div>
  );
};

export default App;
