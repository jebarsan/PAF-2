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
		url : "BillManagementAPI",
		type : type,
		data : $("#formBillManagement").serialize(),
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
	$("#formProduct")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidProjectIDSave").val(
					$(this).closest("tr").find('#hidProjectIDUpdate').val());
			
			$("#user_id").val($(this).closest("tr").find('td:eq(0)').text());
			$("#unit_usage").val($(this).closest("tr").find('td:eq(1)').text());
			$("#date").val($(this).closest("tr").find('td:eq(2)').text());
			$("#unit_price").val($(this).closest("tr").find('td:eq(3)').text());
			$("#total").val($(this).closest("tr").find('td:eq(4)').text());
			
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "BillManagementAPI",
		type : "DELETE",
		data : "id=" + $(this).data("billid"),
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
	
	if ($("#user_id").val().trim() == "") {
		return "Insert User ID:";
	}

	
	if ($("#date").val().trim() == "") {
		return "Insert Date:";
	}
	
	
	
	
	var tmpunit_usage = $("#unit_usage").val().trim();
	 if (!$.isNumeric(tmpunit_usage)) 
	 {
		 return "Insert Unit Usage.";
	 }

	
	 var tmpunit_price = $("#unit_price").val().trim();
	 if (!$.isNumeric(tmpunit_price)) 
	 {
		 return "Insert Price.";
	 }
	 
	 var tmptotal = $("#total").val().trim();
	 if (!$.isNumeric(tmptotal)) 
	 {
		 return "Insert Total.";
	 }


	return true;
}