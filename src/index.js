"use strict"

async function loadBascets() {
    return (await fetch("./src/bascets.json")).json();
}

document.addEventListener("DOMContentLoaded", async () => {
    let bascets = [];

    try {
        bascets = await loadBascets();
    } catch (e) {
        console.log("Error!");
        console.log(e);
    }

 //форма обратной связи

 let formBg = document.querySelector('#client-form');
 let formBody = document.querySelector('#body-form');
 let openFormButton = document.querySelector('#button-form');
 let openFormButtonSecond = document.querySelector('#button-form-second');
 let closeFormButton = document.querySelector('#closer'); 
 
 
     openFormButton.addEventListener('click', (e) => { //вешаем обработчик событий на клик
         e.preventDefault(); // Предотвращаем дефолтное поведение браузера
         formBg.classList.add('_active'); // Добавляем класс '_active' для фона
         formBody.classList.add('_active'); // И для самого окна
     });
 
     closeFormButton.addEventListener('click', function () { // Вешаем обработчик на крестик
         formBg.classList.remove('_active'); // Убираем активный класс с фона
         formBody.classList.remove('_active'); // И с окна
        
     });

     formBody.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target == formBody) { // Если цель клика - фон, то:
            formBg.classList.remove('_active'); // Убираем активный класс с фона
            formBody.classList.remove('_active'); // И с окна
        }
    });


    //вторая форма
    openFormButtonSecond.addEventListener('click', (e) => { //вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        formBg.classList.add('_active'); // Добавляем класс '_active' для фона
        formBody.classList.add('_active'); // И для самого окна
    });
 



    const BTN_LEFT = document.querySelector('#button-arrow-left');
const BTN_RIGHT = document.querySelector('#button-arrow-right');
const CAROUSEL = document.querySelector('#slider__card');
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_ACTIVE = document.querySelector("#item-active");
const ITEM_RIGHT = document.querySelector("#item-right");

    const createMainArr = () => {
        let children = ITEM_ACTIVE.children;
        let mainArr = [];
        for (let i = 0; i < 3; i++) {
            mainArr.push(+children[i].id);
        }
        return mainArr;
    }

    const openPopup = () => {
        const sliderCards = document.querySelectorAll(".slider__content");
        sliderCards.forEach((el) => {
            el.addEventListener("click", (e) => {
                let path = e.currentTarget.getAttribute("id");
                let popup = document.querySelector(".popup-content");
                popup.innerHTML = "";
                popup.innerHTML += `
                    <button id="closer" class="popup-closer">&#x2715</button>
                    <img src="${bascets[path].img}" alt="${bascets[path].name}" class="popup-img">
                    <div class="popup-description">
                        <h2 class="popup-title">${bascets[path].name}</h2>
                        <h3 class="popup-subtitle">${bascets[path].type} - ${bascets[path].breed}</h3>
                        <p class="popup-text">${bascets[path].description}</p>
                        <ul class="popup-list">
                            <li class="popup-item"><span>Вес: </span>${bascets[path].weight}</li>
                            <li class="popup-item"><span>Габаритные размеры: </span>${bascets[path].size}</li>
                            <li class="popup-item"><span>Антикорозионная защита: </span>${bascets[path].antiсorrosion}</li>
                            <li class="popup-item"><span>Parasites: </span>${bascets[path].parasites}</li>
                        </ul>
                    </div>`;
                /*document.querySelector(".popup-body").appendChild(popup);*/
                document.querySelector("#popup").classList.add("_open");
                document.body.style.overflow = "hidden";
            });
        });
    }

    const closePopupWithBody = () => {
        const popupBody = document.querySelector(".popup-body");
        popupBody.addEventListener("click", (e) => {
            if (e.target == popupBody) {
                document.querySelector("#popup").classList.remove("_open");
                document.body.style.overflow = "";
                document.querySelector(".popup-content").innerHTML = "";
            }
        });
    }

    const closePopupWithButton = () => {
        const sliderCards = document.querySelectorAll(".slider__content");
        sliderCards.forEach((el) => {
            el.addEventListener("click", () => {
                const closePopup = document.querySelector("#closer");
                closePopup.addEventListener("click", function () {
                    document.querySelector("#popup").classList.remove("_open");
                    document.body.style.overflow = "";
                    document.querySelector(".popup-content").innerHTML = "";
                });
            });
        });
    }
    openPopup();
    closePopupWithButton();
    closePopupWithBody();


    const createCardTemplate = () => {
        const card = document.createElement("div");
        card.classList.add("slider__content");
        return card;
    }

    const createRandomArr = () => {
        let key = [];
        let rundomNumber;
        while (key.length < 3) {
            rundomNumber = Math.floor(Math.random() * 8);
            if (!createMainArr().includes(rundomNumber) && !key.includes(rundomNumber)) {
                key.push(rundomNumber);
            }
        }
        return key;
    }

    const moveLeft = ()=>{
    CAROUSEL.classList.add('transition-left');  
    BTN_LEFT.removeEventListener("click", moveLeft);  //блокировка нажатия кнопки во время анимации
    BTN_RIGHT.removeEventListener("click", moveRight);
    BTN_LEFT.classList.toggle("_inactive");
    BTN_RIGHT.classList.toggle("_inactive");
};


