import "./WeatherInfo5Days.css";

function WeatherInfo5Days({ weather5Days }) {
  if (!weather5Days || !weather5Days.list) {
    return <p>Carregando previsão para os próximos dias...</p>;
  }

  let dailyForecast = {}; // Objeto para armazenar apenas 1 previsão por dia

  // 🔹 Filtrando apenas 1 previsão por dia (a mais próxima do meio-dia)
  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString("pt-BR");

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  // 🔹 Convertendo para array e pegando apenas os primeiros 5 dias
  const next5DaysForecast = Object.values(dailyForecast).slice(0, 5);

  console.log("Previsões filtradas:", next5DaysForecast); // Teste no console

  return (
    <div className="weather-container">
      <h2>Previsão para os próximos 5 dias</h2>
      {next5DaysForecast.map((forecast, index) => (
        <div key={forecast.dt} className="weather-day">
          <p>
            {new Date(forecast.dt * 1000).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt="Ícone do clima"
          />
          <p>{forecast.weather[0].description}</p>
          <p>
            {Math.round(forecast.main.temp_min)}ºC min /{" "}
            {Math.round(forecast.main.temp_max)}ºC máx
          </p>
        </div>
      ))}
    </div>
  );
}

export default WeatherInfo5Days;
