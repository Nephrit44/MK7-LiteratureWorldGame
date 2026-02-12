const header = document.querySelector('.header');
const header__button = document.querySelector('.header__button');
const questions = document.querySelector('.questions');
const questions__itemsLVL1 = document.querySelector('.questions__items-lvl1');

header__button.addEventListener('click', function () {
    header.classList.toggle('visible');
    questions.classList.toggle('visible');
});

//Загрузка списка вопросов № 1
loadQuestions(arrColletion);


function loadQuestions(arrColletion){
    arrColletion.forEach(element => {
        let liElemenet = document.createElement('li');
        liElemenet.setAttribute('qID', element.questions);
        liElemenet.innerHTML = element.questions;
        liElemenet.classList.add ('questions__item');
        questions__itemsLVL1.appendChild(liElemenet);
    });
}

