import { propertys, formElements, form } from '../main.js'
import applyPropertys from './applyPropertys.js'
import changeFormInput from './changeFormInput.js'

let autoID = 1;

function reIndex() {
    formElements.forEach((inp, ind) => {
        inp.querySelector('.btn-del').setAttribute('data-index', `${ind}`)
    })
}

export default function createFormInput({ type, place, name, id, label, count, checked }, cb) {

    /*     const type = typeInput
        const place = placeInput
        const name = nameInput
        let id = idInput
     */
    id ? `` : id = `input-${autoID++}`

    const getPlaceholder = () => {
        return place ? `placeholder="${place}"` : ``
    }
    const getName = () => {
        return name ? `${name}` : `${type + id}`
    }


    const div = document.createElement(`div`);
    div.classList.add(`input-group`)

    for (let property in propertys.inputGroupPropertys) {
        div.style[property] = propertys.inputGroupPropertys[property]
    }


    // кнопка удаления инпута
    const delBtn = document.createElement(`button`)
    delBtn.classList.add('btn-del', 'btn-inp')
    delBtn.textContent = 'X'
    delBtn.setAttribute('title', 'delete input')
    // кнопка изменения инпута
    const setBtn = document.createElement(`button`)
    setBtn.classList.add('btn-set', 'btn-inp')
    setBtn.textContent = 'S'
    setBtn.setAttribute('title', 'input settings')

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

    if (count) {
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

        if (label) {
            div.prepend(createLabel(id, label))
        }

        delBtn.dataset.target = id
        setBtn.dataset.target = id

        const input = document.createElement('input')
        input.classList.add('input')
        input.type = type
        input.name = getName()
        if (checked) input.setAttribute('checked', 'checked')
        if (place) input.placeholder = place
        input.id = id
        div.append(input)
        div.classList.add(`interact`)

        for (let property in propertys.inputsPropertys) {
            input.style[property] = propertys.inputsPropertys[property]
        }
    }
    /* delBtn.setAttribute('data-index', `${formElements.length}`) */
    delBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const createConfirm = () => {
            const confirm = document.createElement('form')
            const confirmWrapper = document.createElement('div')
            confirm.classList.add('window-create__form')
            confirmWrapper.classList.add('window-create', 'visible')
            const inpConf = document.createElement('input')
            const inpExit = document.createElement('input')
            const inpGroup = document.createElement('div')
            inpGroup.classList.add('window-create__group')
            inpConf.type = 'submit'
            inpConf.value = 'Confirm'
            inpConf.classList.add('window-create__btn', 'btn')
            inpExit.type = 'button'
            inpExit.value = 'Back'
            inpExit.classList.add('window-create__btn', 'btn')
            inpGroup.append(inpConf)
            inpGroup.append(inpExit)
            confirm.append(inpGroup)
            confirmWrapper.append(confirm)

            confirm.addEventListener('submit', (eSubm) => {
                eSubm.preventDefault()
                e.target.parentNode.remove()
                confirmWrapper.remove()
            })

            inpExit.addEventListener('click', () => {
                confirmWrapper.remove()
            })

            return confirmWrapper
        }
        document.body.append(createConfirm())

        /*  e.target.parentNode.remove() */

        /*         formElements[e.target.dataset.index].remove()
                formElements.splice(e.target.dataset.index, 1)
                reIndex()
         */
    })
    setBtn.addEventListener('click', (e) => {
        e.preventDefault()
        changeFormInput(document.querySelector(`#${e.target.dataset.target}`))
    })


    div.append(delBtn)
    div.append(setBtn)
    const inputs = form.querySelectorAll('.input')

    if (inputs.length > 0) {
        inputs[inputs.length - 1].parentNode.after(div)
    }
    else { form.append(div) }

    applyPropertys(div.querySelector('.input'), propertys.inputsPropertys)

    formElements.push(div)

    if (cb) cb()

    return div
}