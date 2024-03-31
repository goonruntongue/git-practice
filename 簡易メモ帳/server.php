<?php
if (isset($_POST["comment"])) {

    $comment = "<p>" . nl2br(str_replace(" ", "&nbsp;", $_POST["comment"])) . "</p>";
    file_put_contents("data.txt", $comment, FILE_APPEND);
    echo file_get_contents("data.txt");
} else {
    if (file_exists("data.txt")) {
        echo file_get_contents("data.txt");
    }
}
