
    let bascets = [
        {
            "name": "Jennifer",
            "img": "../../assets/basket/gills_yellow_short.jpg",
            "type": "Dog",
            "breed": "Labrador",
            "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
            "age": "2 months",
            "inoculations": ["none"],
            "diseases": ["none"],
            "parasites": ["none"]
          },
          {
            "name": "Sophia",
            "img": "../../assets/basket/gills_yellow.jpg",
            "type": "Dog",
            "breed": "Shih tzu",
            "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
            "age": "1 month",
            "inoculations": ["parvovirus"],
            "diseases": ["none"],
            "parasites": ["none"]
          },
          {
            "name": "Woody",
            "img": "../../assets/basket/round_black.jpg",
            "type": "Dog",
            "breed": "Golden Retriever",
            "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
            "age": "3 years 6 months",
            "inoculations": ["adenovirus", "distemper"],
            "diseases": ["right back leg mobility reduced"],
            "parasites": ["none"]
          },
          {
            "name": "Scarlett",
            "img": "../../assets/basket/rectangle_super_gray.jpg",
            "type": "Dog",
            "breed": "Jack Russell Terrier",
            "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
            "age": "3 months",
            "inoculations": ["parainfluenza"],
            "diseases": ["none"],
            "parasites": ["none"]
          },
          {
            "name": "Katrine",
            "img": "../../assets/basket/rectangle_blue.jpg",
            "type": "Cat",
            "breed": "British Shorthair",
            "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
            "age": "6 months",
            "inoculations": ["panleukopenia"],
            "diseases": ["none"],
            "parasites": ["none"]
          },
          {
            "name": "Timmy",
            "img": "../../assets/basket/round_red.jpg",
            "type": "Cat",
            "breed": "British Shorthair",
            "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
            "age": "2 years 3 months",
            "inoculations": ["calicivirus", "viral rhinotracheitis"],
            "diseases": ["kidney stones"],
            "parasites": ["none"]
          },
          {
            "name": "Freddie",
            "img": "../../assets/basket/round_blue.jpg",
            "type": "Cat",
            "breed": "British Shorthair",
            "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
            "age": "2 months",
            "inoculations": ["rabies"],
            "diseases": ["none"],
            "parasites": ["none"]
          },
          {
            "name": "Charly",
            "img": "../../assets/basket/round_green.jpg",
            "type": "Dog",
            "breed": "Jack Russell Terrier",
            "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
            "age": "8 years",
            "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
            "diseases": ["deafness", "blindness"],
            "parasites": ["lice", "fleas"]
          }
    ];

    
const BTN_LEFT = document.querySelector('#button-arrow-left');
const BTN_RIGHT = document.querySelector('#button-arrow-right');
const CAROUSEL = document.querySelector('#slider__card');
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_ACTIVE = document.querySelector("#item-active");
const ITEM_RIGHT = document.querySelector("#item-right");

//все для слайдера

const createMainArr = () => {
    let children = ITEM_ACTIVE.children;
    let mainArr = [];
    for (let i = 0; i < 3; i++) {
        mainArr.push(+children[i].id);
    }
    return mainArr;
}
//создаем шаблон карточки
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
}

const moveRight = ()=>{
    CAROUSEL.classList.add('transition-right');
    BTN_RIGHT.removeEventListener("click", moveRight);  //блокировка нажатия кнопки во время анимации
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_LEFT.classList.toggle("_inactive");
    BTN_RIGHT.classList.toggle("_inactive");
}

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
            let card = createCardTemplate();
            card.setAttribute("id", `${bascets[key[i]].id}`);
            card.innerHTML += `
                        <img src="${bascets[key[i]].img}" alt="${bascets[key[i]].name}">
                        <h3 class="products__text">${bascets[key[i]].name}</h3>
                        <button class="button-light">Learn more</button>
                `;
            changedItem.appendChild(card);
        }
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
    BTN_LEFT.classList.remove("_inactive");
    BTN_RIGHT.classList.remove("_inactive");
})





// let sliderCardsArr=Array.from(sliderCards); //создание массива из коллекции
// console.log(sliderCardsArr);
//  sliderCardsArr.splice(9,1,sliderCardsArr[0]); //первый элемент перемещаем в конец массива
// console.log(sliderCardsArr);

// sliderCardsArr.splice(0,1); //удаляем первый элемент массива
// console.log(sliderCardsArr);

// var mapP = sliderCardsArr.map(t => {return t.innerHTML});
// console.log(mapP);

// sliderCards.innerHTML=mapP;


