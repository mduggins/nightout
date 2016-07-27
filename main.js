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
      controller: "couplesCtrl as cCtrl"
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
        sCtrl.service.nearbySearch(sCtrl.request, sCtrl.callback.bind(null,placetype))
        console.log(sCtrl.service)
      })

      sCtrl.callback = function(placetype, results, status){
        console.log(results)
        if(status == google.maps.places.PlacesServiceStatus.OK){
            sCtrl.createmarker(results[Math.floor(Math.random() * results.length)], placetype)
        }
      }
      sCtrl.site = []
      sCtrl.createmarker = function(place, placetype){
        console.log(place)
        $scope.$apply(function(){
          sCtrl.site.push({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.name,
            vicinity: place.vicinity,
            type: placetype
          })
        })
      console.log(sCtrl.site)
    }
  })
  sCtrl.typeFormat = function(place){
    var format = place.type.split('').splice(0,1)
    format[0] = format[0].toUpperCase()
    var result = format[0]
    console.log(place.type)
    console.log(format)
  }
  window.sCtrl = sCtrl
}

  angular.module("NightOut")
    .controller('couplesCtrl', couplesCtrl)

    couplesCtrl.$inject = ['NgMap','$scope']

    function couplesCtrl(NgMap, $scope){
      console.log('This is from the couplesCtrl')

      navigator.geolocation.getCurrentPosition(function(position){
        cCtrl.coords = {lat: position.coords.latitude, lng: position.coords.longitude}
        console.log(cCtrl.coords)
      })

      var cCtrl = this

      cCtrl.placeTypes = ['restaurant', 'movie_theater', 'park']

      cCtrl.placeTypes.forEach(function(placetype){
        NgMap.getMap().then(function(map){
          cCtrl.request = {
            location: cCtrl.coords,
            radius: 8048,
            types: [placetype]
          }
          console.log(cCtrl.request)
          cCtrl.service = new google.maps.places.PlacesService(map)
          cCtrl.service.nearbySearch(cCtrl.request, cCtrl.callback.bind(null,placetype))
          console.log(cCtrl.service)
        })

        cCtrl.callback = function(placetype, results, status){
          console.log(results)
          if(status == google.maps.places.PlacesServiceStatus.OK){
              cCtrl.createmarker(results[Math.floor(Math.random() * results.length)], placetype)
          }
        }
        
        cCtrl.site = []
        cCtrl.createmarker = function(place, placetype){
          console.log(place)
          $scope.$apply(function(){
            cCtrl.site.push({
              lat:place.geometry.location.lat(),
              lng:place.geometry.location.lng(),
              name:place.name,
              vicinity: place.vicinity,
              type: placetype
            })
          })
        console.log(cCtrl.site)
      }
    })
    window.cCtrl = cCtrl
  }
