<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
    <title>Add Customer</title>
</head>
<body>
    <h2>Add New Customer</h2>
    
    <form action="/addCustomer" method="post">
        <label for="accountNumber">Account Number:</label>
        <input type="text" id="accountNumber" name="acNo" required><br>

        <label for="name">Customer Name:</label>
        <input type="text" id="name" name="name" required><br>

        <label for="balance">Initial Balance:</label>
        <input type="number" id="balance" name="balance" required><br>

        <input type="submit" value="Add Customer">
    </form>

    <!-- Error Message -->
    <p style="color: red;">${errorMessage}</p>
    
    <!-- Success Message -->
    <p style="color: green;">${successMessage}</p>

    <a href="/home">Go back to Admin Dashboard</a>
</body>
</html>