const C = document.querySelector("canvas"),
    $ = C.getContext("2d"),
    W = (C.width = window.innerWidth),
    H = (C.height = window.innerHeight);

const str = "爲1為为 強21强 畫67畵画 0匯滙8 9裏裡 夜4亱 龜5亀龟 戶6戸户 ",
    matrix = str.split("");

let font = 11,
    col = W / font,
    arr = [];

for (let i = 0; i < col; i++) arr[i] = 1;

function draw() {
    $.fillStyle = "rgba(0,0,0,.05)";
    $.fillRect(0, 0, W, H);
    $.fillStyle = "#00ff00";
    $.font = font + "px system-ui";
    for (let i = 0; i < arr.length; i++) {
        let txt = matrix[Math.floor(Math.random() * matrix.length)];
        $.fillText(txt, i * font, arr[i] * font);
        if (arr[i] * font > H && Math.random() > 0.975) arr[i] = 0;
        arr[i]++;
    }
}

setInterval(draw, 50);

window.addEventListener("resize", () => location.reload());