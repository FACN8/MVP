
var activate = function (cb) {
    fetch("https://api.tenor.com/v1/search?key=2DY6XX7087VH&q=" + document.querySelector('input').value)
        .then(function (response) { return response.json() })
        .then(function (result) {
            cb(result)
        })
        .catch(function (err) { return console.log(err) })
}

function makeObj(res) {

    var obj = {}
    var element;

    var child = document.querySelector('.memePage1').lastElementChild;
    while (child) {
        document.querySelector('.memePage1').removeChild(child);
        child = document.querySelector('.memePage1').lastElementChild;
    }

    for (var i = 0; i < res.results.length; i++)
        obj["img" + i] = res.results[i].media[0].gif.url;

    for (var i = 0; i < res.results.length; i++) {
        element = document.createElement('img');
        element.src = obj["img" + i];
        element.width = 480;
        element.height = 265;
        document.querySelector('.memePage1').appendChild(element);
    }
}
