'use strict';

            //  OUR SERVICES

// Переключение табов и подтягивание нужного содержимого
let tabs = document.querySelector('.our-services-tabs');
let tabItem = tabs.querySelectorAll('.tabs-title');
let content = document.querySelector('.our-services-tabs-content');
let listContent = content.querySelectorAll(".tabs-content-item");

tabItem[0].classList.add('active');
listContent.forEach ((item, i ) => {
    if (+tabItem[0].getAttribute('data-number') === i) {
        listContent[i].style.display = 'flex';
    }
});

tabs.addEventListener("click", event => {
    let activeTab = tabs.querySelector('.active');
    activeTab.classList.remove('active');

    if (event.target.hasAttribute('data-number')) {
        event.target.classList.add('active');

        let numberTab = event.target.getAttribute('data-number');
        listContent.forEach((item, i) => {
            if (i === +numberTab) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
});

            // Our Amazing Work SECTION

let workTabs = document.querySelector('.our-amazing-work-tabs');
let workTabItem = workTabs.querySelectorAll('.amazing-work-tabs-title');
let  photoContainer = document.querySelector('.our-amazing-work-gallery-wrap');
let graphicDesignPhotos = photoContainer.querySelectorAll(".amazing-work-photo-wrap");
let amazingWorkWrap = document.querySelector('.our-amazing-work-wrap');
let btnLoadMore = document.querySelector('.button-load-more');

// Первоначальное присвоение первой вкладке класса активной вкладки
workTabItem[0].classList.add('chosen-photo-group');

// Функция создания массива рандомных номеров картинок
let chosenPhotoRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};
function dozenPhotos() {
        let arrPhotos = [];
        for (let i = 0; i <= 11; i++) {
            let activeNumber = chosenPhotoRandom(1, 32);
            if (arrPhotos.includes(activeNumber)) {
                let index = arrPhotos.indexOf(activeNumber);
                arrPhotos.splice(index, 1);
                i--;
            }
            arrPhotos[i] = activeNumber;
        } return arrPhotos;
    }

// Функция рандомного выведения картинок с помощью созданного массива их номеров
function randomChoicePhotoAll() {
    let photosNotForChoice = document.querySelectorAll('.show');
    if (graphicDesignPhotos !== photosNotForChoice) {
        dozenPhotos().forEach((item) => {
            if (item !== 0) {
                let activePhoto = graphicDesignPhotos[item];
                activePhoto.classList.add('show');
                photoContainer.append(activePhoto);
            }
        })
    }
}
// Выведение картинок, соответствующих активой вкладке All
if (workTabItem[0].getAttribute('data-match') === 'all') {
    randomChoicePhotoAll();
}

// Выведение картинок, соответствующих активой вкладке
function activeWorkTabPictures() {
    workTabs.addEventListener("click", event => {
        let activeWorkTab = workTabs.querySelector('.chosen-photo-group');
        activeWorkTab.classList.remove('chosen-photo-group');
        let shownPhoto = photoContainer.querySelectorAll('.show');

        shownPhoto.forEach((item) => item.classList.remove('show'));
        event.target.classList.add('chosen-photo-group');
        let targetDataMatch = event.target.getAttribute('data-match');
        let count = 0;
        let shownTabPhoto = graphicDesignPhotos.forEach((item, i) => {
            let photoDataMatch = item.getAttribute('data-match');
            if (photoDataMatch === targetDataMatch) {
                item.classList.add('show');
                count++;
                if (count < 11) {
                    btnLoadMore.style.display = 'none';
                }
            }
        });
        if (targetDataMatch === 'all') {
            randomChoicePhotoAll();
            btnLoadMore.style.display = 'block';
            btnLoadMore.style.visibility = 'visible';
        }
    });
}
activeWorkTabPictures();

// функция добавления 12 картинок после нажатия кнопки Load More
function addPhoto() {
    let count = 0;
    let nonactive = 0;
    graphicDesignPhotos.forEach((item, i) => {
        let active = item.classList.contains('show');
        let nonActivePhoto = !active;
        if (nonActivePhoto) nonactive++;
        if (!active && count < 12) {
            item.classList.add('show');
            count++;
            }
        if (nonactive === 0) {
            btnLoadMore.style.visibility = 'hidden';
        }
    });
}

// Анимация при добавлении 12 картинок после нажатия кнопки Load More и ее удаления
btnLoadMore.addEventListener('click', event => {
    event.preventDefault();
    btnLoadMore.style.display = 'none';
    let loader = document.querySelector('.loader-wrap');
    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';
        btnLoadMore.style.display = 'block';
        addPhoto();
    }, 6000);
});



                // Breaking News Section

// setting date
let breakingNewsDate = document.querySelectorAll('.breaking-news-date');
let date = new Date();
let day = date.getDate();
if (+day < 10) { day = '0' + day}
let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let month = monthName[+date.getMonth()];
// console.log(month);

breakingNewsDate.forEach(item => {
    item.insertAdjacentHTML("afterbegin", `${day} <br> ${month}`);
});


                // What People Say About theHam

// Cлайдер

new Glide(".glide", {
    type: "carousel",
}).mount();

// Синхронизация фото в слайдах и буллитах

let sliderPhotos = document.querySelectorAll('.slide-photo');
let bullets = document.querySelectorAll('.glide__bullet');
let glideArrows = document.querySelector('.glide__arrows');


let slider = () => {
    let photoQueue = new Map();
    sliderPhotos.forEach((item, i) => {
        if (item.hasAttribute('data-slide-photo')) {
            let photo = item.getAttribute('src');
            let number = item.getAttribute('data-slide-photo');
            photoQueue.set(number, photo);
        }
    });
    bullets.forEach((bullet, i) => {
        let bulletNumber = bullet.getAttribute('data-slide-bullet');
        let pickForBullet = photoQueue.get(`${bulletNumber}`);
        bullet.insertAdjacentHTML('afterbegin', `<img class="custom-bullet-img" src="${pickForBullet}" alt="" />`);
    });
};

slider();



