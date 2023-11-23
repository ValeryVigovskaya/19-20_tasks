// Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью 
// этой функции API VK. Виджет должен иметь фиксированные размеры и возможность
// прокрутки. При прокрутке содержимого виджета до конца должны подгружаться 
// новые посты. Необходимо реализовать возможность кэширования уже загруженных
// данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет
// должен отображать все загруженные ранее данные (новые данные должны 
// подгружаться из учетом уже загруженных ранее).

//сервисный ключ
//24dece8124dece8124dece81ef27c8a92c224de24dece814181a7b4f44931cbdba359da

//https://vk.com/wall-73247559?own=1


//https://oauth.vk.com/authorize?client_id=51800017&display=page&redirect_url=http://127.0.0.1:5500/index.html/&scope=wall&response_type=token&v=5.199&state=123456
// window.location.href = 'auth.html';
// window.open("https://oauth.vk.com/authorize?client_id=51800017&display=page&redirect_uri=http://127.0.0.1:5500/index.html&scope=wall&response_type=token&v=5.199&state=123456");
// function request(url, options) {
//     // принимает два аргумента: урл и объект опций, как и `fetch`
//     return fetch(url, options).then(checkResponse)
//   }

// const config = {
//   baseUrl: 'https://api.vk.com/method/wall.get?access_token=24dece8124dece8124dece81ef27c8a92c224de24dece814181a7b4f44931cbdba359da&owner_id=-73247559&count=10&offset=0&v=5.126',
//   headers: {
//     // authorization: '5677928b-be8e-49ee-ae63-e0ec29ade066',
//     'Content-Type': 'application/json'
//   }
// }


// const getUserInfo = () => {
//   return request(`${config.baseUrl}`, {
//     headers: config.headers
//   })
// }

// //промисом получили данные с сервера
// Promise.all([getUserInfo()])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль, если запрос неуспешный
//   });



export const fetchWithRefresh = async (
    options
  ) => {
    try {
      const res = await fetch("https://oauth.vk.com/authorize?client_id=51800017&display=page&redirect_uri=https://valeryvigovskaya.github.io/19-20_tasks/index.html&scope=wall&response_type=token&v=5.199&state=123456", options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch("https://oauth.vk.com/authorize?client_id=51800017&display=page&redirect_uri=https://valeryvigovskaya.github.io/19-20_tasks/index.html&scope=wall&response_type=token&v=5.199&state=123456", options); //повторяем запрос
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  const getUser = () => {
    return fetchWithRefresh({
      method: "GET",
      headers: {
        authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json;charset=utf-8",
      }
    });
  };

  const getUserFetch = () => {
      getUser()
      .then((res) => {
        res.user;
      });
  };

  getUserFetch()