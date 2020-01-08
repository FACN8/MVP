var getlink ={
    apikey: "&plot=full&apikey=854b6e7a",
    domain: "http://www.omdbapi.com/?t=",
    fallback: "IT"
};
var getMeme ={
    meme1: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5",
    meme2: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5",
    meme3: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5",
    meme4: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5",
    meme5: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5",
    meme6: "https://giphy.com/gifs/YktsTX3bbOy6Tlhcyh/html5"
};
function fetchData(search, callback) {

    if (search.includes(' ')) {
        var Movie = search.split(" ")[0]+"+"+search.split(" ")[1];
    } else {
        Movie = search;
    }

    var url = getlink.domain+Movie+getlink.apikey;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        callback(data);
    })
    .catch(function() {
        callback(null);
    })
}
function crelement(s) { return document.createElement(s); }
function click() {
    fetchData(document.getElementById('search').value, function fn(data) {
        if (data.Response == "False") {
            document.querySelector('.error').className += ' active';
            fetchData(getlink.fallback,  fn)
        } else {
            document.querySelector('.movieInfo').className += ' active';

            document.querySelector('.memePage1').innerHTML =  ''
            +'<iframe ult="meme1" src="'+getMeme.meme1+'"></iframe>'
            +'<iframe ult="meme2" src="'+getMeme.meme2+'"></iframe>'
            +'<iframe ult="meme3" src="'+getMeme.meme3+'"></iframe>';

            document.querySelector('.memePage2').innerHTML =  ''
            +'<iframe ult="meme4" src="'+getMeme.meme1+'"></iframe>'
            +'<iframe ult="meme5" src="'+getMeme.meme2+'"></iframe>'
            +'<iframe ult="meme6" src="'+getMeme.meme3+'"></iframe>';

            document.querySelector('.movieInfo').innerHTML =  ''
            +'<a href="https://www.imdb.com/title/' + data.imdbID + '"><center><h2>'+ data.Title +'</h2>'
            +'<img ult="Poster" src="'+data.Poster+'"></center></a>'
            +'<p><b>Released:</b> '+data.Released+'</p>'
            +'<p><b>Runtime:</b> '+data.Runtime+'</p>'
            +'<p><b>Genre:</b> '+data.Genre+'</p>'
            +'<p><b>Director(s):</b> '+data.Director+'</p>'
            +'<p><b>Writer(s):</b> '+data.Writer+'</p>'
            +'<p><b>Plot:</b> '+data.Plot+'</p>'
            +'<p><b>Language:</b> '+data.Language+'</p>'
            +'<p><b>Country:</b> '+data.Country+'</p>'
            +'<p><b>Awards:</b> '+data.Awards+'</p>'
            +'<p><b>IMDB Rating:</b> '+data.imdbRating+'</p>'
            +'<p><b>Box Office:</b> '+data.BoxOffice+'</p>'
            +'<p><b>Production:</b> '+data.Production+'</p>';
        }
    })
}
document.getElementById('confirm').onclick = click;