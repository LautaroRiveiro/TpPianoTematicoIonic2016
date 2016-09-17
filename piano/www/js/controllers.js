angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaVibration, $cordovaNativeAudio, $timeout) {
    
    var i;
    $scope.grabar = true;
    
    
    $scope.Tocar = function(sonido){
        try{
            window.plugins.NativeAudio.play(sonido);    
        }
        catch (err){
            console.log("No se puede ejecutar cordovaNativeAudio en la PC");
        }
        if($scope.parar == true && $scope.grabar == false){
            $scope.melodia[i] = sonido;
            i++;
        }
    }
    
    $scope.Grabar = function(){
        $scope.parar = true;
        $scope.grabar = false;
        $scope.melodia = [];
        i=0;
    }
    
    $scope.Parar = function(){
        $scope.parar = false;
        $scope.reproducir = true;
    }
    
    $scope.Reproducir = function(){
        $scope.melodia.forEach(function(item, index){
            try{
                window.plugins.NativeAudio.play(item);
                $timeout(2000);
            }
            catch (err){
            console.log(item);
            }
        });
    }
    
    $scope.Borrar = function(){
        alert("Borrar");
    }
    
    $scope.Guardar = function(){
        alert("Guardar");
    };
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
    
    

})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
