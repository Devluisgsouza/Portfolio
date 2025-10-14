
let btnMenuMob = document.querySelector('#btn-menu-mob')
let line1 = document.querySelector('.line-menu-mob1')
let line2 = document.querySelector('.line-menu-mob2')
let menuMobile = document.querySelector('#menu-mobile')
let body = document.querySelector('body')
let linksMenu = document.querySelectorAll('#menu-mobile a');

btnMenuMob.addEventListener("click", ()=>{
    line1.classList.toggle('ativo1')
    line2.classList.toggle('ativo2')
    menuMobile.classList.toggle('open')
    body.classList.toggle('no-overflow')
})

linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        // Remove as classes de animação
        line1.classList.remove('ativo1');
        line2.classList.remove('ativo2');
        menuMobile.classList.remove('open');
        body.classList.remove('no-overflow');
    });
});