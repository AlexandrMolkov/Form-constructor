"use strict"



function changeColor(input,target) {
    const colorInput = document.querySelector(input)
    const targetElement = document.querySelector(target)
    colorInput.addEventListener(`input`,()=>{
        targetElement.style.color = colorInput.value;
    })
}
function changeBackgroundColor(input,target) {
    const colorInput = document.querySelector(input)
    const targetElement = document.querySelector(target)
    colorInput.addEventListener(`input`,()=>{
        targetElement.style.backgroundColor = colorInput.value;
    })
}

///////////////////////////////////////////////////////////////////// Form Color

/* const formCol = document.querySelector(`#formCol`)

formCol.addEventListener(`input`,()=>{
    console.log(form)
    form.style.backgroundColor = formCol.value;
}) */


changeBackgroundColor('#formCol','.form') 


///////////////////////////////////////////////////////////////////// Form Title

const formTitle = document.querySelector(`#formTitle`)
const formText = document.querySelector(`.form__text`)

document.querySelector(`#formTitle`).addEventListener(`input`,()=>{
    const formTitle = document.querySelector(`#formTitle`)
    const formText = document.querySelector(`.form__text`)
    formText.innerText = formTitle.value;
})



