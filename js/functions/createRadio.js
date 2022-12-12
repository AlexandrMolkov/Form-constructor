import createFormInput from './createFormInput.js'

export default function createRadio() {
    const createWindow = document.querySelector('.create-radio')
    const createForm = createWindow.querySelector(`.window-create__form`)

    createWindow.classList.add(`visible`)

    const type = 'radio'
    const count = createWindow.querySelector(`#input-count`).value
    const name = createWindow.querySelector(`#input-name`).value


    if (count) {
        const id = []
        const label = []
        const set = new Set()
        for (let i = 0; i < count; i++) {
            const val = createWindow.querySelector(`#input-id-${i}`).value
            id.push(val)
            set.add(val)
        }
        if (id.length != set.size) {
            alert('error')
        } else {
            console.log('succes')
            for (let i = 0; i < count; i++) {
                label.push(createWindow.querySelector(`#input-label-${i}`).value)
            }
            createFormInput({ type, name, id, label, count }, () => {

                createForm.reset()
                createWindow.classList.remove(`visible`)
            })
        }
    } else {
        const id = createWindow.querySelector(`#input-id-0`).value
        const label = createWindow.querySelector(`#input-label-0`).value
        createFormInput({ type, name, id, label, count }, () => {
            createForm.reset()
            createWindow.classList.remove(`visible`)
        })

    }
}