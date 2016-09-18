angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaVibration, $cordovaNativeAudio, $timeout, $cordovaFile) {

    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        //En vez de crearlo, lo sobreescribo para que cada vez que inicie el juego no me esté trayendo las pruebas anteriores. Es a los fines prácticos. Después tendría que cambiarlo.
        $cordovaFile.writeFile(cordova.file.dataDirectory, "melodias.txt", "", true)
        .then(function (success) {
            console.log(success);
        }, function (error) {
            console.log(error);
            alert("Error: writeFile");
        });
    }
    
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
        angular.forEach($scope.melodia, function(value, key) {
            $timeout(function(){
                try{
                    window.plugins.NativeAudio.play(value);
                }
                catch (err){
                    console.log(err, value);
                }
            },2000);
        });  
    }
    
    $scope.Borrar = function(){
        $scope.melodia = [];
        i=0;
        $scope.grabar = true;
        $scope.parar = false;
        $scope.reproducir = false;
    }
    
    $scope.Guardar = function(){
        var nombre = prompt("Ingrese un título para su melodía");
        //var nombre = $scope.showPopup();
        //alert(nombre);
        
        //EVALUAR QUE NO EXISTA
        
        //GUARDAR EN ARCHIVO        
        var melodiaAGuardar = ', '+nombre+': "'+$scope.melodia.toString()+'"';
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "melodias.txt", melodiaAGuardar)
          .then(function (success) {
            // success
          }, function (error) {
            // error
            alert(error);
            alert("WriteFileEx Mal");
        });
        
    };
    
    $scope.LeerTxt = function(){
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            // success
             alert(success);
        }, function (error) {
            // error
            alert(error);
            alert("Read Mal");
        });
    };

    
    
    $scope.showPopup = function() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="nombre">',
            title: 'Guardar melodía',
            subTitle: 'Ingresá el título de la melodía',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.nombre) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    return $scope.nombre;
                  }
                }
              }
            ]
        });
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
})


.controller('LoginCtrl', function($scope, $state) {
    $scope.Ir = function(){
         $state.go('tab.dash');  
    }
});
