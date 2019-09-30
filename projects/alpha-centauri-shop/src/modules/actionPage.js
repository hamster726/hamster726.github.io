import filter from "./filter";

export default function actionPage() {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const minCost = document.getElementById('min');
    const maxCost = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('change', filter);


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
