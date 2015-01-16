'use strict';

angular.module('stackStoreApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'angularPayments',
  'xeditable',
  'flash'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
      window.Stripe.setPublishableKey('pk_test_SfHPLGrI9nwZrQOGPcFCWkzN');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, editableOptions) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
    editableOptions.theme = "bs3";
  });


// function toast(message, displayLength, className, completeCallback) {
//   className = className || "";
//   if ($('#toast-container').length == 0) {
//     // create notification container
//     var container = $('<div></div>')
//     .attr('id', 'toast-container');
//     $('body').append(container);
//   }
//
//   // Select and append toast
//   var container = $('#toast-container')
//   var newToast = createToast(message);
//   container.append(newToast);
//
//   newToast.css({"top" : parseFloat(newToast.css("top"))+35+"px",
//   "opacity": 0});
//   newToast.velocity({"top" : "0px",
//   opacity: 1},
// {duration: 300,
//   easing: 'easeOutCubic',
//   queue: false});
//
//   // Allows timer to be pause while being panned
//   var timeLeft = displayLength;
//   var counterInterval = setInterval (function(){
//     if (newToast.parent().length === 0)
//       window.clearInterval(counterInterval);
//
//       if (!newToast.hasClass("panning")) {
//         timeLeft -= 100;
//       }
//
//       if (timeLeft <= 0) {
//         newToast.velocity({"opacity": 0, marginTop: '-40px'},
//       { duration: 375,
//         easing: 'easeOutExpo',
//         queue: false,
//         complete: function(){
//           $(this).remove();
//           if(typeof(completeCallback) === "function")
//             completeCallback();
//           }
//         }
//       );
//       window.clearInterval(counterInterval);
//     }
//   }, 100);
//
//
//
//   function createToast(html) {
//     var toast = $("<div class='toast'></div>")
//     .addClass(className)
//     .html(html);
//     // Bind hammer
//     toast.hammer({prevent_default:false
//     }).bind('pan', function(e) {
//
//       var deltaX = e.gesture.deltaX;
//       var activationDistance = 80;
//
//       //                  change toast state
//       if (!toast.hasClass("panning"))
//         toast.addClass("panning");
//
//         var opacityPercent = 1-Math.abs(deltaX / activationDistance);
//         if (opacityPercent < 0)
//           opacityPercent = 0;
//
//           toast.velocity({left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});
//
//         }).bind('panend', function(e) {
//           var deltaX = e.gesture.deltaX;
//           var activationDistance = 80;
//
//           // If toast dragged past activation point
//           if (Math.abs(deltaX) > activationDistance) {
//             toast.velocity({marginTop: '-40px'},
//           { duration: 375,
//             easing: 'easeOutExpo',
//             queue: false,
//             complete: function(){toast.remove()}
//           })
//         } else {
//           toast.removeClass("panning");
//           // Put toast back into original position
//           toast.velocity({left: 0, opacity: 1},
//           { duration: 300,
//             easing: 'easeOutExpo',
//             queue: false
//           })
//         }
//       });
//       return toast;
//     }
//   }
