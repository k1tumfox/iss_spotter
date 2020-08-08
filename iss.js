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

module.exports = { fetchMyIP };