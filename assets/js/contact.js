document.querySelector('form.form').addEventListener('submit', function(event) {
    // Prevent form from submitting
    event.preventDefault();

    const form = event.target;
    const groups = form.querySelectorAll('.form__group');

    showError(groups[1], "Too Short");
});

function showError(group, msg) {
    group.classList.add("error");
    let label = group.querySelector('.form__label');
    let l = label.innerHTML;
    label.innerHTML = `${l} 
    <div class="form__message">
        <span>${msg}</span>
        <i class="bx bx-error"></i>
    </div>`;
}