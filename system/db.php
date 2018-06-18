<?php
$db = @mysql_connect('localhost', 'root', 'vertrigo');
if ($db) {
    @mysql_select_db('ise');

} else {
    echo 'Cannot Connect Database!!!!';
}
?>