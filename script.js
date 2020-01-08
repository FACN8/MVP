var getlink ={
    apikey: "&plot=full&apikey=854b6e7a",
    domain: "https://www.omdbapi.com/?t=",
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
let movieName ="";
function fetchData(url, callback) {
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

    movieName =document.getElementById('search').value;
    var url = getlink.domain+movieName+getlink.apikey;
    fetchData(url, function fn(data) {
      
        if (data.Response == "False") {
            document.querySelector('.error').className += ' active';
            url = getlink.domain+getlink.fallback+getlink.apikey;
            fetchData(url,  fn)
        } else {
            document.querySelector('.movieInfo').className += ' active';

            document.querySelector('.memePage1').innerHTML =  ''
            +'<iframe ult="meme1" src="'+getMeme.meme1+'" allowFullScreen></iframe>'
            +'<iframe ult="meme2" src="'+getMeme.meme2+'" allowFullScreen></iframe>'
            +'<iframe ult="meme3" src="'+getMeme.meme3+'" allowFullScreen></iframe>'
            +'<iframe ult="meme4" src="'+getMeme.meme4+'" allowFullScreen></iframe>'
            +'<iframe ult="meme5" src="'+getMeme.meme5+'" allowFullScreen></iframe>'
            +'<iframe ult="meme6" src="'+getMeme.meme6+'" allowFullScreen></iframe>';
        
            document.querySelector('.movieInfo').innerHTML =  ''
            +'<a href="https://www.imdb.com/title/' + data.imdbID + '"><center><h2>'+ data.Title +'</h2>'
            +'<img ult="Poster" src="'+data.Poster+'"></center></a>';
            
            var exceptions = ['Poster', 'Ratings', 'Response'];

            Object.keys(data).forEach((key) => {
                var header = key;
                
                /* FORMATTER, TO BE CONTINUED
                for (var i = 1; i < header.length; i++) {
                    if (header[i] == header[i].toUpperCase()) {
                        header = header.substring(0, 1).toUpperCase()
                        + header.substring(1, i)
                        + ' '
                        + header.substring(i, header.length);
                    }
                }*/

                if (exceptions.includes(key) || data[key] == "N/A") return;
                document.querySelector('.movieInfo').innerHTML +=
                '<p><b>' + header + ':</b> ' + data[key] + '</p>';
            });
        }
    })
}
document.getElementById('searchLogo').onclick = click;
document.querySelector('input').onfocus = function() {
    document.querySelector('input').setAttribute('placeholder', '');
};
document.querySelector('input').onblur = function() {
    document.querySelector('input').setAttribute('placeholder', 'Search for movies');
};
