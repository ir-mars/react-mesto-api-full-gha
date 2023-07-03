const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
};
const baseUrl = 'https://api.ir-mars.nomoreparties.sbs';


//проверка ответа сервера
export const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//загрузка cards с сервера
export const getInitialCards = () => {
    return fetch(`${baseUrl}/cards/`, {
        headers: getHeaders(),
    })
        .then(res => getResponse(res))
}

//получение информации о пользователе с сервера
export const getUserInfo = () => {
    return fetch(`${baseUrl}/users/me`, {
        headers: getHeaders(),
    })
        .then(res => getResponse(res))
}

//изменение профиля
export const sendUserInfo = ({ name, about }) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
            name,
            about,
        }),
    })
        .then(res => getResponse(res))
}

//добавление карточки
export const addCard = ({ name, link }) => {
    return fetch(`${baseUrl}/cards/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => getResponse(res))
}

//удаление карточки
export const deleteCard = (id) => {
    return fetch(`${baseUrl}/cards/` + id, {
        method: 'DELETE',
        headers: getHeaders()
    })
        .then(res => getResponse(res))
}

//добавление или удаление лайка
export const setLike = (id, value) => {
    value = value ? 'DELETE' : 'PUT';
    return fetch(`${baseUrl}/cards/${id}/likes`, {
        method: `${value}`,
        headers: getHeaders()
    })
        .then(res => getResponse(res))
}

export const setAvatar = ({ avatar }) => {
    return fetch(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
            avatar,
        })
    })
        .then(res => getResponse(res))
}
