/*This function loads the movie details in the movie info container
@param data ---> the object filled with the movie details*/
function loadMovieDetails(data) {
    if (data.Response == "False") {
        document.querySelector('.error').className += ' active';
        document.querySelector('input').value = fallback;
        click();
    } else {
        document.querySelector('.movieInfo').className += ' active';

        document.querySelector('.movieInfo').innerHTML = '' +
            '<a href="https://www.imdb.com/title/' + data.imdbID + '"><center><h2>' + data.Title + '</h2>' +
            '<img style="width: 70%; border-radius: 10px;" alt="Poster" src="' + data.Poster + '"></center></a>';

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

/*This function loads the memes in the meme container
@param obj ---> the object filled with the pictures*/
function loadMemes() {
    var element;
    const NUMBER_OF_PICTURES = 5;
    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
        element = document.createElement('img');
        element.src = obj["img" + i];
        element.width = window.innerWidth - 100;
        document.querySelector('.memePage1').appendChild(element);
    }
}

function click() {
    movieName = document.querySelector('input').value;

    //Get and display movie data:
    fetchData(apidata.domain + movieName + apidata.apikey,
        loadMovieDetails);

    //Get and display gif data:
    fetchData(memeApiData.domain + memeApiData.apikey + movieName,
        makeObj);
}

document.getElementById('searchLogo').onclick = click;

document.querySelector('input').onfocus = function() {
    document.querySelector('input').setAttribute('placeholder', '');
};

document.querySelector('input').onblur = function() {
    document.querySelector('input').setAttribute('placeholder', 'Search for movies');
};

document.querySelector('input').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.querySelector('#searchLogo').click();
    }
});



var topBoxMovies = [
    "Avengers: Endgame",
    "The Lion King",
    "Toy Story 4",
    "Frozen II",
    "Captain Marvel"
];

function topClick(topMovie) {
    document.getElementById('search').value = topMovie;
    console.log(topMovie);
    click();
}

function loadBoxOffice() {
    var elemT;

    elemT = document.createElement('table');
    elemT.className = 'rankTable';
    document.querySelector('.boxOffice').appendChild(elemT);

    elemT = document.createElement('tbody');
    document.querySelector('.rankTable').appendChild(elemT);

    elemT = document.createElement('h1');
    elemT.className = 'tophead';
    elemT.innerText = 'Box Office';
    document.querySelector('tbody').appendChild(elemT);

    elemT = document.createElement('tr');
    elemT.className = 'topLabels';
    document.querySelector('tbody').appendChild(elemT);

    elemT = document.createElement('th');
    elemT.className = 'topRank';
    elemT.innerText = 'Rank';
    document.querySelector('.topLabels').appendChild(elemT);

    elemT = document.createElement('th');
    elemT.className = 'topRelease';
    elemT.innerText = 'Release';
    document.querySelector('.topLabels').appendChild(elemT);

    for (var i = 0; i < 5; i++) {
        elemT = document.createElement('tr');
        elemT.className = 'rank' + (i + 1);
        document.querySelector('tbody').appendChild(elemT);

        elemT = document.createElement('td');
        elemT.className = 'topContent';
        elemT.innerText = (i + 1);
        document.querySelector('.rank' + (i + 1)).appendChild(elemT);

        elemT = document.createElement('td');
        elemT.className += ' topContent contentSize';
        elemT.innerText = topBoxMovies[i];

        console.log('The index outside: ' + i);
        console.log(topBoxMovies[i]);


        if (i == 0) {
            elemT.onclick = function() { topClick("Avengers: Endgame"); }
        } else if (i == 1) {
            elemT.onclick = function() { topClick("The Lion King"); }
        } else if (i == 2) {
            elemT.onclick = function() { topClick("Toy Story 4"); }
        } else if (i == 3) {
            elemT.onclick = function() { topClick("Frozen II"); }
        } else if (i == 4) {
            elemT.onclick = function() { topClick("Captain Marvel"); }
        }

        elemT.addEventListener('click', function() {});

        document.querySelector('.rank' + (i + 1)).appendChild(elemT);
    }
}

loadBoxOffice();