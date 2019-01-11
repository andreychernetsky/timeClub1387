siteMenu();
initCalendar();

function siteMenu() {
    //меню сйта
    let submenus = document.querySelectorAll('nav.main .submenu >a');
    submenus.forEach(function (item) {
        item.addEventListener('click', function (e) {
            this.parentNode.classList.toggle('opened');
            this.querySelectorAll('.submenu')
                .forEach((sub) => sub.parentNode.classList.remove('opened'));
            e.stopPropagation();
        })
    });
}

let burger = document.querySelector('#burger-button');
let body = document.querySelector('body');
let nav = document.querySelector('nav.main');
let timeout;

nav.addEventListener('mouseover', function () {
    clearTimeout(timeout);
});

nav.addEventListener('mouseout', function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        body.classList.remove('menu-open');
    }, 2000);
});

burger.addEventListener('click', function () {
    body.classList.toggle('menu-open');
});
