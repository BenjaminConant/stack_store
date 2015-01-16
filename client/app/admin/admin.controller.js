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


    // get all data used in view
    $scope.getData = function() {
      $http.get("/api/categorys").success(function(cat) {
        $http.get("/api/items").success(function(items) {
          $scope.items = items;
          $scope.cat = cat;
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
      $scope.items.push({
        title: "TEST",
        image: "asdada",
          description: "adasasd",
          defaultMessage: "asdad",
          categories: "bad"

      });

      console.log($scope.items);
      // var newItem = {
      //   title: $scope.title,
      //   image: $scope.image,
      //   description: $scope.description,
      //   defaultMessage: $scope.message,
      //   categories: $scope.categories
      // };
      //
      // console.log($scope.items);
      //
      // if ($scope.categories.length > 0) {
      //   console.log("before post", $scope.items);
      //   $http.post('api/items', newItem)
      //     .success(function(item) {
      //       // if (err) {
      //       //   console.log(err);
      //       // }
      //       console.log(item);
      //       $scope.items.push(item);
      //       $scope.title = "";
      //       $scope.image = "";
      //       $scope.description = "";
      //       $scope.message = "";
      //
      //       console.log("after post", $scope.items);
      //       // alert("Successfully added to database!")
      //     })
      // } else {
      //   // alert("must have at least one cat")
      // }
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
      $scope.cat.push(newCat);

      $http.post('/api/categorys/', {
        name: $scope.newCatName,
        popularity: $scope.newCatPop
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

        console.log("this is item being sent",item);
        // $scope.getItems();

      });
    }

    $scope.deleteCat = function(item, catId) {
      var itemCatArray = []; // This has all the IDs of the categories in the item
      item.categories.forEach(function(category) {
        itemCatArray.push(category._id);
      })
      var index = itemCatArray.indexOf(catId); //this is the index of what we want to remove
      itemCatArray.splice(index, 1);
      item.categories = itemCatArray;
      $scope.updateItemDetail(item);
      // $scope.getItems();
    }
    ////////////////////////////////////////////////////////////////////////////////

  });








  // $scope.getCategories = function() {
  //   $http.get("/api/categorys").success(function(cat) {
  //     $scope.cat = cat;
  //   })
  // }
  // $scope.getCategories();
  //
  // $scope.getItems = function() {
  //   $http.get("/api/items").success(function(items) {
  //     $scope.items = items;
  //   })
  // }
  // $scope.getItems();

  // Use the User $resource to fetch all users

  // var CategorySchema = new Schema({
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   popularity: Number
  // });
