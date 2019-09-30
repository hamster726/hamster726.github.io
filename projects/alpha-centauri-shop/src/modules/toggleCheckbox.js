export default function toggleCheckbox() {
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
