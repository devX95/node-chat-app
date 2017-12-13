const moment = require('moment');

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
var createdAt = new Date().getTime();
var date = moment(createdAt);

console.log(date.format('MMM Do YYYY h:mm a'));