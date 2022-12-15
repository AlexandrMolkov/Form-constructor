import { propertys, formElements, form } from '../main.js'

export default function changeFormInput(target) {

    const createWindow = document.querySelector(`.window-create`)
    const createForm = createWindow.querySelector(`.window-create__form`)
    createWindow.classList.add(`visible`)

    const inputType = createWindow.querySelector(`.window-create__select`)
    const inputPlace = createWindow.querySelector(`#input-placeholder`)
    const inputName = createWindow.querySelector(`#input-name`)
    const inputId = createWindow.querySelector(`#input-id`)
    const inputLabel = createWindow.querySelector(`#input-label`)

    // input values
    inputType.value = target.type
    if (target.placeholder) inputPlace.value = target.placeholder
    inputName.value = target.name
    inputId.value = target.id
    if (target.label) inputLabel.value = target.label

    // submit
    createForm.addEventListener(`submit`, (e) => {
        e.preventDefault();

        const type = inputType.value
        const place = inputPlace.value
        const name = inputName.value
        const id = inputId.value
        const label = inputLabel.value

        id ? `` : id = `input-${autoID++}`

        const getPlaceholder = () => {
            return place ? `placeholder="${place}"` : ``
        }
        const getName = () => {
            return name ? `${name}` : `${type + id}`
        }

        // label
        function createLabel(id, label) {
            const inputLabel = document.createElement('label')
            inputLabel.classList.add('label')
            inputLabel.setAttribute('for', id)
            inputLabel.innerText = label
            for (let property in propertys.inputLabelPropertys) {
                inputLabel.style[property] = propertys.inputLabelPropertys[property]
            }
            return inputLabel
        }

        if (/* count */ false) {
            for (let i = 0; i < count; i++) {
                if (label) {
                    div.append(createLabel(id[i], label[i]))
                }
                const input = document.createElement('input')

                input.classList.add('input')
                input.type = type
                input.name = getName()
                if (checked[i]) input.setAttribute('checked', 'checked')
                input.id = id[i]
                div.append(input)
                div.classList.add(`interact`)

                for (let property in propertys.inputsPropertys) {
                    input.style[property] = propertys.inputsPropertys[property]
                }
            }
        } else {

            // label
            const labelElement = target.parentNode.querySelector('label')
            if (label) {
                if (labelElement) {
                    labelElement.innerText = label
                } else {
                    target.parentNode.prepend(createLabel(id, label))
                }
            } else {
                if (labelElement) {
                    labelElement.remove()
                }
            }

            target.type = type
            target.name = getName()
            /* if (checked) target.setAttribute('checked', 'checked') */
            if (place) target.placeholder = place
            target.id = id


        }
        createForm.reset()
        createWindow.classList.remove(`visible`)

    }, { once: true })



}