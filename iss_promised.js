const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
};  //returns promise of request for IP data  as JSON string

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};  //makes request to ipvigilante to return the promise from request

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };