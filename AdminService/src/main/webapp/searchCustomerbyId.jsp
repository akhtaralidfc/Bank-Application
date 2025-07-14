<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
    <title>Search Customer</title>
</head>
<body>
    <h2>Search Customer</h2>
    
    <form action="searchCustomer" method="get">
        <label for="acNo">Account Number:</label>
        <input type="text" id="acNo" name="acNo" required><br>

        <input type="submit" value="Search">
    </form>

    <!-- Error Message -->
    <p style="color: red;">${errorMessage}</p>

    <a href="/home">Go back to Admin Dashboard</a>
</body>
</html>