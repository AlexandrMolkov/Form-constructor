"use strict"

///////////////////////////////////////////////////////////////////// Form Color

const formCol = document.querySelector(`#formCol`)

formCol.addEventListener(`input`,()=>{
    form.style.backgroundColor = formCol.value;
})




///////////////////////////////////////////////////////////////////// Form Title

const formTitle = document.querySelector(`#formTitle`)
const formText = document.querySelector(`.form__text`)

document.querySelector(`#formTitle`).addEventListener(`input`,()=>{
    const formTitle = document.querySelector(`#formTitle`)
    const formText = document.querySelector(`.form__text`)
    formText.innerText = formTitle.value;
})




