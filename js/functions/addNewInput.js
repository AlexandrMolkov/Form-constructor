import createFormInput from './createFormInput.js'

export default function addNewInput() {

    const createWindow = document.querySelector(`.window-create`)
    const createForm = createWindow.querySelector(`.window-create__form`)

    createWindow.classList.add(`visible`)

    createForm.addEventListener(`submit`, (e) => {

        e.preventDefault();
        const type = createWindow.querySelector(`.window-create__select`).value
        const place = createWindow.querySelector(`#input-placeholder`).value
        const name = createWindow.querySelector(`#input-name`).value
        const id = createWindow.querySelector(`#input-id`).value
        const label = createWindow.querySelector(`#input-label`).value
        console.log(label)
        createFormInput({ type, place, name, id, label }, () => {
            createForm.reset()
            createWindow.classList.remove(`visible`)
        })



    }, { once: true })
}
