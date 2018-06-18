angular.module('app.services', [])
        .factory('DBA', function ($cordovaSQLite, $q, $ionicPlatform) {
            var self = this;

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
        factory('Users', function ($cordovaSQLite, DBA, $filter, $http) {
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

            self.add = function (data) {
           
                
                
                console.log(data);
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

                            console.log(result);
                            var count = result.rows.length;

                            if (count != 0) {
                                return  result.rows[0];
                            } else {

                                return false;
                            }
                        });
            }



            return self;
        })
        .factory('Book', function (DBA, $http, $rootScope, $localStorage, $ionicLoading) {
            var self = this;
            var userId = $localStorage.userData.ID;
        
            self.updateSync = function () {

               var userServer = $localStorage.userData.serverUrl;
           console.log($localStorage.userData);
                $http.get('//'+userServer+'/?getBooking=' + userId).success(function (data) {

                    $rootScope.book = data;
                    self.removeALL();
                    angular.forEach(data, function (value, key) {
                        //console.log(value);
                        self.add(value)
                    })

                    return true;

                }).error(function (error) {
                    return false;

                });
                return true;

            }
            self.getAll = function () {
                var userId = $localStorage.userData.ID;
                var param = [userId];
                var items = [];
                return DBA.query("SELECT * FROM book WHERE user = " + userId + "")
                        .then(function (result) {
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
                var parameters = [data.actual_a, data.actual_k, data.actual_foc, data.actual_inf, data.actual_tg, data.actual_e, data.actual_arrival, data.actual_time, data.ID];
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


            return self;
        })