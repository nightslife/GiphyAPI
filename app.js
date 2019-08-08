$(document).ready(function(){

const API = "EuZ2mmvjRpW0JqghC9nl179pqJrC4SAX";

var giphArray = ["dog", "cat", "bird", "parrot", "horse", "iguana"];

function buttonDisplay(){
    $("#buttons").empty();
    for (i of giphArray){
        var button = $("<button>")
        button.text(i)
        button.addClass("search")
        $("#buttons").append(button)
    }
}
function gifSearch(){
    $("#gifDisplay").empty();
    var searchTerms = $(this).text()
    var searchLimit = $("#gifNumber").find('input:checked').attr('value')
    var URL = "https://api.giphy.com/v1/gifs/search?api_key="+API+"&q="+searchTerms+"&limit="+searchLimit;
    console.log(URL)
    $.ajax({
        url: URL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        for(n of response.data){
            console.log(n.url)
        }
    })
}

$("#submitAnimal").on("click",function(event){
    event.preventDefault();
    let newAnimal = $("#animalText").val().trim()
    if(giphArray.indexOf(newAnimal) <0 && newAnimal !== "")
        giphArray.push(newAnimal)
    buttonDisplay()
})



buttonDisplay()

$(document).on("click",".search", gifSearch)

})