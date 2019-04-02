'use strict';

var storeLocation = [
  'FirstAndPike',
  'SeaTacAirport',
  'SeattleCenter',
  'CapitolHill',
  'Alki'
];

var storeAverage = {
  "FirstAndPike": ['23', '65', '6.5'],
  "SeaTacAirport": ['23', '65', '6.5'],
  "SeattleCenter": ['23', '65', '6.5'],
  "CapitolHill": ['23', '65', '6.5'],
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

var data = [
  ['23', '65', '6.5'],
  ['3', '24',	'1.2'],
  ['11', '38', '3.7'],
  ['20','38',	'2.3'],
  ['2', '16', '4.6']
];

document.body.onload = addStoreArry;

var storeNames = document.getElementById('storeNames');

function addStoreArry () {  // auto generate store names
  for(var i=0; i < storeLocation.length; i++){
    var newDiv = document.createElement("div");
    newDiv.className = 'storeNames';
    var newContent = document.createTextNode(storeLocation[i]); 
    newDiv.appendChild(newContent);  
    var currentDiv = document.getElementById("storeNames");
    document.body.insertBefore(newDiv, currentDiv);

      for(var j=0; j < storeHours.length; j++){ // nested loop to add times per auto generated store names
        var liEl = document.createElement('li');
        // let values = Object.values(storeAverage)
        console.log('data1: ' + data[i][0]);
        console.log('data2: ' + data[i][1]);
        var getRandomInt = function(){
          let min = Math.ceil(data[i][0]);
          let max = Math.floor(data[i][1]);
          return Math.floor((Math.random() * (max - min + 1)) + min * data[i][2]);
        };

        liEl.className = 'perHourData';
        liEl.textContent = storeHours[j] + ': ' + getRandomInt() + ' cookies';
        // liEl.textContent = storeHours[j] + ' test';
        newDiv.appendChild(liEl);
      };
  };
};
