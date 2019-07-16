// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({
                from,
                to,
                start,
                end
            });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }

                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

} // ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————


const phrases = [
    'игры',
    'разврат',
    'маты',
    'дикий смех',
    'разбитые лица',
    'только здесь',
    'и нигде больше'];

const el = document.querySelector('.logo-text');
const fx = new TextScramble(el);
let counter = 0;

const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 500);
    });
    counter = (counter + 1) % phrases.length;
};

// ——————————————————————————————————————————————————
// particles background
// ——————————————————————————————————————————————————

let particlesAdded = false;

const replaceBackground = () => {
    if (document.documentElement.clientWidth < 1024 && !particlesAdded) {
        particlesAdded = true;

        const style = '/resourses/particles-background/particles-style.css';

        const script1 = '/resourses/particles-background/particles.min.js';
        const script2 = '/resourses/particles-background/stats.min.js';
        const script3 = '/resourses/particles-background/particles-script-lp.js';

        let headElement = document.querySelector('head');
        let domElementLink = document.createElement('link');
        domElementLink.rel = 'stylesheet';
        domElementLink.href = style;
        headElement.appendChild(domElementLink);


        let bodyElement = document.querySelector('body');

        let domElement = document.createElement('div');
        domElement.id = 'particles-js';
        bodyElement.appendChild(domElement);
        bodyElement.insertBefore(domElement, bodyElement.firstChild);

        let domElementScript1 = document.createElement('script');
        let domElementScript2 = document.createElement('script');
        let domElementScript3 = document.createElement('script');

        domElementScript2.src = script1;
        domElementScript1.src = script2;
        domElementScript3.src = script3;

        document.head.appendChild(domElementScript1);
        document.head.appendChild(domElementScript2);
        document.head.appendChild(domElementScript3);


    } else if (!particlesAdded) {
        particlesAdded = true;
        let iframe = document.createElement('iframe');
        iframe.classList.add('background-video');
        iframe.src = 'https://player.vimeo.com/video/147238265?autoplay=1&controls=1&muted=1';
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;

        document.body.insertBefore(iframe,  document.body.firstChild);
        //<iframe class="background-video" src="https://player.vimeo.com/video/147238265?autoplay=1&controls=1&muted=1" allow="autoplay; fullscreen" allowfullscreen></iframe>
    }
};

next();
window.onload = replaceBackground();


window.addEventListener('resize', replaceBackground);

