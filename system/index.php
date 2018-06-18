<?php
header('Access-Control-Allow-Origin: *'); 
include('db.php');

if(isset($_GET['getUser'])){
	$api = new Api();
	$data = $api->getAllUser();
	echo json_encode($data);
}
if(isset($_GET['getBooking'])){
	$user = $_GET['getBooking'];
	$api = new Api();
	$book = $api->getBookingByUser($user);
	echo json_encode($book);
}


class Api {
    function __construct() {
        
    }
    function getAllUser() {
    
        $dataResult = array();
		$sql = "SELECT * FROM User";
        $result = mysql_query($sql) or die("mysql error manifest" . mysql_error());
		 while ($row = mysql_fetch_row($result,MYSQL_ASSOC)) {
			$dataResult[] = $row;
         }
      
  
        return $dataResult;
    }
	function getBookingByUser($id) {
    
        $dataResult = array();
		
		$sql = "SELECT `ID`, `location`, `cv_number`, `account_name`, `book_a`, `book_k`, `book_foc`, `book_inf`, `book_tg`, `book_e`, `book_arrival`, `book_time`, `actual_a`, `actual_k`, `actual_foc`, `actual_inf`, `actual_tg`, `actual_e`, `actual_arrival`, `actual_time`, `resort_hotel`, `unit`, `unit_atd`, `driver`, `coordinator`, `sales_handle`, `agency`, `remarks`, `user` FROM book WHERE user= $id and status != 1";
        $result = mysql_query($sql) or die("mysql error manifest" . mysql_error());
		 while ($row = mysql_fetch_row($result,MYSQL_ASSOC)) {
			$dataResult[] = $row;
         }
      
  
        return $dataResult;
    }

    
}
?>