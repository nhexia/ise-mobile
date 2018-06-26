angular.module('app.controllers', [])


        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, Users, $localStorage) {

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
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };


        })

        .controller('ManifestCtrl', function ($ionicLoading, $scope, $location, $localStorage, $state, Book, $ionicPopup, Code) {
            $scope.results = [];

            $scope.getDataBooking = function () {

                Book.getAll().then(function (result) {



                    //console.log(result);

                    $scope.results = angular.fromJson(result);


                    $ionicLoading.hide();
                });
            }
            setTimeout(function () {
                $scope.getDataBooking();
            }, 2000);




            $scope.saveAll = function () {
                $ionicLoading.show({
                    template: 'Saving data...',

                });

                $scope.crt = 1;
                $scope.itemcount = Object.keys($scope.results).length;

                angular.forEach($scope.results, function (value, key) {
                    console.log($scope.itemcount + "== " + $scope.crt + "--- actual_a" + value.actual_a)

                    Book.update(value).then(function (result) {
                        if ($scope.itemcount == $scope.crt) {


                            $ionicLoading.hide();
                            //location.reload();

                        }
                        $scope.crt++;

                    });





                });


            }


            $scope.copyData = function (data) {
                $ionicLoading.show({
                    template: 'Loading...',
                });
                Book.get(data).then(function (result) {

                    var a = document.getElementById(data + "-a");
                    var k = document.getElementById(data + "-k");
                    var foc = document.getElementById(data + "-foc");
                    var inf = document.getElementById(data + "-inf");
                    var tg = document.getElementById(data + "-tg");
                    var e = document.getElementById(data + "-e");
                    var arrival = document.getElementById(data + "-arrival");
                    var time = document.getElementById(data + "-time");

                    var userId = $localStorage.userData.ID;
                    console.log((a.value != result.book_a && a.value != "") + "-" +
                            (k.value != result.book_k && k.value != "") + "-" +
                            (foc.value != result.book_foc && foc.value != "") + "-" +
                            (inf.value != result.book_inf && inf.value != "") + "-" +
                            (tg.value != result.book_tg && tg.value != "") + "-" +
                            (e.value != result.book_e && e.value != "") + "-" +
                            (arrival.value != result.book_arrival && arrival.value != "") + "-" +
                            (time.value != result.book_time && time.value != ""));
                    if (
                            (a.value != result.book_a && a.value != "") ||
                            (k.value != result.book_k && k.value != "") ||
                            (foc.value != result.book_foc && foc.value != "") ||
                            (inf.value != result.book_inf && inf.value != "") ||
                            (tg.value != result.book_tg && tg.value != "") ||
                            (e.value != result.book_e && e.value != "") ||
                            (arrival.value != result.book_arrival && arrival.value != "") ||
                            (time.value != result.book_time && time.value != "")

                            ) {
                        $ionicPopup.prompt({
                            title: 'Authorization ',
                            template: 'Enter your authorization code',
                            inputType: 'password',
                            inputPlaceholder: 'Your authorization code'
                        }).then(function (res) {
                            if (res) {
                                Code.checkCode(result.ID, res).then(function (result) {

                                    if (result != false) {

                                    } else {
                                        document.getElementById(data + "-a").value = result.book_a;
                                        document.getElementById(data + "-k").value = result.book_k;
                                        document.getElementById(data + "-foc").value = result.book_foc;
                                        document.getElementById(data + "-inf").value = result.book_inf;
                                        document.getElementById(data + "-tg").value = result.book_tg;
                                        document.getElementById(data + "-e").value = result.book_e;
                                        document.getElementById(data + "-arrival").value = result.book_arrival;
                                        document.getElementById(data + "-time").value = result.book_time;
                                        var confirmPopup = $ionicPopup.confirm({
                                            scope: $scope,
                                            title: 'Error',
                                            template: ' Invaluid code ',
                                            buttons: [

                                                {
                                                    text: '<b>Ok</b>',
                                                    type: 'button-assertive',
                                                    onTap: function (e) {

                                                    }
                                                }
                                            ]
                                        });
                                    }
                                });
                            } else {
                                document.getElementById(data + "-a").value = "";
                                document.getElementById(data + "-k").value = "";
                                document.getElementById(data + "-foc").value = "";
                                document.getElementById(data + "-inf").value = "";
                                document.getElementById(data + "-tg").value = "";
                                document.getElementById(data + "-e").value = "";
                                document.getElementById(data + "-arrival").value = "";
                                document.getElementById(data + "-time").value = "";
                            }

                        });
                    } else {
                        console.log("update array")
                        document.getElementById(data + "-a").value = result.book_a;
                        document.getElementById(data + "-k").value = result.book_k;
                        document.getElementById(data + "-foc").value = result.book_foc;
                        document.getElementById(data + "-inf").value = result.book_inf;
                        document.getElementById(data + "-tg").value = result.book_tg;
                        document.getElementById(data + "-e").value = result.book_e;
                        document.getElementById(data + "-arrival").value = result.book_arrival;
                        document.getElementById(data + "-time").value = result.book_time;

                    }

                    $ionicLoading.hide();
                })
            }



        })
        .controller('SettingCtrl', function ($scope, $location, $ionicLoading, $ionicPopup, $localStorage, $state, Book, Users, Code) {
            $scope.serverUrl = "";


            $scope.syncBook = function () {
                $ionicLoading.show({
                    template: 'Updating data...',
                });


                $scope.result = Book.updateSync();

                if ($scope.result) {

                    $ionicLoading.hide();
                    var confirmPopup = $ionicPopup.confirm({
                        scope: $scope,
                        title: 'Details',
                        template: ' Updating data sucessfuly!',
                        buttons: [

                            {
                                text: '<b>Done</b>',
                                type: 'button-balanced',
                                onTap: function (e) {

                                    location.reload();
                                }
                            }
                        ]
                    });

                } else {
                    var confirmPopup = $ionicPopup.confirm({
                        scope: $scope,
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

            $scope.syncUpBook = function () {
                /* $ionicLoading.show({
                 template: 'Uploading data...',
                 });*/
                $scope.syncData = [];
                Book.getAll().then(function (result) {

                    $scope.results = angular.fromJson(result);

                    angular.forEach($scope.results, function (value, key) {


                        $scope.entry = {
                            ID: value.ID,
                            actual_a: value.actual_a,
                            actual_k: value.actual_k,
                            actual_foc: value.actual_foc,
                            actual_inf: value.actual_inf,
                            actual_tg: value.actual_tg,
                            actual_e: value.actual_e,
                            actual_arrival: value.actual_arrival,
                            actual_time: value.actual_time,

                        };


                        Book.syncUpBook($scope.entry).success(function (response) {
                            console.log(response);
                        }).error(function (error) {
                            console.log(error);
                        });

                    });

                    $ionicLoading.hide();
                });
            }
            $scope.logout = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Logout',
                    template: 'Are you sure you want to logout?',
                    cancelText: 'No',
                    okText: 'Yes'
                }).then(function (res) {
                    if (res) {
                        $localStorage.userData = null;
                        Book.removeALL();
                        Users.removeALL();
                        Code.removeALL();
                        $state.go('login');
                    }
                });


            }
        })
        .controller('LoginCtrl', function ($scope, Users, $location, $http, $localStorage, $ionicLoading, DBA, Code) {
            $scope.loginData = {username: 'admin', password: '123456', serverUrl: "test.islandstarexpress.net/isemobile"};



            if ($localStorage.userData) {
                $location.path('/app/manifest');
            }


            $scope.error = {};


            $scope.loginMe = function () {
                $ionicLoading.show({
                    template: 'Loading...',

                }).then(function () {
                    console.log("Checking user data...");
                });


                $http.get('http://' + $scope.loginData.serverUrl + '/?getUser=1').success(function (data, status) {
                    $scope.users = data;

                    angular.forEach($scope.users, function (value, key) {




                        Users.removeALL().then(function (result) {

                            Users.add(value).then(function (result) {


                                $ionicLoading.hide();
                            });


                        });


                    })

                }).error(function (error) {
                    console.log(error);
                    $ionicLoading.hide()
                });
                $http.get('http://' + $scope.loginData.serverUrl + '/?getCode=1').success(function (data, status) {
                    $scope.users = data;

                    angular.forEach($scope.users, function (value, key) {
                        Code.removeALL().then(function (result) {
                            Code.add(value).then(function (result) {
                                console.log("insert code");
                                console.log(result);
                                $ionicLoading.hide();
                            });
                        });
                    })

                }).error(function (error) {
                    console.log(error);
                    $ionicLoading.hide()
                });


                var parameters = [$scope.loginData.username, $scope.loginData.password];

                Users.login($scope.loginData).then(function (result) {
                    console.log("result : login");
                    console.log(result);

                    if (result != false) {
                        $scope.error[0] = "";
                        $scope.error[1] = "";
                        $localStorage.serverUrl = $scope.loginData['serverUrl'];
                        $localStorage.ID = result[0];


                        $localStorage.userData = result;

                        $location.path('/app/manifest');
                    } else {

                        $scope.error[1] = "Invalid Username or Password";
                    }

                });
            }
        });

