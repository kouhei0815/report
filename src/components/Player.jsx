import React from "react";
import WeatherInfo from "./WeatherInfo";  
import { cities } from "../utils";

const Player = ({ player, selectedCountry, onSelectCountry, weather, stats, onAttack }) => (
  <div style={{ flex: 1, padding: "5px", display: "flex", flexDirection: "column", alignItems: "center", margin: "0 5px" }}>
    <h2>{player.name}</h2>
    <p className="stats">HP: {player.hp}</p>
    <p className="stats">攻撃力: {player.attack}</p>
    <p className="stats">防御力: {player.defense}</p>
    <select value={selectedCountry} onChange={(e) => onSelectCountry(e.target.value)} style={{ padding: "10px", margin: "5px 0", borderRadius: "4px" }}>
      <option value="">国を選択してください</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
    {weather && <WeatherInfo weather={weather} stats={stats} />}
    {onAttack && (
      <button onClick={onAttack} style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        1P 攻撃
      </button>
    )}
  </div>
);

export default Player;
