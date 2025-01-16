<?php
    $username = "foo bar";
    $login = "user001";
    $email = "good@email.com";

    $accounts = [
        ["checking" => "Your personal checking", "Balance" => 2000, "accno" => 11],
        ["savings" => "Your personal savings", "Balance" => 2000, "accno" => 12]
    ];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Injection Canonical - <?php echo $username; ?>'s Bank Account</title>
    <script>
        // vulnerable dom xss here 
        function searchAccount() {
            var searchTerm = document.getElementById("searchTerm").value; // get search term from input

            if (searchTerm == "") {
                document.getElementById("searchResults").innerHTML = "";
            }

            var results = [];
            var elements = document.querySelectorAll("p"); // get all p elements

            // loop thru <p> elements to find match text
            elements.forEach(function(element) {
                
                // gets text of <p> element.
                var text = element.textContent || element.innerText;
                if(text.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push(element.innerHTML); // push the element into results
                }
            });

            // display results or no results msg
            if (results.length > 0) {
                document.getElementById("searchResults").innerHTML = results.join("<br><br>")
            }
            else {
                document.getElementById("searchResults").innerHTML = 'No Results Found For' +searchTerm;
            }

            /* 
            //////////////////////////////////////////////////////////
            // this was diff logic that wasnt helpful for the dom xss
            //////////////////////////////////////////////////////////

            // create an xhr 
            var xhr = new XMLHttpRequest();

            // set ajax req
            xhr.open("GET", "search.php?search=" + searchTerm, true); // send req

            // response logic
            xhr.onload = function() {
                if (xhr.status == 200) {
                    document.getElementById("searchResults").innerHTML = xhr.response; 
                }
                else {
                    document.getElementById("searchResults").innerHTML = "Error fetching data.";
                }
            };

            // send req
            xhr.send();
            ///////////////////////////////////////////////////////////
            */

        }
    </script>
</head>
<body>
    <h1>Easy Bank - Bank Account for <?php echo $username; ?></h1>

    <p id="username">Hello <?php echo $username; ?></p>
    <p id="email">Email: <?php echo $email; ?></p>
    <p id="login">Login name: <?php echo $login; ?></p>
    <p id="checking">Account: <?php echo $accounts[0]["checking"] . "| Acct # " . $accounts[0]["accno"] . " | Balance: $" . $accounts[0]["Balance"]; ?></p>
    <p id="savings">Account: <?php echo $accounts[1]["savings"] . "| Acct # " . $accounts[1]["accno"] ." | Balance: $" . $accounts[1]["Balance"]; ?></p>
    <br>
    <br>
    <h2>Search For Account Info:</h2>
    <input type="text" id="searchTerm" placeholder="Enter search term">
    <button onclick="searchAccount()">Search</button>
    <p><div id="searchResults"></div></p>
    <br>
    <br>
    <h2>Enter date to check the current date</h2>
    <form method ="GET" action="pinj.php">
        <label for="date">Date:</label>
        <input type="text" name="date" id="date" required>
        <button type="submit">Submit</button
    
        <?php 
        if (isset($_GET['date']) && !empty($_GET['date'])) {
            $ddate = $_GET['date'];
            // display output
            echo "<p>";
            echo "<h2>The current date is:</h2>";
            echo "</p>";
            echo "<p>";
            $oput = system($ddate);
            echo "</p>";
        }
        ?>    
</body>
</html>