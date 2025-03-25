import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  const [weather, setWeather] = useState(null); // Alterado de {} para null
  const inputRef = useRef();

  async function searchCity() {
    try {
      const city = inputRef.current.value;
      if (!city) return;

      const key = "925ca740fea3f16bee6dae2873ac588f";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      const apiInfo = await axios.get(url);
      setWeather(apiInfo.data);
      console.log("API Response:", apiInfo.data); // Para debug
    } catch (error) {
      console.error("Erro na API:", error);
      alert("Erro ao buscar a cidade. Verifique o nome digitado.");
    }
  }

  return (
    <div className="container">
      <h1>Previsão do tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}

export default App;
