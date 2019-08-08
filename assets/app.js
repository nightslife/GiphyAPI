$(document).ready(function(){
// API Key
const API = "EuZ2mmvjRpW0JqghC9nl179pqJrC4SAX";

//Search Array
var gifArray = ["dog", "cat", "spongebob", "power rangers", "dragons", "angry","tired","YOLO","tacos","explosions"];

//Function to display buttons
function buttonDisplay(){
    $("#buttons").empty();
    for (i of gifArray){
        let button = $("<button>")
        button.text(i)
        button.attr("value",i)
        button.addClass("search")
        $("#buttons").append(button)
    }
}
//AJAX search and display function
function gifSearch(){
    $("#gifDisplay").empty();
    let searchTerms = $(this).val()
    let searchLimit = $("#gifNumber").find('input:checked').attr('value')
    let URL = "https://api.giphy.com/v1/gifs/search?api_key="+API+"&q="+searchTerms+"&limit="+searchLimit;
    $.ajax({
        url: URL,
        method: "GET"
    }).then(function(response){
        for(n of response.data){
            let newGifDiv = $("<div>")
            newGifDiv.addClass("block")
            let pTag = $("<p>").text("Rated: "+ n.rating.toUpperCase())
            let newImage = $("<img>");
            newImage.attr({
                "src": n.images.fixed_height_still.url,
                "data-still": n.images.fixed_height_still.url,
                "data-motion": n.images.fixed_height.url,
                "data-state": "still"
            })
            newImage.addClass("gifClick")
            newGifDiv.append(pTag)
            newGifDiv.append(newImage)
            $("#gifDisplay").prepend(newGifDiv)
        }
    })
}

//Set gif to still state and image function
function stillGif(gif){
    $(gif).attr("src", $(gif).attr("data-still"))
    $(gif).attr("data-state","still")
}
//Set gif to animated state function
function animateGif(gif){
    $(gif).attr("src", $(gif).attr("data-motion"))
    $(gif).attr("data-state","inMotion")
}


//Adds new search term button to other array
$("#submitGif").on("click",function(event){
    event.preventDefault();
    let newGif = $("#newGifText").val().trim()
    if(gifArray.indexOf(newGif) <0 && newGif !== ""){
        gifArray.push(newGif)
        buttonDisplay()
        $("[value="+newGif+"]").click()
    }
    $("#newGifText").val("")
    
    
})

//Pauses all gifs when clicked
$("#pauseGifs").on("click",function(event){
    event.preventDefault();
    for(allGif of $(".gifClick")){
        stillGif(allGif)
    }
})

//Animates all gifs when clicked
$("#animateGifs").on("click",function(event){
    event.preventDefault();
    for(allGif of $(".gifClick")){
        animateGif(allGif)
    }
})

//Clears all gifs when clicked
$("#clearGifs").on("click",function(event){
    event.preventDefault();
    $("#gifDisplay").empty();
})

//Initial button display
buttonDisplay()

//Run AJAX search based on button clicked
$(document).on("click",".search", gifSearch)

//Animates or Stills gif based on current state when clicked
$(document).on("click",".gifClick", function(){
    if($(this).attr("data-state") === "still"){
        animateGif(this)
    }else {
        stillGif(this)
    }
})

})