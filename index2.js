const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })

  //since a promise is returned by nextISSTimesForMyLocation,
  //we can attach as many callbacks to it as we'd like,
  //in this case, an error handling callback
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
//now if there is ever an error anywhere along our
//chain of promises, execution will jump to our
//catch callback instead.

//*if a promise is rejected and we didn't attach an
//error-handling (catch) callback, then we'd see
//UnhandledPromiseRejectionWarning.


//The below was used to test as we coded. Needs
//corresponding require and exports to work.

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

//fetchCoordsByIP--promise chain fetchCoordsByIP to fetchMyIP (this
//provides fetchCoordsByIP as a callback using .then)
//so it runs after fetchMyIP
//body => console...--this function returns a promise, so it calls .then
//on its return value. then takes in a callback which
//accepts the response body and prints to screen
//


