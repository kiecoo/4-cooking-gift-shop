var offset = 0;
var isLoading = false;
var container = document.getElementsByClassName('container')[0];

var getStreams = function() { 
    isLoading = true;

    var clientID = '3ibpgesyxdwehm4l6rorzdkxtded7a';
    var gameName = 'League%20of%20Legends';
    var gameLimit = 9;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.twitch.tv/kraken/streams?client_id=' + clientID + '&game=' + gameName + '&limit=' + gameLimit + '&offset=' + offset, true);
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            callBack(null, response);
        } else {
            callBack(err);
        }
    }
    request.send();
}

var callBack = function(err, data) {
    if (err) {
        var errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.innerHTML = 'Failed to Load';
            container.appendChild(errorDiv);
    } else {
        offset += 10;
        isLoading = false;
        var streams = data.streams;
        for (var i = 0; i < streams.length; i++) {
            var firstViewbox = document.getElementById('first_viewbox');
            var div = document.createElement('div');
                div.className = 'view';
                div.innerHTML = getViewbox(streams[i]);
                firstViewbox.parentNode.insertBefore(div, firstViewbox);
        }
    }
}

var getViewbox = function(data) {
    var twitchLiveUrl = 'https://www.twitch.tv/' + data.channel.name;
    return ''+
    '<div class="viewbox">' +
        '<div class="preview">' +
            '<a href="' + twitchLiveUrl + '" target="_blank"><img src="https://i.imgur.com/FDiSWhv.jpg"  onload="this.style.opacity=1"></a>' +
        '</div>' +
        '<div class="bottom">' +
            '<div class="intro">' +               
                '<div class="item_name">' + data.channel.display_name + '</div>' +
                '<div class="price">' + 'NT 300' + '</div>' +
            '</div>' +
            '<div class="cartpic">' +
                '<img src="https://i.imgur.com/WS3Og9h.png" onload="this.style.opacity=1">' +
            '</div>' +
        '</div>' +
    '</div>';
}

var documentHeight = function () {
    var body = document.body;
    var html = document.documentElement;
    return Math.max(
      body.offsetHeight,
      body.scrollHeight,
      html.clientHeight,
      html.offsetHeight,
      html.scrollHeight
    );
}

var scrollTop = function() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

document.addEventListener("DOMContentLoaded", function() {
    getStreams();
    window.addEventListener('scroll', function() {
        if (scrollTop() + window.innerHeight > documentHeight() - 100) {
            if (!isLoading) {
                getStreams();
            }
        }
    });
});

