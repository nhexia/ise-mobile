angular.module('app.services', [])
        .factory('DBA', function ($cordovaSQLite, $q, $ionicPlatform) {
            var self = this;
            if (window.cordova) {
                // App 

                // db = $cordovaSQLite.openDB({ name: "ise.db", iosDatabaseLocation:'default'});

            } else {
                // browser
                db = window.openDatabase("ise.db", '1', 'my', 1024 * 1024 * 100); // browser
            }
            // Handle query's and potential errors
            self.query = function (query, parameters) {
                parameters = parameters || [];
                var q = $q.defer();

                $ionicPlatform.ready(function () {
                    $cordovaSQLite.execute(db, query, parameters)
                            .then(function (result) {
                                q.resolve(result);
                            }, function (error) {
                                console.warn('I found an error');
                                console.warn(error);
                                q.reject(error);
                            });
                });
                return q.promise;
            }


            // Proces a result set
            self.getAll = function (result) {
                var output = [];

                for (var i = 0; i < result.rows.length; i++) {
                    output.push(result.rows.item(i));
                }
                return output;
            }

            // Proces a single result
            self.getById = function (result) {
                var output = null;
                output = angular.copy(result.rows.item(0));
                return output;
            }

            return self;
        }).
        factory('Users', function ($cordovaSQLite, DBA, $filter, $http, $localStorage) {
            var self = this;

            self.all = function () {
                return DBA.query("SELECT * FROM user")
                        .then(function (result) {
                            return DBA.getAll(result);
                        });
            }

            self.get = function (cargo_id) {
                var parameters = [cargo_id];
                return DBA.query("SELECT * FROM user WHERE ID = (?)", parameters)
                        .then(function (result) {
                            return DBA.getById(result);
                        });
            }
            self.getByUser = function (user) {
                var parameters = [user];
                return DBA.query("SELECT * FROM user WHERE username = (?)", parameters)
                        .then(function (result) {
                            return DBA.getById(result);
                        });
            }

            self.add = function (data) {




                var parameters = data;
                return DBA.query("INSERT INTO user (ID,username ,password ,complete_name ,status ,last_sync )\n\
                                                         VALUES (?,?,?,?,?,?)", parameters);
            }


            self.removeALL = function () {
                var parameters = [];
                return DBA.query("DELETE FROM user", parameters);
            }

            self.login = function (data) {

                var parameters = [data.username, data.password];

                return DBA.query("SELECT * FROM user WHERE username= (?) and password = (?)", parameters)
                        .then(function (result) {


                            var count = result.rows.length;

                            if (count != 0) {
                                return  DBA.getById(result);
                            } else {

                                return false;
                            }
                        });
            }



            return self;
        })
        .factory('Book', function (DBA, $http, $rootScope, Users, $localStorage, $ionicLoading, Code) {
            var self = this;
            var userId = $localStorage.userData.ID;

            self.all = function () {
                return DBA.query("SELECT * FROM book")
                        .then(function (result) {
                            return DBA.getAll(result);
                        });
            }
            self.updateSync = function () {

                var userServer = $localStorage.serverUrl;

                $http.get('http://' + userServer + '/?getBooking=' + userId).success(function (data) {

                    $rootScope.book = data;
                    self.removeALL();
                    angular.forEach(data, function (value, key) {
                        //console.log(value);
                        self.add(value)
                    })



                }).error(function (error) {


                });


                $http.get('http://' + userServer + '/?getCode=1').success(function (data, status) {


                    angular.forEach(data, function (value, key) {
                        Code.removeALL().then(function (result) {
                            Code.add(value).then(function (result) {

                            });
                        });
                    })

                })
                return true;

            }
            self.getAll = function () {
                var userId = $localStorage.userData.ID;
                var param = [userId];
                var items = [];

                return DBA.query("SELECT * FROM book WHERE user = " + userId + "")
                        .then(function (result) {
                            console.log("count = ")
                            console.log(result);
                            if (result.rows.length > 0) {
                                var itemsColl = [];
                                for (var i = 0; i < result.rows.length; i++) {
                                    itemsColl[i] = result.rows.item(i);

                                }
                                ;

                                items = JSON.stringify(itemsColl);

                                return items;
                            }
                        });
            }

            self.add = function (data) {

                var parameters = data;
                console.log(data);

                return DBA.query("INSERT INTO book (ID, location, cv_number, account_name, book_a, book_k, book_foc, book_inf, book_tg, book_e,\n\
                                                     book_arrival, book_time, actual_a, actual_k, actual_foc, actual_inf, actual_tg, actual_e, actual_arrival, actual_time,\n\
                                                     resort_hotel, unit, unit_atd, driver, coordinator, sales_handle, agency, remarks, user )\n\
                                                         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", parameters);
            }

            self.addLocal = function (data) {

                var parameters = data;
                console.log(data);

                return DBA.query("INSERT INTO book ( location, cv_number, account_name, book_a, book_k, book_foc, book_inf, book_tg, book_e,\n\
                                                     book_arrival, book_time, actual_a, actual_k, actual_foc, actual_inf, actual_tg, actual_e, actual_arrival, actual_time,\n\
                                                     resort_hotel, unit, unit_atd, driver, coordinator, sales_handle, agency, remarks, user )\n\
                                                         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", parameters);
            }
            self.removeALL = function () {
                var parameters = [];
                return DBA.query("DELETE FROM book", parameters);
            }

            self.get = function (id) {
                var parameters = [id];
                return DBA.query("SELECT * FROM book WHERE ID = (?)", parameters)
                        .then(function (result) {
                            return DBA.getById(result);
                        });
            }
            self.update = function (data) {
                console.log("actual");
                console.log(data);
                var parameters = [data.actual_a, data.actual_k, data.actual_foc, data.actual_inf, data.actual_tg, data.actual_e, data.actual_arrival, data.actual_time, data.ID];
                console.log("param")
                console.log(parameters)
                return DBA.query("UPDATE book \n\
				  SET actual_a = (?),\n\
				  actual_k = (?),\n\
				  actual_foc = (?),\n\
				  actual_inf = (?),\n\
				  actual_tg = (?),\n\
				  actual_e = (?),\n\
				  actual_arrival = (?),\n\
				  actual_time = (?)\n\
				 WHERE id = (?)", parameters);
            }
            self.syncUpBook = function (data) {
                var userServer = $localStorage.serverUrl;
                return $http({method: 'GET', url: 'http://' + userServer + '/?uploadBook=1', params: data});
            }

            return self;
        })
        .factory('Code', function (DBA, $http, $rootScope, Users, $localStorage, $ionicLoading) {
            var self = this;


            self.updateStatus = function (data) {
                var id = [data];
                console.log("UPDATE code SET status = 1 WHERE ID = ('"+data+"')")

                 DBA.query("UPDATE code SET status = 1 WHERE ID = (?)", id);
            }

            self.add = function (data) {

                var parameters = data;
                return DBA.query("INSERT INTO code  (ID ,userid, book_id,auth_code,status)\n\
                                                         VALUES (?,?,?,?,?)", parameters);
            }
            self.removeALL = function () {
                var parameters = [];
                return DBA.query("DELETE FROM code", parameters);
            }

            self.get = function (id, auth_code) {
                var parameters = [id, auth_code];
                return DBA.query("SELECT * FROM code WHERE book_id = (?) and auth_code=(?)", parameters)
                        .then(function (result) {
                            return DBA.getById(result);
                        });
            }
            self.checkCode = function (id, auth_code) {
                var parameters = [id, auth_code];
                console.log("code");
                console.log("SELECT * FROM code WHERE book_id = (" + id + ") and auth_code= (" + auth_code + ")");
                return DBA.query("SELECT * FROM code WHERE book_id = (?) and auth_code= (?)", parameters)
                        .then(function (result) {
                            if (result.rows.length > 0) {
                                return  DBA.getById(result);
                            } else {
                                return false;
                            }

                        });
            }



            return self;
        })