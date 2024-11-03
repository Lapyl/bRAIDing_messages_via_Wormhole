<?php

if(isset($_POST['joined'])) {

    $msgpart1 = $_POST['msgpart1'];
    $msgpart2 = $_POST['msgpart2'];
    $codetojoin = $_POST['codetojoin'];

	if (strlen($msgpart1)<1) { $msgpart1="ateSaha"; }
	if (strlen($msgpart2)<1) { $msgpart2="ArAvArS"; }
	if (strlen($codetojoin)<1) { $codetojoin="Ahd"; }

    $msglen1=strlen($msgpart1);
    $msglen2=strlen($msgpart2);
    $codelen=strlen($codetojoin);

    echo('Message Part 1 : '.$msgpart1);
    echo('<br />Message Part 2 : '.$msgpart2);
	echo('<br />Code to Join : '.$codetojoin);
    $joinedmessage="";

	for ($i=0; $i<$msglen1; $i++) {
		$msgchr1=$msgpart1[$msglen1-$i-1];
		$msgchr2=$msgpart2[$msglen2-$i-1];
		// echo('<br /> '.$i.' '.$msgchr2.' '.$msgchr1.' ========');
		for ($j=1; $j<$codelen; $j++) {	
			if ($msgchr2==$codetojoin[$codelen-$j]) {				
				$msgchr2=$codetojoin[$codelen-$j-1];
				$j=99;}
			else if ($msgchr2==$codetojoin[$codelen-$j-1]) {				
				$msgchr2=$codetojoin[$codelen-$j];
				$j=99;}}		
		for ($j=1; $j<$codelen; $j++) {
			if ($msgchr1==$codetojoin[$codelen-$j]) {				
				$msgchr1=$codetojoin[$codelen-$j-1];
				$j=99;}
			else if ($msgchr1==$codetojoin[$codelen-$j-1]) {				
				$msgchr1=$codetojoin[$codelen-$j];
				$j=99;}}			
		// echo('<br />_ '.' '.$msgchr2.' '.$msgchr1);
		$joinedmessage=$joinedmessage.$msgchr2.$msgchr1;
	};

	echo('<br />Joined Message : '.$joinedmessage);

    $file = fopen("/Users/a/Documents/Wormhole/Work/bRAID-r3/Join.html", "w");

    $newt = "<html><head></head><body><h1>bRAIDing messages via Wormhole</h1><h2>Join</h2>";
	$newt = $newt."<h3>Message Part 1</h3>".$msgpart1;
	$newt = $newt."<h3>Message Part 2</h3>".$msgpart2;
	$newt = $newt."<h3>Code to Join</h3>".$codetojoin;
	$newt = $newt."<h3>Joined Message</h3>".$joinedmessage;
	$newt = $newt."</body></html>";

    fwrite($file, $newt);
    fclose($file);
    header('Location: Join.html');

    exit;
}

?>