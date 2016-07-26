angular.module('NightOut', ['ngRoute','ngMap'])

angular.module('NightOut')
  .config(function($routeProvider){
    $routeProvider.when("/", {templateUrl: "/templates/home.html"});
    $routeProvider.when("/singles", {
      templateUrl: "/templates/singles.html",
      controller: "singlesCtrl as sCtrl"
    });
    $routeProvider.when("/couples", {
      templateUrl: "/templates/couples.html",
      controller: "couplesCtrl"
    })
  })

angular.module("NightOut")
  .controller('singlesCtrl', singlesCtrl)

  singlesCtrl.$inject = ['NgMap','$scope']

  function singlesCtrl(NgMap, $scope){
    console.log('This is from the singlesCtrl')
    var sCtrl = this
    navigator.geolocation.getCurrentPosition(function(position){
      sCtrl.coords = {lat: position.coords.latitude, lng: position.coords.longitude}
      console.log(sCtrl.coords)
    })

    sCtrl.placeTypes = ['restaurant', 'bar', 'night_club']

    sCtrl.placeTypes.forEach(function(placetype){
      NgMap.getMap().then(function(map){
        sCtrl.request = {
          location: sCtrl.coords,
          radius: 8048,
          types: [placetype]
        }
        console.log(sCtrl.request)
        sCtrl.service = new google.maps.places.PlacesService(map)
        sCtrl.service.nearbySearch(sCtrl.request, sCtrl.callback)
        console.log(sCtrl.service)
      })

      sCtrl.callback = function(results, status){
        console.log(results)
        if(status == google.maps.places.PlacesServiceStatus.OK){
            sCtrl.createmarker(results[Math.floor(Math.random() * results.length)])
        }
      }
        sCtrl.site = []
        sCtrl.createmarker = function(place){
          console.log(place)
          $scope.$apply(function(){
            sCtrl.site.push({lat:place.geometry.location.lat(), lng:place.geometry.location.lng(),name:place.name})
          })
        console.log(sCtrl.site)
      }
    })
    window.sCtrl = sCtrl
  }



  angular.module("NightOut")
    .controller('couplesCtrl', couplesCtrl)

    function couplesCtrl(){
      console.log('This is from the couplesCtrl')
    }
