export default function updateCart() {
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
