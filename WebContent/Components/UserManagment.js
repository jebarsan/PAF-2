$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateProjectForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidProjectIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "UserManagmentAPI",
		type : type,
		data : $("#formUserManagment").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onProjectSaveComplete(response.responseText, status);
		}
	});
});

function onProjectSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidProjectIDSave").val("");
	$("#formUserManagment")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidProjectIDSave").val(
					$(this).closest("tr").find('#hidProjectIDUpdate').val());
			
			$("#name").val($(this).closest("tr").find('td:eq(0)').text());
			$("#nic").val($(this).closest("tr").find('td:eq(1)').text());
			$("#address").val($(this).closest("tr").find('td:eq(2)').text());
			$("#phone").val($(this).closest("tr").find('td:eq(3)').text());
			$("#email").val($(this).closest("tr").find('td:eq(4)').text());
			
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "UserManagmentAPI",
		type : "DELETE",
		data : "id=" + $(this).data("userid"),
		dataType : "text",
		complete : function(response, status) {
			onProjectDeleteComplete(response.responseText, status);
		}
	});
});

function onProjectDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL=========================================================================
function validateProjectForm() {
	
	if ($("#name").val().trim() == "") {
		return "Insert Name:";
	}

	
	if ($("#nic").val().trim() == "") {
		return "Insert NIC:";
	}
	
	if ($("#address").val().trim() == "") {
		return "Insert Address:";
	}
	
	if ($("#email").val().trim() == "") {
		return "Insert Email:";
	}
	
	

	
	 var tmpphone = $("#phone").val().trim();
	 if (!$.isNumeric(tmpphone)) 
	 {
		 return "Insert Phone.";
	 }


	return true;
}