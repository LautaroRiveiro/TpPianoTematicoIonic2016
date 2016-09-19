angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, $state, $cordovaVibration, $cordovaNativeAudio, $timeout, $cordovaFile) {
    console.log($stateParams);
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        //En vez de crearlo, lo sobreescribo para que cada vez que inicie el juego no me esté trayendo las pruebas anteriores. Es a los fines prácticos. Después tendría que cambiarlo.
        $cordovaFile.writeFile(cordova.file.dataDirectory, "melodias.txt", '{autor:"Lautaro", nombre:"ejemplo", melodia:[]}', true)
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
        $scope.reproducir = false;
        $scope.melodia = [];
        i=0;
    }
    
    $scope.Parar = function(){
        $scope.parar = false;
        $scope.reproducir = true;
        $scope.borraryguardar = true;
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
        $scope.borraryguardar = false;
    }
    
    $scope.Guardar = function(){
        var nombre = prompt("Ingrese un título para su melodía");
        //var nombre = $scope.showPopup();
        //alert(nombre);
        
        //EVALUAR QUE NO EXISTA

        //GUARDAR EN ARCHIVO
        var melodiastring = '"' + $scope.melodia.join('","') + '"';
        var melodiaAGuardar = ',{autor:"'+nombre+'", nombre:"'+nombre+'", melodia:['+melodiastring+']}';
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "melodias.txt", melodiaAGuardar)
          .then(function (success) {
            // success
          }, function (error) {
            // error
            alert(error);
            alert("WriteFileEx Mal");
        });

        //Inhabilito GUARDAR y BORRAR, y habilito GRABAR
        $scope.grabar = true;
        $scope.borraryguardar = false;

        
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

.controller('MelodiasCtrl', function($scope, $cordovaFile) {

    //CREO, que acá leo el .txt la primera vez que entro.
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            $scope.melodias = (new Function("return [" + success+ "];")());
        }, function (error) {
            alert("Error: "+error);
            alert("Read Mal");
        });
    }

    //CREO, que acá leo el .txt cada vez que vuelvo a entrar.
    $scope.$on('$ionicView.enter', function(e) {
        console.log(e); //Qué contendrá "e"?
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            $scope.melodias = (new Function("return [" + success+ "];")());
        }, function (error) {
            alert("Error: "+error);
            alert("Read Mal");
        });
    });

    $scope.Reproducir = function(melodia){
        angular.forEach(melodia, function(value, key) {
            try{
                window.plugins.NativeAudio.play(value);
            }
            catch (err){
                console.log(err, value);
            }
        });
    };
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('LoginCtrl', function($scope, $state) {
    $scope.usuario = {};
    $scope.usuario.nombre = "";
   
    $scope.$watch('usuario.nombre', function(newVal, oldVal){
        console.log('changed');
    });
    
    
    
    
    $scope.Ingresar = function(){
        console.log($scope.usuario.nombre);
        $state.go('tab.dash', {usuario: $scope.usuario});
    }
});
