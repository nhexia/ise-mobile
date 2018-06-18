angular.module('app.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,Users,$localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.name = $localStorage.userData.complete_name;
  console.log(name);
	
})

.controller('ManifestCtrl', function($ionicLoading,$scope,$location,$localStorage,$state,Book) {
	$scope.results = [];
	$ionicLoading.show({
      template: 'loading manifest...',
     
    });
    
	Book.getAll().then(function (result) {
						
			$scope.results = [];

			$scope.results  = angular.fromJson(result); 
		$ionicLoading.hide();
	});		
	
	
	
	var a = 1;
	$scope.saveAll = function(){
		
		angular.forEach($scope.results  , function (value, key) {
			//console.log(value)
                     Book.update(value).then(function(result){
						   console.log(result)
					   });   
				 
			if($scope.results.length == a){
				
				$state.go($state.current, {}, {reload: true})
			}
			a++;
			
	
		});
		
		
	}
	
	
	$scope.copyData = function(data){
		$ionicLoading.show({
				  template: 'Loading...',
			});
			Book.get(data).then(function(result){
				console.log(result);
				document.getElementById(data+"-a").value = result.book_a;
				document.getElementById(data+"-k").value = result.book_k;

				document.getElementById(data+"-foc").value = result.book_foc;
				document.getElementById(data+"-inf").value = result.book_inf;
				document.getElementById(data+"-tg").value = result.book_tg;
				document.getElementById(data+"-e").value = result.book_e;
				document.getElementById(data+"-arrival").value = result.book_arrival;
				document.getElementById(data+"-time").value = result.book_time;
				$ionicLoading.hide();
			})
		}
    
	

})
.controller('SettingCtrl', function($scope,$location,$ionicLoading,$ionicPopup,$localStorage,$state,Book) {
	$scope.serverUrl = "";
	
	if($localStorage.serverUrl == null){
	
	   
		$scope.$storage = "localhost";
		
	}else{
			$scope.$storage = $localStorage;
		
	}
	
	$scope.saveServerUrl = function(){
		
			delete $localStorage.serverUrl;
			 $localStorage.serverUrl = $scope.serverUrl;
		
		console.log("submitted : "+$scope.serverUrl);
		var confirmPopup = $ionicPopup.confirm({
				 scope:$scope,
				 title: 'Success',
				 template: 'Server URL saved',
				 buttons: [
			 
				   {
					 text: '<b>OK</b>',
					 type: 'button-balanced',
					
				   }
				   ]
			 });
			 
		
	}
	
	
	$scope.syncBook = function(){
			$ionicLoading.show({
				  template: 'Updating data...',
			});
			
			
		$scope.result = Book.updateSync();
		
		if($scope.result){
			$ionicLoading.hide();
			 var confirmPopup = $ionicPopup.confirm({
				 scope:$scope,
				 title: 'Details',
				 template: ' Updating data sucessfuly!',
				 buttons: [
			 
				   {
					 text: '<b>Done</b>',
					 type: 'button-balanced',
					
				   }
				   ]
			 });
			
		}else{
			var confirmPopup = $ionicPopup.confirm({
				 scope:$scope,
				 title: 'Error',
				 template: 'Cant connect to server.',
				 buttons: [
			 
				   {
					 text: '<b>Done</b>',
					 type: 'button-balanced',
					
				   }
				   ]
			 });
			$ionicLoading.hide();
		}
		
	
	}
	$scope.logout = function(){
		 var confirmPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you want to logout?',
        cancelText: 'No',
        okText: 'Yes'
		}).then(function(res) {
			if (res) {
				$localStorage.userData = null;
				  
				  $state.go('login');
			}
		});
		
	
	}
})
.controller('LoginCtrl', function($scope,Users, $location,$http,$localStorage,$ionicLoading,DBA) {
	$ionicLoading.show({
      template: 'Loading...',
     
    }).then(function(){
       console.log("Checking user data...");
    });
	
	$http.get('//localhost/?getUser=1').success(function (data, status) {
	   $scope.users = data;
		  angular.forEach($scope.users,  function (value, key) {


				Users.removeALL().then(function (result) {
					Users.add(value).then(function (result) {
						
						console.log(result)
						$ionicLoading.hide()
					});
                });
				
        
		})
		    
     }).error(function (error) {
        console.log(error);
		  $ionicLoading.hide()
    });
	
	if($localStorage.userData){
			$location.path('/app/manifest');
	}
	
	$scope.loginData = {username:'admin',password:'123456'};
	$scope.error = {};
	
	
	$scope.loginMe = function() {
		
	
		var parameters = [$scope.loginData.username,$scope.loginData.password];
	
		Users.login($scope.loginData).then(function (result) {
			//console.log(result);	
				if(result != false){
					$scope.error[0]="";
					$scope.error[1]="";
					
					console.log("result.ID="+result.complete_name)
				
					$localStorage.userData = result;
					if($localStorage.serverUrl == null){

						 $localStorage.serverUrl = "//localhost";
						
					}
					$location.path('/app/manifest');
				}else{
					$scope.error[0]="Login Failed";
					$scope.error[1]="Invalid Username or Password";
				}
	
		});
	}
});

