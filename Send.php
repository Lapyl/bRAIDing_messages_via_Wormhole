<?php

if(isset($_POST['sent'])) {

    $msgtosend = $_POST['msgtosend'];
    $codetosplit = $_POST['codetosplit'];
    echo($msgtosend);
    // exec("node src/Send.js '" & $msgtosend & "' '" & $codetosplit & "' &", $output);
    // exec("node src/Send.js 'SardhavShertha' 'Ahd' &", $output);
    exec("node src/Send.js &", $output);

    $newt = "<html><head></head><body><h1>bRAIDing messages via Wormhole</h1><h2>Deploy</h2><h3>Message to Send</h3>".$msgtosend."<h3>Code to Split</h3>".$codetosplit."<h3>Sending of Message</h3>Failed</body></html>";
    
     $file = fopen("/Users/a/Documents/Wormhole/Work/bRAID-r3/Send.html", "w");

    foreach ($output as $eachput) {
        echo($eachput);
        $newt = "<html><head></head><body>".$eachout."</body></html>";
    }

    fwrite($file, $newt);
    fclose($file);
    header('Location: Send.html');

    exit;
}

?>