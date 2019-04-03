'use strict';
// materialize side menu on mobile
$(document).ready(function(){
  $('.sidenav').sidenav();
});

var storeList = {
  "1st and Pike": ['23', '65', '6.5'],
  "SeaTac Airport": ['3', '24', '1.2'],
  "Seattle Center": ['11', '38', '3.7'],
  "Capitol Hill": ['20', '38', '2.3'],
  "Alki": ['2', '16', '4.6']
};

var hours = [
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

var storeNames = document.getElementById('storeNames');

function addStoreArry(){  // auto generate store names from list into sepcific div and auto add class
  for(var i=0; i < Object.keys(storeList).length; i++){
    var cookiePerHourArr = [];
    var newDiv = document.createElement("div");
    newDiv.className = 'storeNames';
    var newContent = document.createTextNode(Object.keys(storeList)[i]);
    newDiv.appendChild(newContent);  
    var parent  = document.getElementById('test');
    parent.appendChild(newDiv, parent);

      for(var j=0; j < hours.length; j++){ // nested loop to auto generate each hour per store for set hours
        var liEl = document.createElement('li'); 
        var getRandomInt = function(){  // get min and max cutomer and avg cookie sale per customer
          let min = Math.ceil(Object.values(storeList)[i][0]);
          let max = Math.floor(Object.values(storeList)[i][1]);
          return Math.floor((Math.random() * (max - min + 1)) + min * Object.values(storeList)[i][2]);
        };
        liEl.className = 'perHourData';
        var cookiePerHour = getRandomInt(); // get random customer intake within min max threshold
        var cookiePerHourText = hours[j] + ': ' + getRandomInt() + ' cookies';
        liEl.textContent = cookiePerHourText;
        newDiv.appendChild(liEl); // add total sold per hour per store
        cookiePerHourArr.push(cookiePerHour); 
        
      };
      // add total cookies sold per day per store
      var totalCookieArr = cookiePerHourArr.reduce(function(pv, cv) { return pv + cv; }, 0);
      console.log(cookiePerHourArr);
      newDiv.className = 'storeNames';
      var totalContent = document.createTextNode('Total Cookies: ' + totalCookieArr); 
      newDiv.appendChild(totalContent);  
      parent.appendChild(newDiv, parent);
  };
};
addStoreArry();