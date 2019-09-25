const request = require("request");
const config = require("./config");

const key = config.configAPI; // for local development only
const darkskyapi = process.env.darkskyapi;

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${darkskyapi}/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const currently = body.currently;
      const currentTemperature = Math.round(currently.temperature);
      const feelsLikeTemperature = Math.round(currently.apparentTemperature);
      callback(
        undefined,
        {
          currentTemp: currentTemperature,
          feelsLike: feelsLikeTemperature,
          summary: body.daily.data[0].summary
        }
        // `${body.daily.data[0].summary} It is currently ${currentTemperature} degrees outside and it feels like ${feelsLikeTemperature} outside. There is a ${currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
