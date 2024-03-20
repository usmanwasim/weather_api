import { useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import axios from "axios";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./config";
import { toast } from "react-toastify";

export const WeatherForecast = () => {
  const [active, setActive] = useState(false);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      if (city === "") {
        return toast.error("Please enter a city");
      }
      // fetch weather data based on city name
      const response = await axios.get(
        `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setCity("");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        toast.error("City not found");
      } else if (error.request) {
        toast.error("Error fetching data");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          my: { xs: 2, sm: 3 },
          color: "#A020F0",
          fontWeight: "700",
          fontSize: { xs: "24px", sm: "32px" },
        }}
      >
        Weather Forecast
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #A020F0",
          borderRadius: "10px",
          width: { xs: "90%", sm: "50%" },
          mx: "auto",
        }}
      >
        <InputBase
          placeholder="Enter city name"
          sx={{
            width: "100%",
            padding: "5px 10px",
          }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          sx={{
            width: "max-content",
            borderRadius: "0 10px 10px 0",
            fontSize: { xs: "10px", sm: "12px" },
            color: "#A020F0",
          }}
          onClick={() => fetchData()}
        >
          Search
        </Button>
      </Box>
      {weatherData?.main?.temp ? (
        <Box
          sx={{
            width: { xs: "95%", sm: "40%" },
            mx: "auto",
            my: { xs: 2, sm: 3.5, md: 5 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            {/* display img based on weather */}
            <img
              // src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />

            <Box>
              {/* city name and country */}
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "20px", sm: "28px" },
                  color: "#A020F0",
                }}
              >
                {weatherData.name} {weatherData.sys.country}
              </Typography>
              {/* weather description */}
              <Typography fontSize="18px">
                {weatherData.weather[0].description}
              </Typography>
              {/* temperature	in °C & °F */}
              <Typography fontSize="18px">
                {active
                  ? Math.round((weatherData.main.temp * 9) / 5 + 32)
                  : Math.round(weatherData.main.temp)}{" "}
                <span
                  style={{
                    color: !active ? "#A020F0" : "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(false)}
                >
                  °C
                </span>{" "}
                |{" "}
                <span
                  style={{
                    color: active ? "#A020F0" : "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(true)}
                >
                  °F
                </span>
              </Typography>
            </Box>
          </Stack>

          <Stack direction="column" gap={1} mt={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="16px">Feels like</Typography>
              <Typography fontSize="16px">
                {Math.round(weatherData.main.feels_like)}°C
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="16px">Wind</Typography>
              <Typography fontSize="16px">
                {weatherData.wind.speed * 3.6} km/h
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="16px">Humidity</Typography>
              <Typography fontSize="16px">
                {weatherData.main.humidity}%
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="16px">Pressure</Typography>
              <Typography fontSize="16px">
                {weatherData.main.pressure} hPa
              </Typography>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            mx: "auto",
            my: 3,
          }}
        >
          Please enter city name for weather forecast details
        </Typography>
      )}
    </>
  );
};
