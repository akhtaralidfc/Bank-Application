<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Customer Details</title>
</head>
<body>
    <h2>Customer Details</h2>
    
    <p><strong>Account Number:</strong> ${customer.getAcno() }</p>
    <p><strong>Name:</strong> ${customer.getName()}</p>
    <p><strong>Balance:</strong> ${customer.getBalance()}</p>

    <a href="/home">Go back to Admin Dashboard</a>
</body>
</html>