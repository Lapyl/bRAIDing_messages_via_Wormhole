<?php

if(isset($_POST['deployed'])) {
    
    $sender = $_POST['sender'];
    echo($sender);

    if ($sender=="Avalanche") {exec("node src/Deploy.js -a &", $output);}
    else if ($sender=="Celo") {exec("node src/Deploy.js -c &", $output);}
    else if ($sender=="Base") {exec("node src/Deploy.js -b &", $output);}
    else {echo("xxxxxxxxxxxxxx");}

    $newt = "<html><head></head><body><h1>bRAIDing messages via Wormhole</h1><h2>Deploy</h2><h3>Sender</h3>".$sender."<h3>Deployment</h3>Failed</body></html>";

    $file = fopen("/Users/a/Documents/Wormhole/Work/bRAID-r3/Deploy.html", "w");

    foreach ($output as $eachput) {
        echo($eachput);
        $newt = "<html><head></head><body>".$eachout."</body></html>";
    }

    fwrite($file, $newt);
    fclose($file);
    header('Location: Deploy.html');

    exit;
}

?>