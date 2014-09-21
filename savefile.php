<?php
  $log_file_name = 'output/' . mktime() . '.txt'; // Change to the log file name
  $stamp = $_POST['stamp'];
  $message = $_POST['message']; // incoming message
  
  $log_file_name = 'output/' . $stamp . '_' . mktime() . '.txt'; // Change to the log file name
  file_put_contents($log_file_name, $message);
  ?>