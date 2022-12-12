import createFormInput from './createFormInput.js'
import { formWrapper as createWindow, form as createForm } from './createCBForm.js'

export default function addNewRadio() {

    createWindow.classList.add(`visible`)

    createForm.addEventListener(`submit`, createRadioInput)
}

function createRadioInput(e) {
    e.preventDefault();
    const type = 'checkbox'
    const name = createWindow.querySelector(`#input-name`).value
    console.log('else')
    const id = createWindow.querySelector(`#input-id`).value
    const label = createWindow.querySelector(`#input-label`).value
    const checked = createWindow.querySelector(`#input-checked`).checked
    createFormInput({ type, name, id, label, checked }, () => {

        createForm.reset()
        createWindow.classList.remove(`visible`)

    })
    createForm.removeEventListener(`submit`, createRadioInput)

}