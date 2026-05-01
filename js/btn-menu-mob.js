const btnMenuMob = document.querySelector('#btn-menu-mob');
const line1      = document.querySelector('.line-menu-mob1');
const line2      = document.querySelector('.line-menu-mob2');
const menuMobile = document.querySelector('#menu-mobile');
const body       = document.querySelector('body');
const linksMenu  = document.querySelectorAll('#menu-mobile a');

btnMenuMob.addEventListener('click', () => {
    line1.classList.toggle('ativo1');
    line2.classList.toggle('ativo2');
    menuMobile.classList.toggle('open');
    body.classList.toggle('no-overflow');
});

linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        line1.classList.remove('ativo1');
        line2.classList.remove('ativo2');
        menuMobile.classList.remove('open');
        body.classList.remove('no-overflow');
    });
});