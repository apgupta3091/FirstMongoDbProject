const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check data, no name specified"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Peaches are so yummy",
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "decent fruit",
});

mango.save();

Person.updateOne({ name: "John" }, { favoriteFruit: mango }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully updated the doc");
  }
});

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple,
// });

// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "the best Fruit",
});

const orange = new Fruit({
  name: "Orange",
  score: 5,
  review: "sour",
});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird texture",
});

// // Fruit.insertMany([kiwi, orange, banana], function (err) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("succsessfullly saved all the fruits to fruitsDB");
// //   }
// // });

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne(
//   { _id: "612a9955c96a813574681e35" },
//   { name: "Peach" },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("succsessfullly updated the document.");
//     }
//   }
// );

// Fruit.deleteOne({ name: "Peach" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("succsessfullly deleted the document");
//   }
// });

// Person.deleteMany({ name: "John" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("succsessfullly deleted the document with name John");
//   }
// });
