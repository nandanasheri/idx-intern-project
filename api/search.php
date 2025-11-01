<?php
// ============================================
//  Search API
// Endpoint: /search.php
// ============================================

// Database credentials
$dbHost = 'vps42922.inmotionhosting.com';
$dbName = 'boxgra6_cali';
$dbUser = 'boxgra6_sd';
$dbPass = 'Real_estate650$';

/*
SEARCH ENDPOINT : returns property listings that match certain queries and filters. currently can query by city, subdivision, address, min_price and max_price
Example Endpoint : http://localhost:8000/api/search.php?q=La%20Jolla&max_price=2000000
Return JSON : 
{
    "status": "success",
    "count": 10,
    "data": [
        {
            "id": 52972,
            "address": "8040 Girard Ave 1",
            "city": "La Jolla",
            "state": "CA",
            "zipcode": "92037",
            "full_addr": "8040 Girard Ave 1, La Jolla, CA, 92037",
            "price": "1,499,000.00",
            "sqft": "3094.00",
            "agent": "Michelle Dykstra",
            "organization": "Compass",
            "display_img": "https:\/\/api-trestle.corelogic.com\/trestle\/Media\/Property\/PHOTO-Jpeg\/1137608070\/1\/ODU2My84NTc1LzIw\/MjAvMTcwMjMvMTc1OTQyMDUwNA\/S8qbdVe53g1vJ1aKDpg62yydvbykwfnQ5L8tgpXnWdo"
        }, ......]
*/

// Set response type to JSON
header('Content-Type: application/json; charset=utf-8');

try {
    // Connect to database using PDO
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Dynamically build the query depending on what parameters have been given
    $stmt = "SELECT 
            id, L_Address, L_Zip, L_City, L_State, L_SystemPrice, ListAgentFullName, LO1_OrganizationName, L_Photos, LotSizeSquareFeet
        FROM rets_property
        WHERE L_Status = :status";
    
    $params = [];

    $params[':status'] = "Active";

    if (!empty($_GET['q'])) {
        $stmt .= " AND (L_City LIKE :q1 OR L_Address LIKE :q2 OR L_Zip LIKE :q3 OR SubdivisionName LIKE :q4)";
        // Add the wildcard here - % for LIKE
        $params[':q1'] = "%{$_GET['q']}%";
        $params[':q2'] = "%{$_GET['q']}%";
        $params[':q3'] = "%{$_GET['q']}%";
        $params[':q4'] = "%{$_GET['q']}%";
    }

    if (!empty($_GET['min_price'])) {
        $stmt .= " AND L_SystemPrice >= :min_price";
        $params[':min_price'] = $_GET['min_price'];
    }

    if (!empty($_GET['max_price'])) {
        $stmt .= " AND L_SystemPrice <= :max_price";
        $params[':max_price'] = $_GET['max_price'];
    }

    $stmt .= " ORDER BY ListingContractDate DESC LIMIT 10";
    
    // Fetch 10 listings - this is mainly for testing, we can fetch more in prod
    $final_sql_stmt = $pdo->prepare($stmt);

    $final_sql_stmt->execute($params);
    $results = $final_sql_stmt->fetchAll(PDO::FETCH_ASSOC);

    // Debugging - print out all results returned
    // print_r($results);
    $formatted_results = [];

    // Iterate through each row to reformat the fields as required
    foreach ($results as $row) {
        // Images are returned as an array but it's a huge string so we first decode it
        $photos_array = json_decode($row['L_Photos'], true); // now it's a PHP array
        // Now retrieve the first photo
        $first_photo = $photos_array[0] ?? null;

        $formatted_results[] = [
            "id" => $row["id"],
            "address" => $row["L_Address"],
            "city" => $row["L_City"],
            "state" => $row["L_State"],
            "zipcode" => $row["L_Zip"],
            "full_addr" => $row["L_Address"] . ", " . $row["L_City"] . ", " . $row["L_State"] . ", " . $row["L_Zip"],
            "price" => number_format((float)$row["L_SystemPrice"], 2, '.', ','),
            "sqft" => $row["LotSizeSquareFeet"],
            "agent" => $row["ListAgentFullName"],
            "organization" => $row["LO1_OrganizationName"],
            "display_img" => $first_photo,
        ];
    }
    echo json_encode([
        'status' => 'success',
        'count' => count($results),
        'data' => $formatted_results
    ], JSON_PRETTY_PRINT);

    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'details' => $e->getMessage()
    ]);
}
?>