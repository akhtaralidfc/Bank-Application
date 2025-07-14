<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>List of Customers</title>
</head>
<body>
    <h2>List of Customers</h2>
    
    <table border="1">
        <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Balance</th>
        </tr>

        <%-- Accessing the customers list from the model --%>
        <%
            java.util.List<com.example.AdminService.pojos.Customer> customers = 
                    (java.util.List<com.example.AdminService.pojos.Customer>) request.getAttribute("customers");
            if (customers != null) {
                for (com.example.AdminService.pojos.Customer customer : customers) {
        %>
            <tr>
                <td><%= customer.getAcno() %></td>
                <td><%= customer.getName() %></td>
                <td><%= customer.getBalance() %></td>
            </tr>
        <%
                }
            } else {
        %>
            <tr>
                <td colspan="3">No customers found</td>
            </tr>
        <%
            }
        %>
    </table>

    <a href="/home">Go back to Admin Dashboard</a>
</body>
</html>
