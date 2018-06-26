<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ini_set('display_errors', 1);
error_reporting(E_ALL);
include('db.php');

if (isset($_GET['getUser'])) {
    $api = new Api();
    $data = $api->getAllUser();
    echo json_encode($data);
}
if (isset($_GET['getBooking'])) {
    $user = $_GET['getBooking'];
    $api = new Api();
    $book = $api->getBookingByUser($user);
    echo json_encode($book);
}

if (isset($_GET['getCode'])) {
    $user = $_GET['getCode'];
    $api = new Api();
    $code = $api->getAllCode($user);
    echo json_encode($code);
}
if (isset($_GET['uploadBook'])) {
    $data = $_GET;
    $api = new Api();
    $code = $api->uploadBook($data);
    echo json_encode($data, true);
}

class Api {

    function __construct() {

    }

    function getAllUser() {
        global $db;
        $dataResult = array();
        $sql = "SELECT * FROM User";
        $result = mysqli_query($db, $sql);
        while ($row = mysqli_fetch_row($result)) {
            $dataResult[] = $row;
        }


        return $dataResult;
    }

    function getAllCode() {
        global $db;
        $dataResult = array();
        $sql = "SELECT * FROM auth_code";
        $result = mysqli_query($db, $sql);
        while ($row = mysqli_fetch_row($result)) {
            $dataResult[] = $row;
        }


        return $dataResult;
    }

    function getBookingByUser($id) {
        global $db;
        $dataResult = array();

        $sql = "SELECT `ID`, `location`, `cv_number`, `account_name`, `book_a`, `book_k`, `book_foc`, `book_inf`, `book_tg`, `book_e`, `book_arrival`, `book_time`, `actual_a`, `actual_k`, `actual_foc`, `actual_inf`, `actual_tg`, `actual_e`, `actual_arrival`, `actual_time`, `resort_hotel`, `unit`, `unit_atd`, `driver`, `coordinator`, `sales_handle`, `agency`, `remarks`, `user` FROM book WHERE user= $id and status != 1";
        $result = mysqli_query($db, $sql);
        while ($row = mysqli_fetch_row($result)) {
            $dataResult[] = $row;
        }


        return $dataResult;
    }

    function uploadBook($data) {
        global $db;

        $sqlupdate = "UPDATE book SET actual_a ='" . $data['actual_a'] . "', "
                . "actual_k ='" . $data['actual_k'] . "',"
                . "actual_foc ='" . $data['actual_foc'] . "',"
                . "actual_inf ='" . $data['actual_inf'] . "',"
                . "actual_tg ='" . $data['actual_tg'] . "',"
                . "actual_e ='" . $data['actual_e'] . "',"
                . "actual_arrival ='" . $data['actual_arrival'] . "',"
                . "actual_time ='" . $data['actual_time'] . "'"
                . "WHERE ID='" . $data['ID'] . "';";

        if (mysqli_query($db, $sqlupdate)) {
            return 1;
        } else {
            return 0;
        }
        return $data;
    }

}

?>