const request = require("request");
const config = require("./config");

const key = config.configAPI;

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const currently = body.currently;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees outside. There is a ${currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
