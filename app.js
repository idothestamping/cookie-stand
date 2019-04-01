'use strict';

var storeLocation = [
  '1stAndPike', 
  'SeaTacAirport', 
  'SeattleCenter', 
  'CapitolHill', 
  'Alki'
    ];

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

var ulEl = document.getElementById('1stAndPike');
var storeNames = document.getElementById('storeNames');

document.body.onload = addStoreArry;

function addStoreArry () { 
  for(var i=0; i < storeLocation.length; i++){
  var newDiv = document.createElement("div");
  newDiv.className = 'storeNames';
  var newContent = document.createTextNode(storeLocation[i]); 
  newDiv.appendChild(newContent);  // auto generate store names
  var currentDiv = document.getElementById("storeNames"); 
  document.body.insertBefore(newDiv, currentDiv);
    for(var j=0; j < storeHours.length; j++){ // nested loop to add times per auto generated store names
      var liEl = document.createElement('li');
      liEl.textContent = storeHours[j];
      newDiv.appendChild(liEl);
    };
  };
};




