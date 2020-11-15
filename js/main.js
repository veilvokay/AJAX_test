// variables
document.addEventListener('DOMContentLoaded', () => {

    // ОБЩИЕ ПЕРЕМЕННЫЕ ДЛЯ DOM
    const allCards = document.querySelectorAll('.card');
    const cardImg = document.querySelector('.card img');
    const cardImgAll = document.querySelectorAll('.card img');
    const cardCom = document.querySelector('.card-comments');
    const cardComments = document.querySelectorAll('.card-comments');

    // ВЗЯТЬ 10 ПОСЛЕДНИХ ОБЪЕКТОВ ИЗ МАССИВА
    function returnFromArr(arr) {
        let newArr = [];
        for (let i = 1; i <= 10; i++) {
            newArr.push(arr[arr.length - i])
        }
        return newArr.reverse();
    }

    // ЗАПРОС ДЛЯ УСТАНОВЛЕНИЯ КАРТИНОК
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then((response) => response.json())
        .then((response) => {
            let { thumbnailUrl } = response[0];
            // cardImg.src = thumbnailUrl;
            // console.log(cardImg)

            for (let i = 0; i < allCards.length; i++) {
                allCards[i].children[0].src = thumbnailUrl;

            }
        })

    // капиталайз первой буквы
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ЗАПРОСЫ ДЛЯ САМИХ ПОСТОВ
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((response) => {
            const newResp = response;
            const lastTenPosts = returnFromArr(response);
            // console.log(lastTenPosts)

            
            // ПЕРЕБОР ДЛЯ КАЖДОГО .card
            for (let i = 0; i < allCards.length; i++) {
                // Установка заглавного текста
                allCards[i].children[1].children[0].textContent = capitalize(lastTenPosts[i].title.match(/(\w+\s){2}/gi)[0]);
                
                // Установка наполнения капты
                allCards[i].children[1].children[1].textContent = capitalize(lastTenPosts[i].body.match(/(\w+\s){10}/gi)[0])

                // Добавление id каждой карте из json
                allCards[i].dataset.id = lastTenPosts[i].id;
            }

        });

    // ЗАПРОС И УСТАНОВЛЕНИЕ КОЛИЧЕСТВА КОММЕНТАРИЕВ
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => response.json())
        .then((response) => {
            const lastTenPosts = returnFromArr(response);

            let emptyArr = []
            lastTenPosts.forEach(el => {
                emptyArr.push(el.id);
            });
            // console.log(lastTenPosts)
            // console.log(emptyArr);

            for (let i = 0; i < 10; i++) {
                fetch(`https://jsonplaceholder.typicode.com/posts/${emptyArr[i]}/comments`)
                    .then((response) => response.json())
                    .then((response) => {
                        allCards[i].children[1].children[2].textContent = response.length;
                    })
                    // .then((response) => {})
            }

        })


})