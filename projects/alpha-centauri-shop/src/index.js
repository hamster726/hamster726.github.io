function toggleCheckbox() {
    const checkboxes = document.querySelectorAll('.filter-check_checkbox');

    checkboxes.forEach(function (elem) {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
                console.log('class added');
            } else {
                this.nextElementSibling.classList.remove('checked');
                console.log('class removed');
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

    discountCheckbox.addEventListener('change', function () {
       cards.forEach(function (card) {
           if (discountCheckbox.checked){
               if (!card.querySelector('.card-sale')){
                   card.parentNode.style.display = 'none';
               }
           } else {
               card.parentNode.style.display = '';
           }
       });
    });

    function filterPrice () {
        cards.forEach(function (card) {
             const cardPrise = card.querySelector('.card-price');
             const price = parseFloat(cardPrise.textContent);

             if ((minCost.value && price < minCost.value) || (maxCost.value && price >  maxCost.value)) {
                 card.parentNode.style.display = 'none';
             } else {
                 card.parentNode.style.display = '';
             }
        });
    }

    minCost.addEventListener('change', filterPrice);
    maxCost.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', function () {
        const searchText = new RegExp(search.value);
        console.log(searchText);
    });
}

toggleCheckbox();
toggleCart();
updateCart();
actionPage();