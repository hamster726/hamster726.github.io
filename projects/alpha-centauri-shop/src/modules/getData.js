export default function getData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('db/db.json')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не получены, ошибка: ' + response.status);
            }
        })
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            console.warn(err);
            goodsWrapper.innerHTML = `<div style="color: red; font-size: 1.5em; margin: 50px auto;">Ошибка ответа сервера, перезагрузите пожалуйста страницу</div>`

        });

}
