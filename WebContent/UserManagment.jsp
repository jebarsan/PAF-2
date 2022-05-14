<%@page import="com.UserManagment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>User Management System</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.1.min.js"></script>
<script src="Components/UserManagment.js"></script>
</head>
<body>
	<div class="container">
	<br>
		<div class="p-3 mb-2 bg-info text-white">
		
			<div class="p-3 mb-2 bg-info text-white">
			<br>
				<h1 class="col-md-6">User Management System</h1>

				<form id="formUserManagment" name="formUserManagment" method="post" action="UserManagment.jsp">


						Name: <input id="name" name="name" type="text"
						class="form-control form-control-sm"> 
						
						<br>NIC: <input id="nic" name="nic" type="text"
						class="form-control form-control-sm"> 
						
						<br> Address: <input id="address" name="address" type="text"
						class="form-control form-control-sm"> 
						
						<br> Phone: <input id="phone" name="phone" type="text"
						class="form-control form-control-sm"> 
						
						<br> Email: <input id="email" name="email" type="text"
						class="form-control form-control-sm"> 
						
						
						
						<br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidProjectIDSave" name="hidProjectIDSave" value="">
				</form>

				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
				<div id="divProjectGrid">
					<%
					UserManagment projectObj = new UserManagment();
						out.print(projectObj.readProject());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
