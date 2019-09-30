export default function toggleCart() {
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
