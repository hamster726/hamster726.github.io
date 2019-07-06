function joke_activation() {
    var x = document.getElementById("logo");
    x.setAttribute('onmouseover', 'joke_start()');
    x.setAttribute('onmouseout', 'joke_start()');

}

function joke_start() {
    // var audio = new Audio();
    //     // audio.src = '/resourses/files/HARDBASS.mp3/';
    //     // audio.autoplay = true;
    if (document.getElementById('audio-joke') != null){
        //deleting music
        var x = document.getElementById("audio-joke");
        document.body.removeChild(x);

        var y = document.getElementById('logo');
        y.classList.remove('rotate');

        var z = document.getElementById("script-creators");
        z.setAttribute('href','style.css');
        z.reload();

    } else {
        //playing music
        var x = document.createElement('audio');
        x.setAttribute('id','audio-joke');
        x.setAttribute('src','resourses/files/HARDBASS.mp3')
        x.setAttribute('preload', '');
        x.setAttribute('loop', '');
        x.setAttribute('autoplay', '');
        document.body.appendChild(x);

        //rotate logo
        var y = document.getElementById('logo');
        y.classList.add('rotate');

        //blink background
        var z = document.getElementById("script-creators");
        z.setAttribute('href','style-joke.css');

        x.reload();
        y.reload();
        z.reload();
    }

}