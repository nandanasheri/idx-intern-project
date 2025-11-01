<?php
// ============================================
// Simple Real Estate REST API
// Endpoint: /api.php?endpoint=listings
// ============================================

// Database credentials
$dbHost = 'vps42922.inmotionhosting.com';
$dbName = 'boxgra6_cali';
$dbUser = 'boxgra6_sd';
$dbPass = 'Real_estate650$';

// Set response type to JSON
header('Content-Type: application/json; charset=utf-8');

try {
    // Connect to database using PDO
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch 10 listings - with no filters - this is mainly for testing, we can fetch more in prod
    $stmt = $pdo->prepare("
        SELECT 
            id, L_Address, L_Zip, L_City, L_State, L_SystemPrice, ListAgentFullName, LO1_OrganizationName, L_Photos, LotSizeSquareFeet
        FROM rets_property
        WHERE L_Status = :status
        ORDER BY ListingContractDate DESC
        LIMIT 10
    ");
    $stmt->execute(['status' => "Active"]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
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