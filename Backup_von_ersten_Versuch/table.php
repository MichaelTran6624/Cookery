<?php    
    $db = mysqli_connect("localhost", "tran", "seebaum1", "nginx");

    if(isset($_POST['login_btn'])){  //button onclick
        session_start();
        $username = $db->real_escape_string($_POST['username']);
        $password = $db->real_escape_string($_POST['password']);
        
        $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
        $result = mysqli_query($db, $sql);

        if(mysqli_num_rows($result)==1) {
            $_SESSION['message'] = "You are now logged in";
            $_SESSION['username'] = $username;
            header("location: home.php");  //Weiterleitung nach erfolgreichem Login
        }else{
            $_SESSION['message'] = "There is no user '" . $username . "' registered!";
        }
    }

?>