import createFormInput from './createFormInput.js'
import { formWrapper as createWindow, form as createForm } from './createRadioForm.js'

export default function addNewRadio() {

    /* const createWindow = document.querySelector('.create-radio')
    const createForm = createWindow.querySelector(`.window-create__form`) */

    createWindow.classList.add(`visible`)
    createForm.querySelector('#input-count').value = 2

    createForm.addEventListener(`submit`, createRadioInput)
}

function createRadioInput(e) {
    e.preventDefault();
    console.log(`submit`)
    const type = 'radio'
    const count = createWindow.querySelector(`#input-count`).value
    const name = createWindow.querySelector(`#input-name`).value

    if (count) {
        console.log('if')
        const id = []
        const label = []
        const checked = []
        const set = new Set()
        for (let i = 0; i < count; i++) {
            const val = createWindow.querySelector(`#input-id-${i}`).value
            id.push(val)
            set.add(val)
        }
        if (id.length != set.size) {
            alert('error: double id')
        } else {
            for (let i = 0; i < count; i++) {
                label.push(createWindow.querySelector(`#input-label-${i}`).value)
                checked.push(createWindow.querySelector(`#input-checked-${i}`).checked)
            }
            createFormInput({ type, name, id, label, count, checked }, () => {
                createForm.reset()
                createWindow.classList.remove(`visible`)
            })
            createForm.removeEventListener(`submit`, createRadioInput)

        }
    } else {
        console.log('else')
        const id = createWindow.querySelector(`#input-id-0`).value
        const label = createWindow.querySelector(`#input-label-0`).value
        createFormInput({ type, name, id, label, count }, () => {

            createForm.reset()
            createWindow.classList.remove(`visible`)

        })
        createForm.removeEventListener(`submit`, createRadioInput)

    }
}