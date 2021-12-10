class Burger {
    static HEADER_BURGER = 'header__burger';
    static HEADER_MENU = 'header__menu';
    static BODY = 'body';
    static ACTIVE = 'active';
    static LOCK = 'lock';
    static WRAPPER = 'header-wrapper';

    constructor(rootEl) {
        this.$rootEl = rootEl;
        this.bindEvents();
        this.$wrapperEl = this.init();
    }

    init() {
        return this.findeElementByClass(`.${Burger.WRAPPER}`);
    }

    findeElementByClass(selector) {
        return this.$rootEl.querySelector(selector);
    }

    bindEvents() {
        const heading = this.findeElementByClass(`.${Burger.HEADER_BURGER}`);

        heading.addEventListener('click', (e) => this.onBurgerClick(e));
    }

    onBurgerClick(e) {
        this.bindStyles()
    }

    bindStyles() {
        const items = this.$wrapperEl.children;
        const [logoEl, burgerEl, menuEl] = items;

        const main = this.findeElementByClass(Burger.BODY);
        main.classList.toggle(Burger.LOCK);

        menuEl.classList.toggle(Burger.ACTIVE);
        burgerEl.classList.toggle(Burger.ACTIVE);
    }
}

const html = document.querySelector('html')

new Burger(html);

/////////////////////////Добавления класса хедеру////////////////////

const header = document.querySelector('.header');
const scrollChange = 80;

window.addEventListener('scroll', onBodyScroll)

function onBodyScroll() {
    scrollpos = window.scrollY;

    if (window.innerWidth > 768) {
        if (scrollpos >= 150) {
            header.classList.add('fx');
        } else {
            header.classList.remove('fx');
        }
    } else {
        if (scrollpos >= 80) {
            header.classList.add('bg');
        } else {
            header.classList.remove('bg');
        }
    }
}
//////////////////////////////////////////////////////////////////////

/////////////////////////////////Управление скроллом/////////////////
const btnReviewsLeft = document.querySelector('.reviews__item-prew');
const btnReviewsRight = document.querySelector('.reviews__item-next');
const cardsReviews = document.querySelector('.reviews__list');
const btnPaginations = document.querySelector('.reviews__list_paginations');

btnPaginations.addEventListener('click', onSliderClick);

function onSliderClick(e) {
    const wrapper = document.querySelector('.reviews-wrapper');
    var Visible = function (target) {
        // Все позиции элемента
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset + wrapper.getBoundingClientRect().top,
                left: window.pageXOffset + wrapper.getBoundingClientRect().left - 25,
                right: window.pageXOffset + wrapper.getBoundingClientRect().right + 25,
                bottom: window.pageYOffset + wrapper.getBoundingClientRect().bottom
            };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            e.target.closest('button').classList.add('disabled');
        }
    };

    if (e.target.closest('.reviews__item-prew')) {
        const cardEnd = document.querySelector('.reviews__list .reviews__item:first-child');

        Visible(cardEnd);

        if (('.reviews__item-next disabled')) {
            btnReviewsRight.classList.remove('disabled');

            if (window.innerWidth > 992) {
                cardsReviews.scrollLeft -= 314;
            }
            else if (window.innerWidth < 992 && window.innerWidth > 768) {
                cardsReviews.scrollLeft -= 335 + 20;
            }
            else {
                const cardsMob = cardsReviews.offsetWidth;
                cardsReviews.scrollLeft -= cardsMob + 20;
            }
        }

    }
    if (e.target.closest('.reviews__item-next')) {
        const cardEnd = document.querySelector('.reviews__list .reviews__item:last-child');

        Visible(cardEnd);

        if (('.reviews__item-prev disabled')) {
            btnReviewsLeft.classList.remove('disabled');

            if (window.innerWidth > 992) {
                cardsReviews.scrollLeft += 314;
            }
            else if (window.innerWidth < 992 && window.innerWidth > 768) {
                cardsReviews.scrollLeft += 335 + 20;
            }
            else {
                const cardsMob = cardsReviews.offsetWidth;
                cardsReviews.scrollLeft += cardsMob + 20;
            }
        }
    }
}
////////////////////////////Обработка формы/////////////////////////////////
const message = document.querySelector('.message');
const mail = document.querySelector('.mail');
const form = document.querySelector('.form');

form.addEventListener('submit', formSubmit)

function formSubmit(e) {
    const form = document.querySelector('.form');
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
        console.log(mail.value);
        console.log(serialise(form))
        mail.value = '';
        message.innerHTML = 'Email sent';
        message.style.color = 'green';
        setTimeout(() => {
            message.innerHTML = '';
            message.style.color = '';
        }, 5000)

    } else {
        message.innerHTML = 'Fill in the correct email';
        message.style.color = 'red';
        setTimeout(() => {
            message.innerHTML = '';
            message.style.color = '';
        }, 5000)
    }

    function formValidate() {
        let error = 0;

        formRemoveError(mail);

        if (emailTest(mail)) {
            formAddError(mail);
            error++;
        }
        return error;
    }
    function formAddError() {
        mail.parentElement.classList.add('_error');
        mail.classList.add('_error');
    }
    function formRemoveError() {
        mail.parentElement.classList.remove('_error');
        mail.classList.remove('_error');
    }
    function emailTest() {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(mail.value);
    }
}

function serialise(form) {
    if (!form || form.nodeName !== "FORM") {
        return false;
    }

    let i, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'email':
                    case 'submit':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
        }
    }
    return q.join("&");
}
///////////////////////////////////////////////////////////////////////////////////