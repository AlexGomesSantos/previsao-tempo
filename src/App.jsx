import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import WeatherInfo from "./components/WeatherInfo";
import WeatherInfo5Days from "./components/WeatherInfo5Days";

function App() {
  console.log("App renderizou");

  const [weather, setWeather] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);
  // Alterado de {} para null
  const inputRef = useRef();

  async function searchCity() {
    try {
      const city = inputRef.current.value;
      if (!city) return;

      const key = "925ca740fea3f16bee6dae2873ac588f";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
      const url5Days = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      console.log("Dados da API (Clima Atual):", apiInfo.data);
      console.log("Dados da API (5 Dias):", apiInfo5Days.data);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao buscar a cidade. Verifique o nome digitado.");
    }
  }

  console.log("weather5Days no App:", weather5Days);

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
