const header = document.querySelector('.header');
const header__button = document.querySelector('.header__button');
const questions = document.querySelector('.questions');
const questions__itemsLVL1 = document.querySelector('.questions__items-lvl1');
const questions__itemsLVL2 = document.querySelector('.questions__items-lvl2');


header__button.addEventListener('click', function () {
    header.classList.toggle('visible');
    questions.classList.toggle('visible');
});

//Загрузка списка вопросов № 1
loadQuestions(arrColletion, questions__itemsLVL1, 1);
loadQuestions(arrColletion, questions__itemsLVL2, 2);

function loadQuestions(arrColletion, htmlElement, database) {
    arrColletion.forEach(element => {
        if (element.questions__db == database) {
            let liElemenet = document.createElement('li');
            liElemenet.setAttribute('qID', element.questions);
            liElemenet.setAttribute('db', element.questions__db);
            liElemenet.innerHTML = element.questions;
            liElemenet.classList.add('questions__item');
            htmlElement.appendChild(liElemenet);
        }
    });
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('questions__item')) {
        readQuestions(e.target.getAttribute('db'), e.target.getAttribute('qID'));
    }
})


function readQuestions(dataBase, redID) {

    arrColletion.forEach(element => {
        if (element.questions__db == dataBase && element.questions == redID){
            console.log(element)
        }
    });
}
