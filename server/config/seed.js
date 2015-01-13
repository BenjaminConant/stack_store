/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
var LineItem = require('../api/lineItem/lineItem.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');

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

var user1 = new User ({
  provider: 'local',
  name: 'a',
  email: 'a@a.com',
  password: 'aaa'
});

var item1 = new Item ({
  title : 'Sweet Card',
  image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
  defaultMessage : 'Happy Celebratory Day, Nimit!',
  description : 'This card is for Sweet category of things',
  reviews : [],
  buyCount: 0,
  purchaseHistory : [],
  categories : [good, bad],
  themeURL : 'www.com',
  stars : 5
});

var item2 = new Item ({
  title : 'Sour Card',
  image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
  defaultMessage : 'Happy Celebratory Day, Nimit!',
  description : 'This card is for Sour category of things',
  reviews : [],
  buyCount: 0,
  purchaseHistory : [],
  categories : [ugly],
  themeURL : 'www.com',
  stars : 5
});

var item3 = new Item ({
  title : 'Spicy Card',
  image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
  defaultMessage : 'Happy Celebratory Day, Nimit!',
  description : 'This card is for Spicy category of things',
  reviews : [],
  buyCount: 0,
  purchaseHistory : [],
  categories : [good, bad, ugly],
  themeURL : 'www.com',
  stars : 5
});

var lineItem1 = new LineItem({
  item: [item1],
  sender: [user1],
  receiverName: "Ben",
  receiverEmail: "conantbenjamin@gmail.com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  themeURL: "http://jasontheodor.com/wp-content/uploads//2012/02/things.jpg",
  quantity: 1
});

var lineItem2 = new LineItem({
  item: [item2],
  sender: [user1],
  receiverName: "Tom",
  receiverEmail: "tom@tom.com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  themeURL: "http://www.kumah.org/uploaded_images/193_9331-730753.JPG",
  quantity: 1
});

var lineItem3 = new LineItem({
  item: [item3],
  sender: [user1],
  receiverName: "whaaaaaa",
  receiverEmail: "whaaa@com",
  message: "happy day",
  longMessage: "you are soooooo coool",
  value: 125,
  themeURL: "http://www.stuff4multiples.com/assets/images/Thing_3_birthday.jpg",
  quantity: 1
});

Item.find({}).remove();
item1.save();
item2.save();
item3.save();


LineItem.find({}).remove();
lineItem1.save();
lineItem2.save();
lineItem3.save();



Category.find({}).remove();
good.save();
bad.save();
ugly.save();


Item.find({}).remove(function() {
  Item.create({
    title : 'Sweet Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Sweet category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [good, bad],
    themeURL : 'www.com',
    stars : 5
      }, {
    title : 'Sour Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Sour category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [ugly],
    themeURL : 'www.com',
    stars : 5
  }, {
    title : 'Spicy Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Spicy category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [good, bad, ugly],
    themeURL : 'www.com',
    stars : 5
  },  {
    title : 'Savory Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Savory category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [good],
    themeURL : 'www.com',
    stars : 5
  },  {
    title : 'Salty Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Salty category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [good, bad],
    themeURL : 'www.com',
    stars : 5
  },{
    title : 'Umami Card',
    image : 'http://www.kumah.org/uploaded_images/193_9331-730753.JPG',
    defaultMessage : 'Happy Celebratory Day, Nimit!',
    description : 'This card is for Umami category of things',
    reviews : [],
    buyCount: 0,
    purchaseHistory : [],
    categories : [good, ugly],
    themeURL : 'www.com',
    stars : 5
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


User.find({}).remove(function() {
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
  }, function() {
      console.log('finished populating users');
    }
  );
});
