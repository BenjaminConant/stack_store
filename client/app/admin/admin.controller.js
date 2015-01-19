'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, flash) {

    $scope.items = [];
    $scope.itemCat = [];
    $scope.newCatName = "";
    $scope.newCatPop;
    filepicker.setKey("ACZTMJqmFR7K1eeuAVsurz");

    $scope.users = User.query();
    $scope.title = "";
    $scope.image = false;
    $scope.description = "";
    $scope.message = "";
    $scope.categories = [];
    $scope.availabilityFalse = false;
    $scope.availabilityTrue = true;
    $scope.itemAvailable = true;
    $scope.orders = [];
    $scope.filterStatus = "";

    // get all data used in view
    $scope.getData = function() {
      $http.get("/api/categorys").success(function(cat) {
        $http.get("/api/items").success(function(items) {
          $http.get("/api/orders").success(function(orders){
            $scope.orders = [];
            orders.forEach(function(order) {
              if (order.status !== "pending") {
                order.total = 0;
                order.orderItems.forEach(function(item) {
                  order.total += item.value;
                });
                $scope.orders.push(order);
              }
            });
            $scope.items = items;
            $scope.cat = cat;
            console.log(orders);
          })
        })
      })
    }
    $scope.getData();

    /////////////////////// Delete Users ///////////////
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    ////////////////////////////////////////////


    ///////// Adding an Item ////////////////
    $scope.submitItem = function() {
      var newItem = {
        title: $scope.title,
        image: $scope.image,
        description: $scope.description,
        defaultMessage: $scope.message,
        categories: $scope.categories,
        available: $scope.itemAvailable
      };

      if ($scope.categories.length > 0) {
        $http.post('api/items', newItem)
          .success(function(item) {
            // if (err) {
            //   console.log(err);
            // }
            console.log(item);
            $scope.items.push(item);
            $scope.title = "";
            $scope.image = "";
            $scope.description = "";
            $scope.message = "";
            $scope.itemAvailable = true;
            $scope.getData();

            console.log("after post", $scope.items);
            alert("Successfully added to database!")
          })
      } else {
        alert("must have at least one cat")
      }
    }


    $scope.pickFile = function (item) {
      if (item) {
        filepicker.pick(
          function(Blob){
            item.image = Blob.url;
            $scope.updateItemDetail(item);

          }
        );
      } else {
        filepicker.pick(
          function(Blob){
            $scope.image = Blob.url;
            $scope.$apply();
          }
        );
      }
    }
    ////////////////////////////////////////////////////////////////////



    ///////////////////////// Create a new Category //////////////////////
    $scope.addCategory = function() {
      var newCat = {
        name: $scope.newCatName,
        popularity: $scope.newCatPop
      }


      $http.post('/api/categorys/', {
        name: $scope.newCatName,
        popularity: $scope.newCatPop
      }).success(function(newCat) {
        $scope.cat.push(newCat);
        $scope.newCatName = "";
        $scope.newCatPop = "";
      })
    };


    $scope.toggleCat = function(cat) {
      console.log("this cat", cat);
      if ($scope.categories.indexOf(cat._id) === -1) {
        $scope.categories.push(cat._id)
      } else {
        var index = $scope.categories.indexOf(cat);
        $scope.categories.splice(index, 1)
      }
    };
    ///////////////////////////////////////////////////////////////////////


    ///////////////////// Edit Items ///////////////////////
    $scope.deleteItem = function(item) {
      $http.delete("/api/items/" + item._id);
      // $scope.getItems();
      $scope.getData();
    }



    $scope.updateItemDetail = function(item, category) {
      var itemCatArray = []; // This has all the IDs of the categories in the item
      item.categories.forEach(function(catObj) {
        itemCatArray.push(catObj._id);
      });
      item.categories = itemCatArray

      if (category) {
        category = JSON.parse(category.category)._id;
        if (item.categories.indexOf(category) === -1) {
          item.categories.push(category);
        }
      }
      console.log("this is the imte we send", item);
      $http.put("/api/items/" + item._id, item).success(function(item){

        console.log("this is item being received",item);
        $scope.getData();


      });
    }

    $scope.changeAvailability = function(item, bool) {
      var newBool = JSON.parse(bool.availability);
      item.available = newBool;
      $scope.updateItemDetail(item);

    }

    $scope.deleteCat = function(item, catId) {
      if (item.categories.length <= 1) {
        alert("Items must have at least one category!")
      } else {
        var index = 0;
        item.categories.forEach(function(category) {
          if (category._id === catId) {
            index = category._id;
          }
        })
        item.categories.splice(index, 1);
        $scope.updateItemDetail(item);
      }
    }
    ////////////////////////////////////////////////////////////////////////////////


    //////////////////////// Change Order Status //////////////////////////////////
    $scope.possibleStatus = ["created", "processing", "cancelled", "complete"];
    $scope.changeOrderStatus = function (order, orderStatus) {
      console.log(orderStatus.category);
      order.status = orderStatus.category;
      order.user = [order.user._id];
      var orderItemIds = [];
      order.orderItems.forEach(function(orderItem){
        orderItemIds.push(orderItem._id);
      }); 
      order.orderItems = orderItemIds;
      console.log("this is the order we we send", order)
      $http.put('api/orders/' + order._id, order).success(function(order){
        alert("This orders order status has been changed to " + order.status);
        $scope.getData();
      })
    }

  
    ////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////// make user admin //////////////////////////////////

    $scope.makeAdmin = function(user) {
      user.role = "admin";
      $http.put('api/users/' + user._id + '/makeadmin').success(function(user){
        alert(user.name + " " + "has been made into an admin")
        $scope.getData();
      })
    }
    /////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////// change a users password //////////////////////////
    $scope.changePassword = function(user, newPass) {
      $http.put('api/users/' + user._id + '/adminchangepassword', {newPassword: user.newPassword});
    }
  });
