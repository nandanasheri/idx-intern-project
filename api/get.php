<?php
// ============================================
// Simple Real Estate REST API
// Endpoint: /api.php?endpoint=listings
// ============================================

// Database credentials
$dbHost = 'localhost';
$dbName = 'boxgra6_cali';
$dbUser = 'boxgra6_sd';
$dbPass = 'Real_estate650$';

// Set response type to JSON
header('Content-Type: application/json; charset=utf-8');

try {
    // Connect to database using PDO
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Determine which endpoint is being called
    $endpoint = $_GET['endpoint'] ?? '';
    $terms = $_GET['terms'] ?? '';

    if ($endpoint === 'listings') {
        // Fetch top 20 listings
        $stmt = $pdo->query("
            SELECT 
                *
            FROM rets_property
            ORDER BY ListingContractDate DESC
            LIMIT 20
        ");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'count' => count($results),
            'data' => $results
        ], JSON_PRETTY_PRINT);

    } else {
        // Unknown endpoint
        http_response_code(404);
        echo json_encode(['error' => 'Invalid endpoint']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'details' => $e->getMessage()
    ]);
}
?>