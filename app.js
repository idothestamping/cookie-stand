'use strict';
// materialize side menu on mobile
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.carousel').carousel({fullWidth: true});
  setInterval(function() {
      $('.carousel').carousel('next');
  }, 3000);
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
var storeForm = document.getElementById('store-form');

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
    this.customers.push(Math.floor((Math.random() * (this.max - this.min + 1)) + this.min));
  }
};

Store.prototype.cookiesBought = function(){
  for(var i = 0; i < hours.length; i++){
    this.cookiesPerHour.push(Math.ceil(this.customers[i] * this.avg));
  }
};

Store.prototype.totalCookies = function(){
  // var total = 0;
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
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.cookiesPerDay;
  trEl.appendChild(tdEl).classList.add('total');

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
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
    // Header text for Daily Total column.
    if (i === hours.length - 1){
      thEl = document.createElement('th');
      thEl.textContent = 'Total';
      trEl.appendChild(thEl);
      storeTable.appendChild(trEl);
    }
  }
}

function makeFooterRow() {
  var cookiesPerHour = [];
  for (var i = 0; i < hours.length; i ++){
    var cookiesPerHourTotal = 0;
    for (var j =0; j < allStores.length; j++){
      cookiesPerHourTotal += allStores[j].cookiesPerHour[i];
    }
    cookiesPerHour.push(cookiesPerHourTotal);
  }
  var footer = document.getElementById('myDynamicTable');
  var trEl = document.createElement('tr');
  trEl.id = 'footerRow';
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total';
  trEl.appendChild(tdEl);
  for (i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }
  console.log(cookiesPerHourTotal);
  var grandTotal = 0;
  for (i = 0; i < hours.length; i++){
    grandTotal += cookiesPerHour[i];
  }
  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);
  footer.appendChild(trEl).classList.add('total');
}

function renderallStores() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
}

// Add event listener and handle submit
storeForm.addEventListener('submit', handleSubmit);

function handleSubmit(event){
  var newStore = event.target.name.value;
  var newMin = Number(event.target.min.value);
  var newMax = Number(event.target.max.value);
  var newAvg = event.target.avg.value;
  var addStore = new Store(newStore, newMin, newMax, newAvg);
  //prevents page reload on a 'submit' event
  event.preventDefault();
  if (newMin < newMax) {
    console.log(newStore);
    // This empties the form fields after the data has been grabbed
    event.target.name.value = null;
    event.target.min.value = null;
    event.target.max.value = null;
    event.target.avg.value = null;
    addStore.render();
  }
  else {
    alert('mininum customer value cannot be greater than max value.');
  }
  var footerRow = document.getElementById('footerRow');
  if (footerRow){
    footerRow.remove();
    makeFooterRow();
  }
}
makeHeaderRow();
renderallStores();
makeFooterRow();