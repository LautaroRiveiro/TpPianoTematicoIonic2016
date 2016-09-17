angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
      
    if( window.plugins && window.plugins.NativeAudio ) {
      window.plugins.NativeAudio.preloadSimple( 'lobo', 'audio/lobo.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'manzana', 'audio/manzana.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'inmo', 'audio/inmo.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'muerte', 'audio/muerte.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'murcielago', 'audio/murcielago.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'pollo', 'audio/pollo.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'portal', 'audio/portal.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'puerta', 'audio/puerta.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'serpiente', 'audio/serpiente.mp3', function(msg){
      }, function(msg){
          console.log( 'error: ' + msg );
      });
    }
      
      
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/dash');

});
