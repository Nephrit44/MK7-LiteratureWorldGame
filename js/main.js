const header = document.querySelector('.header');
const header__button = document.querySelector('.header__button');
const questions = document.querySelector('.questions');
const questions__itemsLVL1 = document.querySelector('.questions__items-lvl1');
const questions__itemsLVL2 = document.querySelector('.questions__items-lvl2');
const questions__itemsLVL3 = document.querySelector('.questions__items-lvl3');
const soundFail = document.querySelector('.soundFail');
const soundAvation = document.querySelector('.soundAvation');
const videoFail = document.querySelector('.videoFail');
const modal__img = document.querySelector('.modal__img');
const modalAnswer = document.querySelector('.modalAnswer');

const modalAnswer__closeBtn = document.querySelector('.modalAnswer__closeBtn');
const modalQuestion = document.querySelector('.modalQuestion');

const modal__list = document.querySelector('.modal__list');
const fireworkElement = document.querySelector('#fireworks-canvas');

header__button.addEventListener('click', function () {
    header.classList.toggle('visible');
    questions.classList.toggle('visible');
});

//Функция закрытия модальных окон
function closeModal(modalWindow) {
    modalWindow.classList.toggle('visible');
}

//Закрыть окно с вопросом
modalAnswer__closeBtn.addEventListener('click', function () {
    startFireworks(false); //тормозим фейрверк
    closeModal(modalAnswer);
    closeModal(modalQuestion);
});


//Загрузка списка вопросов № 1
loadQuestions(arrColletion, questions__itemsLVL1, 1);
loadQuestions(arrColletion, questions__itemsLVL2, 2);
loadQuestions(arrColletion, questions__itemsLVL3, 3);

//Функция вывода списка вопросов в виде квадратов
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

//Слушатель нажатия на элементы отображаемые на экране
document.addEventListener('click', function (e) {
    //Обработка вызова вопроса
    if (e.target.classList.contains('questions__item')) {
        e.target.classList.add('hide');
        readQuestions(e.target.getAttribute('db'), e.target.getAttribute('qID'));
    };
    //Обработка нажатия на правильный ответ
    if (e.target.hasAttribute('answercorrect')) {
        showCorrectAnswer(e.target.getAttribute('lvl'), e.target.getAttribute('qid'), e.target.getAttribute('answercorrect'), true);
    }
    //Обработка нажатия на не правльный ответ
    if (e.target.classList.contains('modalQuestion__item') && e.target.hasAttribute('answercorrect') == false) {
        showCorrectAnswer(e.target.getAttribute('lvl'), "fail", "Промах", false);

    }
})


//Функция вывод правильного ответа
function showCorrectAnswer(lvl, IMG, textContent, answerSrtatus) {
    modalAnswer.querySelector('.modalAnswer__img').src = `./images/lvl${lvl}/${IMG}.webp`;
    modalAnswer.querySelector('.modalAnswer_title').textContent = textContent;
    modalAnswer.classList.toggle('visible');
    if (answerSrtatus == true) {
        soundAvation.play(); //Проигрываем звук
        startFireworks(true); //Запускаем фейрверк
        videoFail.classList.add('visible');
        modal__img.style.height = "60%";
    } else {
        startFireworks(false); //Запускаем фейрверк
        videoFail.classList.remove('visible');
        modal__img.style.height = "20%";
        videoFail.play();
    }
}

//Функция проверки, что нажата именно кнопка с вопросом
function readQuestions(dataBase, redID) {

    arrColletion.forEach(element => {
        if (element.questions__db == dataBase && element.questions == redID) {
            modalQuestion.classList.toggle('visible');
            modalQuestion.querySelector('.modalQuestion__subtitle').textContent = `Вопрос: ${element.questions}`;
            modalQuestion.querySelector('.modalQuestion_title').textContent = element.questions__text;
            modalQuestion.querySelector('.modalQuestion__item1').textContent = element.questions__answer1;
            modalQuestion.querySelector('.modalQuestion__item1').setAttribute('lvl', element.questions__db)
            modalQuestion.querySelector('.modalQuestion__item2').textContent = element.questions__answer2;
            modalQuestion.querySelector('.modalQuestion__item2').setAttribute('lvl', element.questions__db)
            modalQuestion.querySelector('.modalQuestion__item3').textContent = element.questions__answerCorrect;
            modalQuestion.querySelector('.modalQuestion__item3').setAttribute('answerCorrect', element.questions__nonte)
            modalQuestion.querySelector('.modalQuestion__item3').setAttribute('qid', element.questions)
            modalQuestion.querySelector('.modalQuestion__item3').setAttribute('lvl', element.questions__db)
        }
    });
    randomizer();
}

//Функция перемешивания ответов
function randomizer() {

    for (let i = modal__list.children.length; i >= 0; i--) {
        modal__list.appendChild(modal__list.children[Math.random() * i | 0]);
    }
}

//Анимация фейерверка
function startFireworks(action) {
    if (action == true) {
        firework.start();
        fireworkElement.style.removeProperty('display');
    }
    if (action == false) {
        fireworkElement.style.setProperty('display', 'none');
        firework.stop();
    }

}

let firework = JS_FIREWORKS.Fireworks({
    id: 'fireworks-canvas',
    hue: 120,
    particleCount: 50,
    delay: 0,
    minDelay: 20,
    maxDelay: 40,
    boundaries: { // of respawn and target
        top: 50,
        bottom: 240,
        left: 50,
        right: 590
    },
    fireworkSpeed: 2,
    fireworkAcceleration: 1.05,
    particleFriction: .95,
    particleGravity: 1.5
});

