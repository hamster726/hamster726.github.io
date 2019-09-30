import filter from "./filter";

export default function renderCatalog() {

    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    const categories = new Set();
    const filerTitle = document.querySelector('.filter-title');

    cards.forEach(function (card) {
        categories.add(card.dataset.category);
    });

    categories.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', function (event) {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        if (event.target.tagName === 'LI') {
            // cards.forEach(function (card) {
            //     if (card.dataset.category === event.target.textContent) {
            //         card.parentNode.style.display = '';
            //     } else {
            //         card.parentNode.style.display = 'none';
            //
            //     }
            //
            // });
            allLi.forEach(function (elem) {
                if (elem === event.target) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            });
            filerTitle.textContent = event.target.textContent;
            filter();
        }
    });

}
