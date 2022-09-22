import { useState } from "react";
import { useAuth } from "react-oidc-context";

function getWeatherList(token: string): Promise<Weather[]> {
  const headers = new Headers();

  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(`https://localhost:7054/WeatherForecast`, options).then(
    (response) => response.json()
  );
}

export const WeatherforcastList = () => {
  const [weathers, setWeathers] = useState<Weather[]>([]);
  const { user } = useAuth();

    function getData() {
      getWeatherList(user?.access_token??"")
        .then((list) => {
          setWeathers(list);
        })
        .catch((error) => console.log(error));
    }

    const weitherListItems = weathers.map((w) => (
      <div key={w.date.toString()}>
        <b>{w.date.toLocaleString()}</b>
        <div>{w.temperatureC}</div>
        <div>{w.temperatureF}</div>
        <p>{w.summary}</p>
      </div>
    ));

    return (
      <>
        <div>
          <button onClick={() => getData()}>getWether</button>
          <div>{weitherListItems}</div>
        </div>
      </>
    );
};

class Weather {
  date: Date;
  temperatureC: string;
  temperatureF: string;
  summary: string;

  constructor(date: Date, tempC: string, tempF: string, summary: string) {
    this.date = date;
    this.temperatureC = tempC;
    this.temperatureF = tempF;
    this.summary = summary;
  }
}
