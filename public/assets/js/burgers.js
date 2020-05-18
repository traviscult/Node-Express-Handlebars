// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
     $(".devour").on("click", function (event) {
       console.log("DEVOUR BUTTON IS BEING CALLED")
        var id = $(this).data("id");
        var newDevour = $(this).data("newDevour");

        var newDevourState = {
            devoured: true
     };
     console.log("Calling this!!!!!", newDevourState)

     // Send the PUT request.
     $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("burger has beeen devoured", newDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("add burger was clicked")
    
        const newBurger = {name: $("#ca").val().trim(),
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