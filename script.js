// Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью 
// этой функции API VK. Виджет должен иметь фиксированные размеры и возможность
// прокрутки. При прокрутке содержимого виджета до конца должны подгружаться 
// новые посты. Необходимо реализовать возможность кэширования уже загруженных
// данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет
// должен отображать все загруженные ранее данные (новые данные должны 
// подгружаться из учетом уже загруженных ранее).
//При переполнении localStorage, данные, загруженные
// последними должны вытеснять данные загруженные первыми.

//создала константы для отображения карточек на странице
const elementTemplate = document.querySelector('#element-template').content;;
const list = document.querySelector('.elements__list');
//переменная, в которую будут попадать данные массива
let array = [];
//солбек функция, которая вызывается при запросе данных с сервера
function callbackFunc(result) {
    //функция, которая возращает массив, если в локал стор есть данные 
    getItems('items');
    result.response.items.forEach((item) => {
        //сначала добавим в массив элементы
        //если айди элемента и айди элемента из общего массива не совпадают,
        //то происходит вставка элементов в массив
        if (item.id !== array[item]?.id) {
            array.push(item);
        } //вставка элементов на страницу
        list.append(createElement(item))
    });
}
//функция создания тега скрипт, для вызова запроса к апи
function getCards(arr) {
    let script = document.createElement("SCRIPT");
    script.src =
        `https://api.vk.com/method/wall.get?access_token=6a87bdcd6a87bdcd6a87bdcdce6991d56f66a876a87bdcd0fd86c43dbdf8faa2876c4b7&owner_id=-135565283&filter=all&count=10&offset=${arr}&v=5.126&callback=callbackFunc`;
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}
//создала функцию с замыканием, в которой вызывается функция запроса данных
function getRes() {
    return function () {
        return getCards(array.length);
    }
}
//создаем замыкание
const response = getRes();
//вызываем функцию
response();
//функция создания клонированной карточки
function createElement(card) {
    const elementsClone = elementTemplate.querySelector('.element').cloneNode(true); //клонируем блок
    elementsClone.querySelector('.element__item').textContent = card.text;
    elementsClone.querySelector('.element__like');
    const likeAmout = elementsClone.querySelector('.element__amount-likes');
     likeAmout.textContent = card.likes.count;
     //если в карточке есть раздел данных с фото, то будет отображаться этот элемент в разметке
    if (card.attachments.length !== 0) {
        elementsClone.querySelector('.element__img').src = card.attachments[0].photo.sizes[1].url;
    }

    return elementsClone;
};

//Реализовать функцию подсчета объема памяти занимаемого данными
//  в LocalStorage для предыдущей задачи. При изменении данных в
//   localStorage в консоль должен выводиться объем занятой памяти
//    / максимальный размер 	хранилища. 
// добавила слушатель скролла на контейнер
list.addEventListener("scroll", () => {
    //при приближении к концу контейнера будут запрашиваться новые данные
    if (list.scrollHeight - list.scrollTop < 400) {
        response();
        //если локал стор существует, то в него будут записывать данные массива
        if (localStorage){
        try {
            localStorage.setItem('items', JSON.stringify(array)); 
        }   //иначе, отобразится объем занятой памяти
        catch (e) { {
            let amountOfMemoryUsed = JSON.stringify(localStorage).length;
            console.log(`Объем занятой памяти ${amountOfMemoryUsed}Kб`);
        }
    }
}
}
});

//реализация кеширования загруженных данных 
function getItems(key) {
    //если в хранилище уже есть ключ, то добавлявляем в массив значения из хранилища 
    if (localStorage.getItem(key)) {
        array.push(JSON.parse(localStorage.getItem(key)));
    }
}

