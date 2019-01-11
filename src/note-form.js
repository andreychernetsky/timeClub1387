// {
//         date: '01.05.2018',
//         image: ['http://vk.com/...', 'http://vk.com/...'],
//         title: 'Some title',
//         description: 'description ...',
//},

let form = document.querySelector('#note-form');
let button = form.querySelector('[type="submit"]');

button.addEventListener('click', (event) => {
    event.preventDefault();
    let note = formData(form);
    saveNote(note);
    // location.reload();
});

/**
 *
 * @param form: domElement
 */
const formElemTypes = ['text', 'number', 'date', 'phone', 'email', 'password'];

function formData(form) {
    const formElements = getFormElements(formElemTypes, form);

    function data(elements) {
        let res = {};
        elements.forEach((el) => res[el.name] = el.value);
        return res;
    }

    return data(formElements);
}

function getFormElements(types, form) {
    let result = [];
    types.forEach((type) => {
        const list = [...form.querySelectorAll(`[type='${type}']`)];
        result = result.concat(list)
    });
    result = result.concat([...form.querySelectorAll('textarea')]);
    return result;
}

//form validate
const noSubmitForms = [...document.querySelectorAll('[data-no-submit]')];
noSubmitForms.forEach((form) => validateForm(form));

function validateForm(form) {
    const submitButton = form.querySelector('[type="submit"]');

    submitButton && submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        const formElements = getFormElements(formElemTypes, form);

        formElements.forEach(element => showError(element));
        let elementsErrors = formElements.filter(element => hasErrors(element));
        if (!elementsErrors.length) {
            clearForm(form);

            //TODO:separate it,rewrite to event in "onCleatForm"
            initCalendar();
        }
    });

    function showError(element) {
        if (element.hasAttribute('required')) {
            removeError(element);
            !element.value && addError(element);
        }
    }

    function addError(element) {
        const blockError = document.createElement('div');
        const parent = element.parentNode;

        blockError.classList.add('error-text');
        blockError.innerText = element.getAttribute('data-error');
        parent.appendChild(blockError);
        parent.classList.add('has-error');
    }

    function removeError(element) {
        const parent = element.parentNode;
        const errorBlock = parent.querySelector('.error-text');

        errorBlock && errorBlock.remove();
        parent.classList.remove('has-error');
    }

    function hasErrors(element) {
        const parent = element.parentNode;
        return parent.classList.contains('has-error');
    }

    function clearForm(form) {
        getFormElements(formElemTypes, form).forEach((elem) => elem.value = "");
    }
}
