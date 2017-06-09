$(document).ready(function() {
    // initialize DataTable
   var table = $('#inventory').DataTable();

   
    // This runs when the user submits a new item
    $("#newItem").on("click", function(event) {
        
        event.preventDefault();
        var newItemName = $("#item_name").val().trim();
        var newLocation = $("#location").val().trim();
        var newCategory = $("#category").val();

        // NEEDS FIXING - A value has to be entered or server will crash, hence the ||
        // NEEDS FIXING - A value has to be entered or server will crash, hence the ||
        // NEEDS FIXING - A value has to be entered or server will crash, hence the ||
        var newValue = $("#value").val() || 0;
        
        // NEEDS FIXING - A proper date has to be entered or server will crash, hence the ||
        // NEEDS FIXING - A proper date has to be entered or server will crash, hence the ||
        // NEEDS FIXING - A proper date has to be entered or server will crash, hence the ||
        var newDatePurchased = $("#date_purchased").val() || "2049-12-31";
        
        var newPurchasedPrice = $("#purchase_price").val().trim();
        var newSerialNumber = $("#serial_number").val().trim();
        var newImage = $("#image").val().trim();
        var newNotes = $("#notes").val().trim();
        var userEntered = 3;

        // This checks to make sure these fields are not empty
        if (!newItemName || !newLocation || newCategory === "Category") {
            alert("Please make sure you fill in something for Name, Location, and Category");
            return;
        }

        // This will create a new object to go into the database
        var newItem = {
            item_name: newItemName,
            location: newLocation,
            category: newCategory,
            value: newValue,
            date_purchased: newDatePurchased,
            purchased_price: newPurchasedPrice,
            serial_number: newSerialNumber,
            image: newImage,
            notes: newNotes,

            // NEEDS FIXING - identify the UserID
            // NEEDS FIXING - identify the UserID
            // NEEDS FIXING - identify the UserID
            UserId: 3
        };
        // THIS IS COMMENTED OUT B/C INDIA IS WORKING ON A BETTER SOLUTION ON THE ADD.HTML PAGE
        // BUT LEAVE THIS FOR NOW
        // submitItem(newItem);
    });

    // THIS IS COMMENTED OUT B/C INDIA IS WORKING ON A BETTER SOLUTION ON THE ADD.HTML PAGE
    // BUT LEAVE THIS FOR NOW
    // This function submits the item to the database
    // function submitItem(post) {
    //     $.post("/api/item", post, function() {
    //         alert("This has been added to the database!");
    //     });
    // }

    // This section will get infro from the db and display the items on the inventory.html page
    function getInventory() {
        $.get("/api/inventory", displayData);
    }

    function displayData(data) {
        
        // This will display the rows of data from the database into the table
        for (var i = 0; i < data.length; i++) {

            var rowofdata = [ 
                data[i].item_name,
                data[i].location,
                data[i].category,
                "$" + data[i].value.toLocaleString(),
                moment(data[i].date_purchased).format("L"),
                "$" + data[i].purchase_price.toLocaleString(),
                data[i].serial_number,
                "<i id='photo' class='fa fa-picture-o fa-lg' src='" + data[i].image + "' aria-hidden='true'></i>",
                data[i].notes,
                "<i value='" + i + "' class='fa fa-pencil fa-lg updateItem' aria-hidden='true'></i>",
                "<i value='" + i + "' class='fa fa-trash fa-lg deleteItem' aria-hidden='true'></i>"];

            table.row.add(rowofdata).draw();
        }

        // This shows the image when the picture icon is clicked
        $(".fa-picture-o").click(function(){
            alert("This will show the image. When it's coded correctly");
        });

        // This deletes a line when the trashcan icon on a line is clicked
        $(".deleteItem").click(function(){
            alert("This will delete the selected item completely. When it's coded correctly");
        });

        // This updates an item when the pencil icon on that line is clicked
        $(".updateItem").click(function(){
            alert("This will update the selected item. When it's coded correctly");
        });

    }
    
    // This runs when inventory.html is loaded.
    if (window.location.pathname === '/inventory')
        { 
            getInventory();
        }

});