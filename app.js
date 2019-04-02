'use strict';

var storeList = {
  "1st and Pike": ['23', '65', '6.5'],
  "SeaTac Airport": ['23', '65', '6.5'],
  "Seattle Center": ['23', '65', '6.5'],
  "Capitol Hill": ['23', '65', '6.5'],
  "Alki": ['23', '65', '6.5']
};

var storeHours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '7pm',
  '8pm',
];

document.body.onload = addStoreArry;
var storeNames = document.getElementById('storeNames');

function addStoreArry () {  // auto generate store names from list
  for(var i=0; i < Object.keys(storeList).length; i++){
    var dayTotal = [];
    var newDiv = document.createElement("div");
    newDiv.className = 'storeNames';
    var newContent = document.createTextNode(Object.keys(storeList)[i]);
    newDiv.appendChild(newContent);  
    var currentDiv = document.getElementById("storeNames");
    document.body.insertBefore(newDiv, currentDiv);

      for(var j=0; j < storeHours.length; j++){ // nested loop to auto generate each hour per store for set hours
        var liEl = document.createElement('li'); 
        var getRandomInt = function(){  // get min and max cutomer and avg cookie sale per customer
          let min = Math.ceil(Object.values(storeList)[i][0]);
          let max = Math.floor(Object.values(storeList)[i][1]);
          return Math.floor((Math.random() * (max - min + 1)) + min * Object.values(storeList)[i][2]);
        };
        liEl.className = 'perHourData';
        var cookiePerHourNumber = getRandomInt(); // get random customer intake within min max threshold
        var cookiePerHourText = storeHours[j] + ': ' + getRandomInt() + ' cookies';
        // liEl.textContent = storeHours[j] + ': ' + getRandomInt() + ' cookies';
        liEl.textContent = cookiePerHourText;
        newDiv.appendChild(liEl); // add total sold per hour per store
        dayTotal.push(cookiePerHourNumber); 
        
      };
      // add total cookies sold per day per store
      var dayTotalText = dayTotal.reduce(function(pv, cv) { return pv + cv; }, 0);
      console.log(dayTotal);
      var totalDiv = document.createElement("div");
      newDiv.className = 'storeNames';
      var totalContent = document.createTextNode('Total: ' + dayTotalText + ' cookies'); 
      newDiv.appendChild(totalContent);  
      var currentTotalDiv = document.getElementById("total");
      document.body.insertBefore(totalDiv, currentTotalDiv);
  };
};

