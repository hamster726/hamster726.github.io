export default function filter() {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const minCost = document.getElementById('min');
    const maxCost = document.getElementById('max');
    const activeLi = document.querySelector('.catalog-list li.active');

    cards.forEach(function (card) {
        const cardPrise = card.querySelector('.card-price');
        const price = parseFloat(cardPrise.textContent);
        const discount = card.querySelector('.card-sale');

        card.parentNode.style.display = '';

        if ((minCost.value && price < minCost.value) || (maxCost.value && price > maxCost.value)) {
            card.parentNode.style.display = 'none';
        } else if (discountCheckbox.checked && !discount) {
            card.parentNode.style.display = 'none';
        } else if (activeLi && (card.dataset.category !== activeLi.textContent)){
            card.parentNode.style.display = 'none';
        }
    });
}
