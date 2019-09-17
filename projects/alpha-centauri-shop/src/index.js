function toggleCheckbox() {
    const checkboxes = document.querySelectorAll('.filter-check_checkbox');

    checkboxes.forEach(function (elem) {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeModalCart = modalCart.querySelector('.cart-close');

    btnCart.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModalCart.addEventListener('click', function () {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            modalCart.style.display = '';
            document.body.style.overflow = '';
        }
    });
}

function updateCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const emptyCart = document.getElementById('cart-empty');
    const countCardsInCart = document.querySelector('.counter');

    cards.forEach(function (card) {
        const btn = card.querySelector('button');
        btn.addEventListener('click', function () {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Убрать';

            removeBtn.addEventListener('click', function () {

                cardClone.remove();
                showData();

            });
        });
    });

    function showData() {
        const cardsInCart = cartWrapper.querySelectorAll('.card');
        const cardsPrise = cartWrapper.querySelectorAll('.card-price');
        const cartTotalPrice = document.querySelector('.cart-total span');

        countCardsInCart.textContent = cardsInCart.length;

        let sum = 0;
        cardsPrise.forEach(function (cardPrice) {
            sum += parseFloat(cardPrice.textContent);
        });
        cartTotalPrice.textContent = sum;

        if (cardsInCart.length !== 0) {
            emptyCart.remove();
        } else {
            cartWrapper.appendChild(emptyCart);
        }
    }
}

// filter stock
function actionPage() {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const minCost = document.getElementById('min');
    const maxCost = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('change', filter);

    function filter() {
        cards.forEach(function (card) {
            const cardPrise = card.querySelector('.card-price');
            const price = parseFloat(cardPrise.textContent);
            const discount = card.querySelector('.card-sale');

            if ((minCost.value && price < minCost.value) || (maxCost.value && price > maxCost.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }

    minCost.addEventListener('change', filter);
    maxCost.addEventListener('change', filter);

    searchBtn.addEventListener('click', function () {
        const searchText = new RegExp(search.value.trim(), 'i');

        cards.forEach(function (card) {
            const title = card.querySelector('.card-title');

            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

            search.value = '';
        });
    });
}

// получение данных с сервера
function getData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json')
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

// выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');

    data.goods.forEach(function (good) {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML =
            `
            <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">Акция</div>' : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top" style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
                `;
        goodsWrapper.appendChild(card);


    })
}

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    const categories = new Set();
    
    cards.forEach(function (card) {
        categories.add(card.dataset.category);
    });

    categories.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', function (event) {
        if (catalogWrapper.style.display){
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        if (event.target.tagName === 'LI'){
            cards.forEach(function (card) {
                if (card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';

                }

            })
        }
    });

}


getData().then(function (data) {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    updateCart();
    actionPage();
    renderCatalog();
});