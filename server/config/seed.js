/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
var LineItem = require('../api/lineItem/lineItem.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');
var Order = require('../api/order/order.model');

var good = new Category({
  name: 'Good',
  popularity: 5
});

var bad = new Category({
  name: 'Bad',
  popularity: 1
});

var ugly = new Category({
  name: 'Ugly',
  popularity: -11
});

var order = new Order({
  status: 'test',
  orderItems: []
});

var user1 = new User({
  provider: 'local',
  name: 'a',
  email: 'a@a.com',
  password: 'aaa',
  cart: order._id

});

Order.find({}).remove(function () {
  order.save();

});



var item1 = new Item({
  title: 'Sweet Card',
  image: 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
  defaultMessage: 'Happy Celebratory Day, Nimit!',
  description: 'This card is for Sweet category of things',
  reviews: [],
  buyCount: 0,
  purchaseHistory: [],
  categories: [good._id, bad._id],
  stars: 5
});

var item2 = new Item({
  title: 'Sour Card',
  image: 'http://cdn.charlottesgotalot.com/sites/charlottesgotalot.com/master/files/styles/image_650x345/public/Attractions_Intimidator_970x550.jpg',
  defaultMessage: 'Happy Celebratory Day, Nimit!',
  description: 'This card is for Sour category of things',
  reviews: [],
  buyCount: 0,
  purchaseHistory: [],
  categories: [ugly._id],
  stars: 5
});

var item3 = new Item({
  title: 'Spicy Card',
  image: 'http://cdn-media-2.lifehack.org/wp-content/files/2013/12/30-Fun-Things-to-Do-at-Home.jpg',
  defaultMessage: 'Happy Celebratory Day, Nimit!',
  description: 'This card is for Spicy category of things',
  reviews: [],
  buyCount: 0,
  purchaseHistory: [],
  categories: [good._id, bad._id, ugly._id],
  stars: 5
});

var lineItem1 = new LineItem({
  item: item1._id,
  sender: user1._id,
  receiverName: "Ben",
  receiverEmail: "conantbenjamin@gmail.com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  quantity: 1
});

var lineItem2 = new LineItem({
  item: item2._id,
  sender: user1._id,
  receiverName: "Tom",
  receiverEmail: "tom@tom.com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  quantity: 1
});

var lineItem3 = new LineItem({
  item: item3._id,
  sender: user1._id,
  receiverName: "whaaaaaa",
  receiverEmail: "whaaa@com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  quantity: 1
});

Item.find({}).remove(function () {

  item1.save();
  item2.save();
  item3.save();
});



LineItem.find({}).remove(function() {
  lineItem1.save();
  lineItem2.save();
  lineItem3.save();
});
// Order.find({}).remove();

Category.find({}).remove(function () {
  good.save();
  bad.save();
  ugly.save();
});


Item.find({}).remove(function () {
  Item.create({
    title: 'Sweet Card',
    image: 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Sweet category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [good._id, bad._id],
    stars: 5
  }, {
    title: 'Sour Card',
    image: 'http://alphamom.com/wp-content/uploads/2011/04/fun_things_april-e1302009947363.jpg',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Sour category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [ugly._id],
    stars: 5
  }, {
    title: 'Spicy Card',
    image: 'http://www.romanceways.com/files/2012/06/Fun-Things-To-Do-As-A-Couple.jpg',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Spicy category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [good._id, bad._id, ugly._id],
    stars: 5
  }, {
    title: 'Savory Card',
    image: 'http://www.breakmyface.com/images/funthings.jpg',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Savory category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [good._id],
    stars: 5
  }, {
    title: 'Salty Card',
    image: 'http://www.bopandtigerbeat.com/wp-content/uploads/2013/08/00summertreatpoll.jpg',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Salty category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [good._id, bad._id],
    stars: 5
  }, {
    title: 'Umami Card',
    image: 'http://img.allw.mn/content/www/2010/02/10-fun-things-to-do-with-kids-in-winter/Make-hot-chocolate_fun-things-do-kids-winter.jpg',
    defaultMessage: 'Happy Celebratory Day, Nimit!',
    description: 'This card is for Umami category of things',
    reviews: [],
    buyCount: 0,
    purchaseHistory: [],
    categories: [good._id, ugly._id],
    stars: 5
  });
});



//
//
// var UserSchema = new Schema({
//   name: String,
//   email: { type: String, lowercase: true },
//   cart: [Order],
//   pastOrders: [Order],
//   purchasedItems: [Item],
//   contacts: [String],
//   reviews: [Review],
// order.save(function(err, order) {
//   User.findOne({name: 'a'});
// });


User.find({}).remove(function () {
  user1.save();

  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function () {

    console.log('finished populating users');
  });
});