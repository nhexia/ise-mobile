angular.module('app.controllers', [])


        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, Users, $localStorage, $rootScope, Book, $ionicLoading, $ionicPopup, ionicTimePicker) {

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

            /* add modal*/

            $rootScope.entry = {
                location: '',
                cv_number: '',
                account_name: '',
                book_a: '',
                book_k: '',
                book_foc: '',
                book_inf: '',
                book_tg: '',
                book_e: '',
                book_arrival: '',
                book_time: '',
                actual_a: '',
                actual_k: '',
                actual_foc: '',
                actual_inf: '',
                actual_tg: '',
                actual_e: '',
                actual_arrival: '',
                actual_time: '',
                driver: '',
                coordinator: '',
                unit: '',
                resort_hotel: '',
                agency: '',
                remarks: '',

            };

            $ionicModal.fromTemplateUrl('templates/entry_modal.html', {
                scope: $scope,
                animation: 'slide-in-up',

            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.showEntry = function () {
                $scope.modal.show();

            }

            $scope.hideModal = function () {
                $scope.modal.hide();
            }
            $scope.saveBooking = function () {
                $ionicLoading.show({
                    template: 'Saving data...',
                });
                var userId = $localStorage.userData.ID;
                console.log($rootScope.userid);
                $scope.toAdd = [
                    $rootScope.entry.location,
                    $rootScope.entry.cv_number,
                    $rootScope.entry.account_name,
                    $rootScope.entry.book_a,
                    $rootScope.entry.book_k,
                    $rootScope.entry.book_foc,
                    $rootScope.entry.book_inf,
                    $rootScope.entry.book_tg,
                    $rootScope.entry.book_e,
                    $rootScope.entry.book_arrival,
                    $rootScope.entry.book_time,
                    $rootScope.entry.actual_a,
                    $rootScope.entry.actual_k,
                    $rootScope.entry.actual_foc,
                    $rootScope.entry.actual_inf,
                    $rootScope.entry.actual_tg,
                    $rootScope.entry.actual_e,
                    $rootScope.entry.actual_arrival,
                    $rootScope.entry.actual_time,
                    $rootScope.entry.resort_hotel,
                    $rootScope.entry.unit,
                    $rootScope.entry.unit_atd,
                    $rootScope.entry.driver,
                    $rootScope.entry.coordinator,
                    $rootScope.entry.sales_handle,
                    $rootScope.entry.agency,
                    $rootScope.entry.remarks,
                    userId,
                    1

                ];

                Book.addLocal($scope.toAdd).then(function (result) {
                    $ionicLoading.hide();

                    var confirmPopup = $ionicPopup.confirm({
                        scope: $scope,
                        title: 'Success',
                        template: 'Saving data success.',
                        buttons: [

                            {
                                text: '<b>Done</b>',
                                type: 'button-balanced',
                                onTap: function (e) {

                                    $scope.modal.hide();
                                }
                            }
                        ]
                    });
                });


            }
            $scope.openTimePickerModal = function () {

                var ipObj1 = {
                    callback: function (val) {
                        if (typeof (val) === 'undefined') {
                            console.log('Time not selected');
                        } else {
                            var selectedTime = new Date(val * 1000);

                            var min = selectedTime.getUTCMinutes();
                            var hour = selectedTime.getUTCHours();
                            var fhour = (hour >= 12 ? str_pad(hour - 12) + ":" + str_pad(min) + " PM" : str_pad(hour - 12) + ":" + str_pad(min) + "AM");
                            $rootScope.entry.actual_time = fhour;
                            console.log(fhour);
                            console.log($rootScope.entry);
                          
                        }
                    },
                    inputTime: 50400,
                    format: 12,
                    setLabel: 'Set'
                };
                ionicTimePicker.openTimePicker(ipObj1);
            };
            function str_pad(n) {
                return String("00" + n).slice(-2);
            }
        })

        .controller('ManifestCtrl', function ($ionicLoading, $scope, $location, $localStorage, $state, Book, $ionicPopup, Code, ionicTimePicker) {
            $scope.results = [];
            $ionicLoading.show({
                template: 'Loading data...',
            });








            $scope.search_cv = "";
            $scope.search_location = "";
            $scope.getDataBooking = function () {
                $scope.result = Book.updateSync();
                if ($scope.result)
                    Book.getAll().then(function (result) {

                        //console.log(result);

                        $scope.results = angular.fromJson(result);
                        $ionicLoading.hide();
                    });
            }
            setTimeout(function () {
                $scope.getDataBooking();
            }, 5000);
            $scope.saveAll = function () {
                $ionicLoading.show({
                    template: 'Saving data...',
                });
                $scope.crt = 1;
                $scope.itemcount = Object.keys($scope.results).length;
                angular.forEach($scope.results, function (value, key) {
                    console.log($scope.itemcount + "== " + $scope.crt + "--- actual_a" + value.actual_a)



                    Book.update(value).then(function (result) {
                        $scope.crt++;
                        console.log($scope.crt);
                        if ($scope.itemcount == $scope.crt) {


                            $ionicLoading.hide();
                            //location.reload();

                        }

                    });
                });
            }


            $scope.copyData = function (data) {
                console.log("datasasadasd : ");
                console.log(data)

                $scope.book_details = data;
                $ionicLoading.show({
                    template: 'Loading...',
                });

                Book.get(data.ID).then(function (result) {

                    var a = document.getElementById(data.ID + "-a");
                    var k = document.getElementById(data.ID + "-k");
                    var foc = document.getElementById(data.ID + "-foc");
                    var inf = document.getElementById(data.ID + "-inf");
                    var tg = document.getElementById(data.ID + "-tg");
                    var e = document.getElementById(data.ID + "-e");
                    var arrival = document.getElementById(data.ID + "-arrival");
                    var time = document.getElementById(data.ID + "-time");
                    var userId = $localStorage.userData.ID;


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
                                    console.log("code");


                                    if (result != false && result.status != 1) {
                                        $ionicLoading.hide()

                                        Code.updateStatus(result.ID);
                                        Book.update($scope.book_details).then(function () {

                                            var confirmPopup = $ionicPopup.confirm({
                                                scope: $scope,
                                                title: 'Notification',
                                                template: 'Save success',
                                                buttons: [

                                                    {
                                                        text: '<b>Ok</b>',
                                                        type: 'balance',
                                                        onTap: function (e) {

                                                        }
                                                    }
                                                ]
                                            });
                                        });





                                    } else {
                                        $scope.results[data.ID - 1].actual_a = result.book_a;
                                        $scope.results[data.ID - 1].actual_k = result.book_k;
                                        $scope.results[data.ID - 1 ].actual_foc = result.book_foc;
                                        $scope.results[data.ID - 1].actual_inf = result.book_inf;
                                        $scope.results[data.ID - 1].actual_tg = result.book_tg;
                                        $scope.results[data.ID - 1].actual_e = result.book_e;
                                        $scope.results[data.ID - 1].actual_arrival = result.book_arrival;
                                        $scope.results[data.ID - 1].actual_time = result.book_time;
                                        console.log($scope.results[data.ID - 1])
                                        var confirmPopup = $ionicPopup.confirm({
                                            scope: $scope,
                                            title: 'Error',
                                            template: 'Code invalid or already been used',
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
                                })

                            } else {

                                $scope.results[data.ID - 1].actual_a = "";
                                $scope.results[data.ID - 1].actual_k = "";
                                $scope.results[data.ID - 1 ].actual_foc = "";
                                $scope.results[data.ID - 1].actual_inf = "";
                                $scope.results[data.ID - 1].actual_tg = "";
                                $scope.results[data.ID - 1].actual_e = "";
                                $scope.results[data.ID - 1].actual_arrival = "";
                                $scope.results[data.ID - 1].actual_time = "";
                            }

                        });
                    } else {

                        console.log("update array")
                        $scope.results[data.ID - 1].actual_a = result.book_a;
                        $scope.results[data.ID - 1].actual_k = result.book_k;
                        $scope.results[data.ID - 1 ].actual_foc = result.book_foc;
                        $scope.results[data.ID - 1].actual_inf = result.book_inf;
                        $scope.results[data.ID - 1].actual_tg = result.book_tg;
                        $scope.results[data.ID - 1].actual_e = result.book_e;
                        $scope.results[data.ID - 1].actual_arrival = result.book_arrival;
                        $scope.results[data.ID - 1].actual_time = result.book_time;
                        // console.log($scope.results[data - 1]);
                        /* document.getElementById(data + "-a").value = result.book_a;
                         document.getElementById(data + "-k").value = result.book_k;
                         document.getElementById(data + "-foc").value = result.book_foc;
                         document.getElementById(data + "-inf").value = result.book_inf;
                         document.getElementById(data + "-tg").value = result.book_tg;
                         document.getElementById(data + "-e").value = result.book_e;
                         document.getElementById(data + "-arrival").value = result.book_arrival;
                         document.getElementById(data + "-time").value = result.book_time;*/

                    }

                    $ionicLoading.hide();
                })

            }
            function str_pad(n) {
                return String("00" + n).slice(-2);
            }
            $scope.openTimePicker = function (ID) {
                console.log(ID);
                var ipObj1 = {
                    callback: function (val) {
                        if (typeof (val) === 'undefined') {
                            console.log('Time not selected');
                        } else {
                            var selectedTime = new Date(val * 1000);

                            var min = selectedTime.getUTCMinutes();
                            var hour = selectedTime.getUTCHours();
                            var fhour = (hour >= 12 ? str_pad(hour - 12) + ":" + str_pad(min) + " PM" : str_pad(hour - 12) + ":" + str_pad(min) + "AM");
                            console.log(ID);

                            $scope.results[(ID == 0 ? ID : ID - 1)].actual_time = fhour;
                            console.log(fhour);
                        }
                    },
                    inputTime: 50400,
                    format: 12,
                    setLabel: 'Set'
                };
                ionicTimePicker.openTimePicker(ipObj1);
            };

        })
        .controller('SettingCtrl', function ($scope, $location, $ionicLoading, $ionicPopup, $localStorage, $state, Book, Users, Code, $http) {
            $scope.serverUrl = "";
            $scope.syncBook = function () {
                $ionicLoading.show({
                    template: 'Updating data...',
                });
                var userServer = $localStorage.serverUrl;
                $scope.result = Book.updateSync();
                var counter = 0;
                $scope.itemcount = 0;
                if ($scope.result) {

                    setTimeout(function () {
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
                    }, 5000)
                }





            }

            $scope.syncUpBook = function () {
                $scope.counter = 1;
                $scope.counter2 = 1;

                $scope.syncData = [];
                $scope.ctra = 0;


                $scope.itemcount1 = 0;
                $scope.itemcount2 = 0;
                Code.getUpdated().then(function (result) {
                    if (result != false) {
                        $scope.results = angular.fromJson(result);
                        $scope.itemcount1 = Object.keys($scope.results).length;
                        angular.forEach($scope.results, function (value, key) {


                            $scope.entry2 = {
                                ID: value.ID,
                                status: value.status

                            };
                            Code.syncUpCode($scope.entry2).success(function (response) {

                                if ($scope.counter == $scope.itemcount1) {

                                    Code.removeALLSave().then(function (result) {
                                        console.log("Code remove")
                                        console.log(result)
                                    });

                                }
                                $scope.counter++;
                            }).error(function (error) {

                            });

                        });

                    } else {

                    }

                });
                $ionicLoading.show({
                    template: 'Uploading data ...',
                });

                Book.getAllUpdated().then(function (result) {
                    if (result != false)
                    {
                        $scope.results = angular.fromJson(result);
                        $scope.itemcount2 = Object.keys($scope.results).length;
                        angular.forEach($scope.results, function (value, key) {


                            $scope.entry = {
                                ID: value.ID,
                                location: value.location,
                                actual_a: value.actual_a,
                                actual_k: value.actual_k,
                                actual_foc: value.actual_foc,
                                actual_inf: value.actual_inf,
                                actual_tg: value.actual_tg,
                                actual_e: value.actual_e,
                                actual_arrival: value.actual_arrival,
                                actual_time: value.actual_time,
                                resort_hotel: value.resort_hotel,
                                unit: value.unit,
                                unit_atd: value.unit_atd,
                                driver: value.driver,
                                coordinator: value.coordinator,
                                sales_handle: value.sales_handle,
                                agency: value.agency,
                                remarks: value.remarks,
                                status: value.status,
                                user: value.user,
                            };
                              console.log("before response")
                                console.log($scope.entry)

                            Book.syncUpBook($scope.entry).success(function (response) {


                              
                                if ($scope.counter2 == $scope.itemcount2) {


                                    $ionicLoading.hide();
                                    Book.removeALLSave().then(function (result) {
                                        console.log("booked remove")
                                        console.log(result)
                                    });
                                    /* Code.removeALL().then(function (result) {
                                     console.log("Code remove")
                                     console.log(result)
                                     });*/
                                    var confirmPopup = $ionicPopup.confirm({
                                        scope: $scope,
                                        title: 'Notification',
                                        template: 'Upload success',
                                        buttons: [

                                            {
                                                text: '<b>Ok</b>',
                                                type: 'balance',
                                                onTap: function (e) {
                                                    location.reload();
                                                }
                                            }
                                        ]
                                    });
                                }
                                $scope.counter2++;

                            }).error(function (error) {
                                console.log(error);
                                $scope.counter2++;
                                $ionicLoading.hide();
                            });

                        });
                    } else {
                        $ionicLoading.hide();
                    }


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
        .controller('LoginCtrl', function ($scope, Users, $location, $http, $localStorage, $ionicLoading, DBA, Code, $ionicPopup) {
            $scope.loginData = {username: 'admin', password: '123456', serverUrl: "test.islandstarexpress.net/isemobile"};
            /* if ($localStorage.userData) {
             $location.path('/app/manifest');
             }*/


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

                        var confirmPopup = $ionicPopup.confirm({
                            scope: $scope,
                            title: 'Error',
                            template: ' Cant Connect to the server',
                            buttons: [

                                {
                                    text: '<b>Ok</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {

                                    }
                                }
                            ]
                        });
                    });
                }).error(function (error) {
                    console.log(error);
                    $ionicLoading.hide()
                });
                setTimeout(function () {


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
                }, 2000);
            }
        });