const moveRight = ()=>{
    CAROUSEL.classList.add('transition-right');
    BTN_RIGHT.removeEventListener("click", moveRight);  //блокировка нажатия кнопки во время анимации
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_LEFT.classList.toggle("_inactive");
    BTN_RIGHT.classList.toggle("_inactive");
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener("animationend", (animationEvent) => { 
    let changedItem;
    if(animationEvent.animationName === "move-left"){
        CAROUSEL.classList.remove("transition-left");
        changedItem = ITEM_RIGHT;
         ITEM_ACTIVE.innerHTML=ITEM_RIGHT.innerHTML;
         
    }else{
        CAROUSEL.classList.remove("transition-right");
        changedItem = ITEM_LEFT;
        ITEM_ACTIVE.innerHTML=ITEM_LEFT.innerHTML;
    }

        createMainArr();

        changedItem.innerHTML = "";
        let key = createRandomArr();
        for (let i = 0; i < 3; i++) {
            const card = createCardTemplate();
            card.setAttribute("id", `${bascets[key[i]].id}`);
            card.innerHTML += `
                        <img src="${bascets[key[i]].img}" alt="${bascets[key[i]].name}">
                        <h3 class="products__text">${bascets[key[i]].name}</h3>
                        <button class="button-light">Подробнее</button>
                `;
            changedItem.appendChild(card);
        }

        BTN_LEFT.addEventListener("click", moveLeft);
        BTN_RIGHT.addEventListener("click", moveRight);
        BTN_LEFT.classList.remove("_inactive");
        BTN_RIGHT.classList.remove("_inactive");

        openPopup();
        closePopupWithBody();
        closePopupWithButton();
    })

   
});

// Меню бургер
const burgerMenu = document.querySelector(".header-burger");
const menuBody = document.querySelector(".header__navigation");
const menuItems = document.querySelectorAll(".navigation li");

if (burgerMenu) {
    burgerMenu.addEventListener("click", function () {
        document.body.classList.toggle("_lock");
        burgerMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
}

// закрытие при клике на body
menuBody.addEventListener("click", event => {
    event._isClickWithInMenu = true;
});
burgerMenu.addEventListener("click", event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener("click", event => {
    if (event._isClickWithInMenu) return;
    burgerMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
    document.body.classList.remove("_lock");
});

// закрытие при клике на ссылку
menuItems.forEach(el => {
    el.addEventListener("click", () => {
        burgerMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
        document.body.classList.remove("_lock");
    });
});


//валидация формы
document.addEventListener('DOMContentLoaded', function(){
    const form= document.getElementById('body-form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            }else{
                alert('Ошибка');
                form.classList.remove('_sending');
            }
        }else{
            alert ('Заполните обязательные поля');
        }
    }


    function formValidate(form){
            let error = 0;
            let formReq= document.querySelectorAll('._req');

            for(let index=0; index<formReq.length; index++){
                const input = formReq[index];
                formRemoveError(input);

                if (input.classList.contains('_email')){
                    if(emailTest(input)){
                        formAddError(input);
                        error++;
                    }
                }else if(input.getAttribute('type') === 'checkbox' && input.checked === false){
                    formAddError(input);
                        error++;
                 }else{
                    if (input.value === ""){
                     formAddError(input);
                     error++;
                    }
                 }
            }
            return error;
    }
    function formAddError(input){
                input.parentElement.classList.add('_error');
                 input.classList.add('_error');
             }
        
             function formRemoveError(input){
                 input.parentElement.classList.remove('_error');
                 input.classList.remove('_error');
             }
             
             //функция теста email
             function emailTest(input){
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.value);
             }


});
