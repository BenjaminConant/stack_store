/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
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

Category.find({}).remove();

good.save();
bad.save();
ugly.save();

Item.find({}).remove(function() {
  Item.create({
    title : 'Sweet Card',
    image : '',
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
    image : '',
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
    image : '',
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
    image : '',
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
    image : '',
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
    image : '',
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

User.find({}).remove(function() {
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