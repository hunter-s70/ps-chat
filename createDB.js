const mongoose = require('mongoose');
const config = require('./config');


// test using mongoose
// use db.cats.find() - to find data in MongoDB
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(mongoose.connection.name);
});

var kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

// model name is "Cat", so in MongoDB creates "cats" collection
const Cat = mongoose.model('Cat', kittySchema);


const kitty = new Cat({ name: 'Zildjian' });
console.log(kitty.name);

const fluffy = new Cat({ name: 'fluffy' });
fluffy.speak();

kitty.save().then(() => console.log('meow'));

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Cat.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});