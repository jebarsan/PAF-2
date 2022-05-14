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
		url : "PowerManagementAPI",
		type : type,
		data : $("#formPowerManagement").serialize(),
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
	$("#formPowerManagement")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidProjectIDSave").val(
					$(this).closest("tr").find('#hidProjectIDUpdate').val());
			
			$("#name").val($(this).closest("tr").find('td:eq(0)').text());
			$("#districtName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#zipCode").val($(this).closest("tr").find('td:eq(2)').text());
			$("#units").val($(this).closest("tr").find('td:eq(3)').text());
			$("#total").val($(this).closest("tr").find('td:eq(4)').text());
			
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PowerManagementAPI",
		type : "DELETE",
		data : "id=" + $(this).data("powid"),
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
		return "Insert name:";
	}

	
	if ($("#districtName").val().trim() == "") {
		return "Insert District Name:";
	}
	
	if ($("#zipCode").val().trim() == "") {
		return "Insert Zip Code:";
	}
	
	
	
	
	var tmpunits = $("#units").val().trim();
	 if (!$.isNumeric(tmpunits)) 
	 {
		 return "Insert Units.";
	 }

	
	 var tmptotal = $("#total").val().trim();
	 if (!$.isNumeric(tmptotal)) 
	 {
		 return "Insert Total.";
	 }
	 
	 


	return true;
}