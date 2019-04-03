'use strict';
// materialize side menu on mobile
$(document).ready(function(){
  $('.sidenav').sidenav();
});

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

// Lab-07 requirement: Table using contructors
var allStores = [];

function Store(name, min, max, avg) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.customers = [];
  this.cookiesPerHour = [];
  this.cookiesPerDay = 0;
  allStores.push(this);
}
// Store instances
new Store('1st and Pike','23', '65', '6.5');
new Store('SeaTac Airport','3', '24', '1.2');
new Store('Seattle Center','11', '38', '3.7');
new Store('Capitol Hill','20', '38', '2.3');
new Store('Alki', '2', '16', '4.6');

console.table(allStores);

Store.prototype.randomCustomers = function(){
  for(var i = 0; i < hours.length; i++){ 
    // Save for reference:
    // let min = Math.ceil(Object.values(allStores[0])[1]);
    // let max = Math.floor(Object.values(allStores[0])[2]);
    // let avg = Object.values(allStores[0])[3]);
    this.customers.push(Math.floor((Math.random() * (this.max - this.min + 1)) + this.min));
  };
};

Store.prototype.cookiesBought = function(){
  for(var i = 0; i < hours.length; i++){
    this.cookiesPerHour.push(Math.ceil(this.customers[i] * this.avg));
  }
};

Store.prototype.totalCookies = function(){
  var total = 0;
  for(var i = 0; i < hours.length; i++){
    this.cookiesPerDay = this.cookiesPerHour.reduce(function(pv, cv) { return pv + cv; }, 0);
  }
};

Store.prototype.render = function(){

  this.randomCustomers();
  this.cookiesBought();
  this.totalCookies();

  var storeTable = document.getElementById('myDynamicTable');
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
    for (var i = 0; i < hours.length; i++){
      tdEl = document.createElement('td');
      tdEl.textContent = this.cookiesPerHour[i];
      trEl.appendChild(tdEl);
    };
  var tdEl = document.createElement('td');
  tdEl.textContent = this.cookiesPerDay;
  trEl.appendChild(tdEl).classList.add('total');;
  

  storeTable.appendChild(trEl);
};

function makeHeaderRow() {
  // Make a blank column 1 header cell
  var storeTable = document.getElementById('myDynamicTable');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
 
  for (var i = 0; i < hours.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[i]; 
    trEl.appendChild(thEl);
    // Header text for Daily Total column.
    if (i === hours.length - 1){ 
      thEl = document.createElement('th');
      thEl.textContent = 'Daily Location Total';
      trEl.appendChild(thEl);
      storeTable.appendChild(trEl);
    };
  };
};

function renderallStores() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  };
};

makeHeaderRow();
renderallStores();