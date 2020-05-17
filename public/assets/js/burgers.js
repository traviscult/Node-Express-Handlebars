// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
     $(".change-devour").on("click", function (event) {
        var id = $(this).data("id");
        var devoured = $(this).data("devoured");

        var devoured = {
            devour: true
     };

     // Send the PUT request.
     $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devoured
      }).then(
        function() {
          console.log("burger has beeen devoured", devoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("clicked")
    
        var newBurger = {        name: $("#ca").val().trim(),
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
    });