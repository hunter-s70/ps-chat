var user = require('./user/user.js');
var util = require('util');

console.log(module);
var user1 = new user.User('Vasiliy');
var user2 = new user.User('Petro');

console.log(user2.hello(user1));
console.log(user1.hello(user2));

// utilits
// util.inspect(obj);
// util.format('My %s %d $j', 'string', 222, {test: 'object'});
// util.inherits(Rabbit, Animal);
// console.error('error');