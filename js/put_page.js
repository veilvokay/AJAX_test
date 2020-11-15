document.addEventListener('DOMContentLoaded', () => {
    // VARIABLES
    const goToEditPage = document.querySelectorAll('.edit');
    // const goToEditArr = Array.from(goToEditPage);
    // console.log(goToEditArr);
    
    // По нажатию на кнопку редактировать записывается ID данной карты в cookie
    goToEditPage.forEach((item) => {
        item.addEventListener('click', e => {
            // alert('hi');
            let currentId = item.parentNode.parentNode.dataset.id;
            // console.log(currentId);
            document.cookie = `cardID=${currentId}`;
        })
    })

})