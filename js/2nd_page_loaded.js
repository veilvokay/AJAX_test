document.addEventListener('DOMContentLoaded', () => {
    const formControlTitle = document.querySelector('.form-control-title');
    const formControlContent = document.querySelector('.form-control-content');
    const saveBtn = document.querySelectorAll('.save');

    // cookies
    const cookie = document.cookie;
    const currentID = getCookie('cardID');

    // капиталайз первой буквы
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => response.json())
        .then((response) => {
            // let currentID = getCookie('cardID');
            // console.log(response[currentID - 1]);
            formControlTitle.value = capitalize(response[currentID - 1].title);
            formControlContent.value = capitalize(response[currentID - 1].body);

        })
    
    // Сохранение измененных полей и запись на сервер
    saveBtn.forEach((item) => {
        item.addEventListener('click', e => {
            e.preventDefault();
            fetch(`https://jsonplaceholder.typicode.com/posts/${currentID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: currentID,
                    title: formControlTitle.value,
                    body: formControlContent.value,
                    userId: 5,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    alert('Success')
                    console.log(`New Title: '${formControlTitle.value}', New Content: '${formControlContent.value}'`);
                });
        })
    })
   
    
        




    function getCookie(name) {
        const regEx = new RegExp(`${name}=(.+?)(;|$)`, 'i');
        return cookie.match(regEx)[1];
    }
})

