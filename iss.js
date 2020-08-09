const request = require('request');
//asynch return our IP address using an API

// Input:
//  * - A callback (to pass back an error or the IP string)
//  * - Returns (via Callback):
//  *     - An error, if any (nullable)
//  *     - The IP address as a string (null if error). 

const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return; //Error() is something new, for now just know that it creates a new Error object
      //that we can pass around.
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates: ${body}`), null);
      return;
    }
  
    const { latitude, longitude } = JSON.parse(body).data;//*important

    callback(null, { latitude, longitude });

  });
};

//to read the API output as object
// request(`https://ipvigilante.com/70.54.64.15`, (error, response, body) => {
//   const ipInfo1 = JSON.parse(body).data.latitude;
//   const ipInfo2 = JSON.parse(body).data.longitude;
//   console.log(ipInfo1, ipInfo2);
// });


module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
