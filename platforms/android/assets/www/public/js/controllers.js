/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('AuthGoogleCtrl', function($scope, $http) {
    console.log('AuthGoogle');
    window.location.href = 'http://luzicity.com.br:3000/auth/authStrategy/google/login';
})

.controller('AuthGoogleCallbackCtrl', function($scope, $http, $timeout, $stateParams, ionicMaterialInk) {
    console.log('AuthGoogleCallback');

    $http.get('luzicity.com.br:3000/auth/authStrategy/google/profile').then(function(resp) {
        console.log('Success: ' + resp);
        /*
         * @todo carloss, parei aqui!
         */
    }, function(err) {
        console.error('ERR' + err);
    });
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {

   $scope.data = {};
    $scope.app_login_local = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        //aqui service.js que vai verificar o login via servico node.
    }
    
    $scope.app_login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        //aqui service.js que vai verificar o login via servico node.
    }
    
    
    
    
    
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();    
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('MapsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $cordovaGeolocation ) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    var options = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation.getCurrentPosition(options).then(function( position ) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
        //  ,  center: {lat: -34.397, lng: 150.644}
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("ControllerMapsCtrlError: Could not get location - Deu pau na funcao");
  });

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();



})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})


.controller('FeedsCtrl', function($http, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, FeedsService ) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    //Feeds Begin

    $http.defaults.headers.put = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

    $scope.items = [];
    $scope.newItems = [];

    FeedsService.GetFeed().then(function(items){
        $scope.items = items;
    });

    $scope.doRefresh = function() {
        if($scope.newItems.length > 0){
            $scope.items = $scope.newItems.concat($scope.items);
                
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            
            $scope.newItems = [];
        } else {
            FeedsService.GetNewUsers().then(function(items){
                $scope.items = items.concat($scope.items);
                
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };

    $scope.loadMore = function(){
    FeedsService.GetOldUsers().then(function(items) {
      $scope.items = $scope.items.concat(items);
      
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    };

    var CheckNewItems = function(){
        $timeout(function(){
            FeedsService.GetNewUsers().then(function(items){
                $scope.newItems = items.concat($scope.newItems);
            
                CheckNewItems();
            });
        },10000);
    }

    CheckNewItems();

    //Feeds End

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });



})



;
