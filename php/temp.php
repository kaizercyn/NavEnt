<?php
$qrCodez = 'it is what it is';
require_once("../phpqrcode/qrlib.php");
$path = "res/qr/";
$qr = $path.time().".png";
QRcode::png($qrCodez, $qr, 'H', 4 , 4);
echo "<img src='".$qr."'>";
?>

