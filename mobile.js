var movieName = apidata.fallback;

/*This function loads the memes in the meme container
@param obj ---> the object filled with the pictures*/
function loadMemes(obj) {
    var element;
    const NUMBER_OF_PICTURES = 5;
    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
        element = document.createElement('img');
        element.src = obj["img" + i];
        element.width = window.innerWidth - 100;
        document.querySelector('.memePage1').appendChild(element);
    }
}

/*This function loads the movie details in the movie info container
@param data ---> the object filled with the movie details*/
function loadMovieDetails(data) {
    if (data.Response == "False") {
        document.querySelector('.error').className += ' active';
        document.querySelector('input').value = apidata.fallback;
        click();
    } else {
        document.querySelector('.movieInfo').className += ' active';

        document.querySelector('.movieInfo').innerHTML = ''
            + '<a href="https://www.imdb.com/title/' + data.imdbID + '"><center><h2>' + data.Title + '</h2>'
            + '<img alt="Poster" src="' + data.Poster + '"></center></a>';

        var exceptions = ['Poster', 'Ratings', 'Response'];

        Object.keys(data).forEach((key) => {
            var header = key;

            if (exceptions.includes(key) || data[key] == "N/A")
                return;

            document.querySelector('.movieInfo').innerHTML +=
                '<p><b>' + header + ':</b> ' + data[key] + '</p>';
            //change to programatically appendchild
        });
    }
}

function click() {
    movieName = document.querySelector('input').value;
    //Get and display movie data:
    fetchData(apidata.domain + movieName + apidata.apikey, loadMovieDetails);
    //Get and display gif data:
    fetchData(memeApiData.domain + memeApiData.apikey + movieName, makeObj);
}

document.getElementById('searchLogo').onclick = click;

document.querySelector('input').onfocus = function () {
    document.querySelector('input').setAttribute('placeholder', '');
};

document.querySelector('input').onblur = function () {
    document.querySelector('input').setAttribute('placeholder', 'Search for movies');
};

document.querySelector('input').addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.querySelector('#searchLogo').click();
    }
});