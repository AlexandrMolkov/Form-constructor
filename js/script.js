"use strict"

import { propertys, form, formElements } from "./main.js"
import { addInputButton, addRadioButton, addCheckboxButton } from "./sidebar.js"
import "./newInputPopup.js"
import "./outCode.js"
import createFormInput from "./functions/createFormInput.js"
import applyPropertys from "./functions/applyPropertys.js"
import addNewInput from "./functions/addNewInput.js"
import createRadioForm from "./functions/createRadioForm.js"
import addNewRadio from "./functions/addNewRadio.js"
import createCBForm from "./functions/createCBForm.js"
import addNewCheckbox from "./functions/addNewCheckbox.js"
import createSubmitButton from "./functions/createSubmitButton.js"
import createExitButton from "./functions/createExitButton.js"



///////////////////////////////////////////////////////////////////// menu Anim

const checkHidden = (element) => {
    if (element.classList.contains('form-settings_hidden')) {
        element.style.marginTop = -element.offsetHeight + 'px'
        element.style.zIndex = '1'
    }

    if (element.classList.contains('form-settings_visible')) {
        element.style.marginTop = 0
        element.style.zIndex = '2'
    }
}

document.querySelectorAll('.form-settings')
    .forEach((el) => {
        el.parentElement.querySelectorAll('.form-settings__wrapper')
            .forEach(element => {
                checkHidden(element)

            });
        el.addEventListener('click', (e) => {
            e.target.parentElement.querySelectorAll('.form-settings__wrapper')
                .forEach(element => {
                    element.classList.toggle('form-settings_hidden')
                    element.classList.toggle('form-settings_visible')
                    checkHidden(element)

                });
        })
    })




///////////////////////////////////////////////////////////////////// Init


applyPropertys(form, propertys.formPropertys)
applyPropertys(form.querySelector('.form__text'), propertys.formTextPropertys)





document.querySelector('.wrapper').append(createRadioForm())
document.querySelector('.wrapper').append(createCBForm())

///////////////////////////////////////////////////////////////////// 

addInputButton.addEventListener(`click`, addNewInput)

addRadioButton.addEventListener(`click`, addNewRadio)

addCheckboxButton.addEventListener(`click`, addNewCheckbox)








createFormInput({ type: 'text', place: ':)', name: 'smile' })
createSubmitButton('submit', 'SUBMIT')
createExitButton()







function addNewElement() {
    elements[id] = form.querySelector(`#${id}`)
}



//////////   simplebar

/* const simplebar = document.createElement('div')
simplebar.setAttribute('data-simplebar','')
sidebar.append(simplebar)

new SimpleBar(document.getElementById('scroll'),{
    autoHide: false
});

const simplebarOutCode = document.createElement('div')
simplebarOutCode.setAttribute('data-simplebar','')
document.querySelector('.code__out').append(simplebarOutCode)

new SimpleBar(document.getElementById('codeout'),{
    autoHide: false
}); */

/* document.querySelectorAll('.scroll').forEach(e => {
    new SimpleBar(e,{
        autoHide: false
    });
})  */