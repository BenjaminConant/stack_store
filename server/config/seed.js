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
  status: 'pending',
  orderItems: []
});

var user1 = new User({
  provider: 'local',
  name: 'a',
  email: 'a@a.com',
  password: 'aaa',
  cart: order._id

});

order.userId = user1._id;


var user2 = new User({
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  password: 'test'
});
var user3 = new User({
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin'
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

var item4 = new Item({
  title: 'Savory Card',
  image: 'http://www.breakmyface.com/images/funthings.jpg',
  defaultMessage: 'Happy Celebratory Day, Nimit!',
  description: 'This card is for Savory category of things',
  reviews: [],
  buyCount: 0,
  purchaseHistory: [],
  categories: [good._id],
  stars: 5
});

var item5 = new Item({
  title: 'Salty Card',
  image: 'http://www.bopandtigerbeat.com/wp-content/uploads/2013/08/00summertreatpoll.jpg',
  defaultMessage: 'Happy Celebratory Day, Nimit!',
  description: 'This card is for Salty category of things',
  reviews: [],
  buyCount: 0,
  purchaseHistory: [],
  categories: [good._id, bad._id],
  stars: 5
});

var item6 = new Item({
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

var lineItem4 = new LineItem({
  item: item4._id,
  sender: user2._id,
  receiverName: "Bob the Builder",
  receiverEmail: "bob@builder.com",
  message: "go build a thing",
  longMessage: "yes he can!",
  value: 2000,
  quantity: 1
});

var lineItem5 = new LineItem({
  item: item5._id,
  sender: user2._id,
  receiverName: "Spiderman",
  receiverEmail: "peter@parker.com",
  message: "spider man, spider man",
  longMessage: "does whatever a spider can",
  value: 2000,
  quantity: 1
});

var lineItem6 = new LineItem({
  item: item6._id,
  sender: user1._id,
  receiverName: 'Slim Shady',
  receiverEmail: 'therealslimshady@gmail.com',
  message: "he's slim shady",
  longMessage: "the real slim shady",
  value: 3000,
  quantity: 4
});

var lineItem7 = new LineItem({
  item: item1._id,
  sender: user1._id,
  receiverName: "Calamity Jane",
  receiverEmail: "calamity@jane.com",
  message: 'this is a stickup',
  longMessage: 'yes it is... running out of ideas',
  value: 5000,
  quantity: 2
})

var pastOrder1 = new Order({
  status: 'complete',
  orderItems: [lineItem4._id, lineItem5._id],
  userId: user2._id
});

var pastOrder2 = new Order({
  status: 'complete',
  orderItems: [lineItem6._id],
  userId: user1._id
});

var pastOrder3 = new Order({
  status: 'complete',
  orderItems: [lineItem7._id],
  userId: user1._id
})

Item.find({}).remove(function() {

  item1.save();
  item2.save();
  item3.save();
  item4.save();
  item5.save();
  item6.save();
});



LineItem.find({}).remove(function() {
  lineItem1.save();
  lineItem2.save();
  lineItem3.save();
});
// Order.find({}).remove();

Category.find({}).remove(function() {
  good.save();
  bad.save();
  ugly.save();
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

Order.find({}).remove(function() {
  order.save();
  pastOrder1.save();
  pastOrder2.save();
  pastOrder3.save();

});

User.find({}).remove(function() {
  user1.save();
  user2.save();
  user3.save();

});