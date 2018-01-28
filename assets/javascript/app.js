 
 $(document).ready(function() {

     // create array of chosen topics
     //with a for loop, create button for each string
     //run create function

    var topics=["Classic Rock", "Hard Rock", "Grunge", "Alternative", "Pop", "Jazz", "Classical", "Raggae", "Folk", "Hip-Hop", "R&B", "Funk"];

    function createButtons() {

      $("#buttons").empty();

      for (var i=0; i<=topics.length-1; i++) {

        console.log(topics[i]);

        var b=$("<button>").attr("type", "button").addClass("btn btn-secondary item");
        b.text(topics[i]);

        $("#buttons").append(b);

       }
       getGif();
    } 

    createButtons();

    //on button click, take text and create the query URL
    //change to https, change limit to 10 gifs/ click
    //call ajax function
    //display images and ratings after


   function getGif() {
     $("button").on("click", function(event) {
          event.preventDefault();

          var category=$(this).text();
          
          console.log(category);

          var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=0X1723gch64JOwcZRRXpXZ6qTmyJQDuY&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

          var results=response.data;  
        console.log(results.length);   


                for (var j=0; j<results.length-1; j++) {

                      console.log(results[j].images.fixed_width_still.url);

                      var placeholder=$("<div>").addClass("gifstyle card");

                      var p=$("<h4>").addClass("card-title");
                      p.text("Rating: " + results[j].rating);

                      var image=$("<img>").addClass("card-image-top change").attr("alt", "music gif" + j );
                      image.attr("data-state", "animate");
                      image.attr("src", results[j].images.fixed_width.url);
                      image.attr("data-animate", results[j].images.fixed_width.url);
                      image.attr("data-still", results[j].images.fixed_width_still.url);

                      placeholder.append(image).append(p);

                      $("#gifs").prepend(placeholder);

                      console.log(placeholder.html());

                 };

        }); //response

     }); //button on-click


   }

          $(document).on("click", ".change", function(event) {
                  event.preventDefault();

                  var currentGif=$(this);

                  var gifState = currentGif.attr("data-state");
                  var stillGif = currentGif.attr("data-still");
                  var animateGif = currentGif.attr("data-animate");

                  console.log(gifState);
                  console.log(stillGif);
                  console.log(animateGif);

                  if (gifState == "animate") {

                        currentGif.attr("src", stillGif);
                        currentGif.attr("data-state", "still");

                  }

                  if (gifState == "still") {

                        currentGif.attr("src", animateGif);
                        currentGif.attr("data-state", "animate");

                  }

          });//close .changeState button event
        


          $("#submit").on("click", function(event){
                  event.preventDefault();
                  $

                  var newCat=$("#userInput").val().trim();

                  if (newCat=="") alert("Write a new category first, then hit the Submit button!");

                  else {
                  topics.push(newCat);  
                  createButtons();

                  $("#userInput").val("");

                  }
          });


    });
