// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({
        name: 'ise.db',
        location: 'default',
    });
    var db_user_create = "CREATE TABLE IF NOT EXISTS user (ID interger primary key,username text,password text,complete_name text,status interger,last_sync text)";
    var db_user_book = "CREATE TABLE IF NOT EXISTS  book (ID text primary key ,location text ,cv_number text ,account_name text ,book_a text ,book_k text ,book_foc text ,book_inf text ,book_tg text ,book_e text ,book_arrival text ,book_time text ,actual_a text ,actual_k text ,actual_foc text ,actual_inf text ,actual_tg text ,actual_e text ,actual_arrival text ,actual_time text ,resort_hotel text ,unit text ,unit_atd text ,driver text ,coordinator text ,sales_handle text ,agency text ,remarks text ,user text,status interger )";
    var db_user_code = "CREATE TABLE IF NOT EXISTS  code (ID text primary key ,userid text, book_id,auth_code)";


    db.transaction(function (tx) {
        tx.executeSql(db_user_create, [], function (tx, rs) {
            console.log('table created');
        }, function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
        tx.executeSql(db_user_book, [], function (tx, rs) {
            console.log('table created 2');
        }, function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });
});


angular.module('starter', ['ionic', 'app.controllers', 'app.services', 'ngCordova', 'ngStorage'])

        .run(function ($ionicPlatform, $cordovaSQLite, $http, $window) {
            $ionicPlatform.ready(function ($cordovaSQLite, $http, $window) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                if (window.cordova) {
                    // App 

                    db = $cordovaSQLite.openDB({name: "ise.db", iosDatabaseLocation: 'default'});
                    console.log | ("ap");
                } else {
                    // browser
                    db = window.openDatabase("ise.db", '1', 'my', 1024 * 1024 * 100); // browser
                    console.log | ("browser");
                }

                var db_user_create = "CREATE TABLE IF NOT EXISTS user (ID interger primary key,username text,password text,complete_name text,status interger,last_sync text)";
                var db_user_book = "CREATE TABLE IF NOT EXISTS  book (ID text primary key ,location text ,cv_number text ,account_name text ,book_a text ,book_k text ,book_foc text ,book_inf text ,book_tg text ,book_e text ,book_arrival text ,book_time text ,actual_a text ,actual_k text ,actual_foc text ,actual_inf text ,actual_tg text ,actual_e text ,actual_arrival text ,actual_time text ,resort_hotel text ,unit text ,unit_atd text ,driver text ,coordinator text ,sales_handle text ,agency text ,remarks text ,user text,status interger )";
                var db_user_code = "CREATE TABLE IF NOT EXISTS  code (ID text primary key ,userid text, book_id,auth_code)";
                /*$cordovaSQLite.execute(db, db_user_create, []).then(function (res) {
                 console.log("database user created");
                 }, function (err) {
                 console.error(err);
                 });
                 $cordovaSQLite.execute(db, db_user_book, []).then(function (res) {
                 console.log("database book created");
                 }, function (err) {
                 console.error(err);
                 });*/

                db.transaction(function (tx) {
                    tx.executeSql(db_user_create, [], function (tx, rs) {
                        console.log('table created');
                    }, function (tx, error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    tx.executeSql(db_user_book, [], function (tx, rs) {
                        console.log('table created 2');
                    }, function (tx, error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    tx.executeSql(db_user_code, [], function (tx, rs) {
                        console.log('table created 3');
                    }, function (tx, error) {
                        console.log('SELECT error: ' + error.message);
                    });
                });






            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('login', {
                        url: '/login',

                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'

                    })

                    .state('app.setting', {
                        url: '/setting',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/setting.html',
                                controller: 'SettingCtrl'
                            }
                        }
                    })
                    .state('app.manifest', {
                        url: '/manifest',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/manifest.html',
                                controller: 'ManifestCtrl'
                            }
                        }
                    })

                    .state('app.single', {
                        url: '/playlists/:playlistId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlist.html',
                                controller: 'PlaylistCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/login');
        });
