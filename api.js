//api(s) details
//imdb api data:

var apidata = {
    apikey: "&plot=full&apikey=854b6e7a",
    domain: "https://www.omdbapi.com/?t="
};

//tenor api data (gifs):
var memeApiData = {
    apikey: "key=2DY6XX7087VH&q=",
    domain: "https://api.tenor.com/v1/search?"
}

var fallback = "IT";
var movieName = fallback;
var obj = {};

//A dynamic function to fetch data from API and callback a function
function fetchData(url, callback) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(data);
        })
        .catch(function () {
            callback(null);
        })
}

/*This function creates the memes object
@param res ---> the json file post-parsing*/
function makeObj(res) {
    var child = document.querySelector('.memePage1').lastElementChild;
    while (child) {
        document.querySelector('.memePage1').removeChild(child);
        child = document.querySelector('.memePage1').lastElementChild;
    }

    for (var i = 0; i < res.results.length; i++) {
        obj["img" + i] = res.results[i].media[0].gif.url;
    }
    loadMemes(obj);
}