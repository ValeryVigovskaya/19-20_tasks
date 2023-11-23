// Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью 
// этой функции API VK. Виджет должен иметь фиксированные размеры и возможность
// прокрутки. При прокрутке содержимого виджета до конца должны подгружаться 
// новые посты. Необходимо реализовать возможность кэширования уже загруженных
// данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет
// должен отображать все загруженные ранее данные (новые данные должны 
// подгружаться из учетом уже загруженных ранее).

let script = document.createElement("SCRIPT");
script.src =
    `https://api.vk.com/method/wall.get?access_token=6a87bdcd6a87bdcd6a87bdcdce6991d56f66a876a87bdcd0fd86c43dbdf8faa2876c4b7&owner_id=-73247559&count=10&offset=0&v=5.126&callback=callbackFunc`;
document.getElementsByTagName("head")[0].appendChild(script);
function callbackFunc(result) {
    console.log(result.response.items)
}


