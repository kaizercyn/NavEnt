
<?php
// Base64-encoded image data
$base64Image = "iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAASwaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J"; // Replace with your actual Base64 string

// Extract the image type and data from the Base64 string
list($type, $data) = explode(';', $base64Image);
list(, $data)      = explode(',', $data);

// Decode the Base64 data
$decodedData = base64_decode($data);

// Generate a unique filename
$filename = uniqid('image_') . '.png';

// Save the image to a file
file_put_contents($filename, $decodedData);

echo "Image saved as $filename";
?>

