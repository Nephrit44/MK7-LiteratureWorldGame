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
loadQuestions(arrColletion_QLV1, questions__itemsLVL1);
loadQuestions(arrColletion_QLV2, questions__itemsLVL2);

function loadQuestions(arrColletion, htmlElement){
    arrColletion.forEach(element => {
        let liElemenet = document.createElement('li');
        liElemenet.setAttribute('qID', element.questions);
        liElemenet.innerHTML = element.questions;
        liElemenet.classList.add ('questions__item');
        htmlElement.appendChild(liElemenet);
    });
}

