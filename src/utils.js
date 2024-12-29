export const initialState = {
  name: "Player",
  attack: 10,
  defense: 5,
  hp: 100,
};

export const dummyLogs = [
  "ゲームスタート！",
  "プレイヤー1が攻撃の準備中...",
  "プレイヤー2が防御を整えています...",
  "天気情報取得中..."
];

export const cities = [
  "Tokyo",
  "New York",
  "London",
  "Paris",
  "Sydney",
  "Berlin",
  "San Francisco",
  "Seoul",
  "Moscow",
  "Delhi",
  "Sao Paulo",
  "Mumbai",
  "Mexico City",
  "Cairo",
  "Beijing",
  "Istanbul",
  "Buenos Aires",
  "Karachi",
  "Jakarta",
  "Lagos",
  "Dhaka",
  "Bangkok",
  "Kolkata",
  "Tehran",
  "Kinshasa",
  "Los Angeles",
  "Rio de Janeiro",
  "Shenzhen",
  "Hong Kong"
];

export const fetchWeather = async (country, setWeather, player, playerState, opponentWeather, setPlayerStats, setPlayer) => {
  const apiKey = "0ad4235b6cc4c4cc9a208aab38ee1e1f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      setWeather(data);

      if (player === "1") {
        const { statsChange, player: updatedPlayer } = calcPlayerStats(playerState, data, opponentWeather);
        setPlayerStats(statsChange);
        setPlayer(updatedPlayer);
      } else if (player === "2") {
        const { statsChange, player: updatedPlayer } = calcPlayerStats(playerState, data, opponentWeather);
        setPlayerStats(statsChange);
        setPlayer(updatedPlayer);
      }
    } else {
      alert(`エラー: ${data.message}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("ネットワークエラーが発生しました。再試行してください。");
  }
};

export const calcPlayerStats = (player, weatherData, opponentWeather) => {
  if (weatherData && weatherData.weather) {
    const weather = weatherData.weather[0].main;
    const temp = weatherData.main.temp;
    const opponentTemp = opponentWeather ? opponentWeather.main.temp : temp;
    const tempBonus = temp > opponentTemp ? 1.5 : 1;
    let attackBonus = 0;
    let defenseBonus = 0;
    let statsChange = "";

    if (weather === "Clear") {
      attackBonus = Math.ceil(5 * tempBonus);
      statsChange = `アタック+${attackBonus}`;
    } else if (weather === "Rain") {
      defenseBonus = Math.ceil(5 * tempBonus);
      statsChange = `ディフェンス+${defenseBonus}`;
    } else if (weather === "Snow") {
      attackBonus = Math.ceil(3 * tempBonus);
      statsChange = `アタック+${attackBonus}`;
    } else if (weather === "Mist") {
      attackBonus = Math.ceil(2 * tempBonus);
      defenseBonus = Math.ceil(3 * tempBonus);
      statsChange = `アタック+${attackBonus} ディフェンス+${defenseBonus}`;
    } else if (weather === "Clouds") {
      attackBonus = Math.ceil(3 * tempBonus);
      defenseBonus = Math.ceil(2 * tempBonus);
      statsChange = `アタック+${attackBonus} ディフェンス+${defenseBonus}`;
    }

    return { 
      statsChange: statsChange, 
      player: {
        ...player,
        attack: player.attack + attackBonus,
        defense: player.defense + defenseBonus,
        hp: player.hp, // HPは更新しない
      } 
    };
  }
  return { statsChange: "", player: player };
};

export const attack = (attacker, defender, setDefender, attackerName, defenderName, setLog, setGameOver, setWinner) => {
  if (defender.hp === 0) return;

  const damage = Math.max(1, attacker.attack - defender.defense);
  const newHp = Math.max(0, defender.hp - damage);
  setDefender((prevDefender) => ({ ...prevDefender, hp: newHp }));

  const newLog = `${attackerName} が ${defenderName} に ${damage} ダメージを与えた！`;
  setLog((prevLog) => [...prevLog, newLog]);

  if (newHp === 0) {
    setGameOver(true);
    setWinner(attackerName);
  }
};
