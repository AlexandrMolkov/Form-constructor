import { propertys, formElements, form } from '../main.js'
import applyPropertys from './applyPropertys.js'
import changeFormInput from './changeFormInput.js'

let autoID = 1;

function reIndex() {
    formElements.forEach((inp, ind) => {
        inp.querySelector('.btn-del').setAttribute('data-index', `${ind}`)
    })
}

export default function createFormInput({ type, place, name, id, label, count, checked, dntMove }, cb) {

    id ? `` : id = `input-${autoID++}`

    const getPlaceholder = () => {
        return place ? `placeholder="${place}"` : ``
    }
    const getName = () => {
        return name ? `${name}` : `${type + id}`
    }


    const div = document.createElement(`div`);
    div.classList.add(`input-group`)
    if (dntMove) div.dataset.dntMove = dntMove

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

    const upBtn = document.createElement(`button`)
    upBtn.classList.add('btn-inp', 'btn-up')
    upBtn.textContent = 'U'
    upBtn.setAttribute('title','move up')
    const dwnBtn = document.createElement(`button`)
    dwnBtn.classList.add('btn-inp', 'btn-dwn')
    dwnBtn.textContent = 'D'
    dwnBtn.setAttribute('title','move down')

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

            delBtn.dataset.target = id
            setBtn.dataset.target = id
            upBtn.dataset.target = id
            dwnBtn.dataset.target = id
        }
    } else {
        
        if (label) {
            div.prepend(createLabel(id, label))
        }

        delBtn.dataset.target = id
        setBtn.dataset.target = id
        upBtn.dataset.target = id
        dwnBtn.dataset.target = id

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
    delBtn.addEventListener('click', e => {
        let moveAvaliableBlocks = 0
        if (form.children) {
            for (let i = 0; i < form.children.length; i++) {
                if (!form.children[i].dataset.dntmove) moveAvaliableBlocks++
            }
        }
        if (moveAvaliableBlocks > 1) {
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
        }

    })
    setBtn.addEventListener('click', e => {
        e.preventDefault()
        changeFormInput(document.querySelector(`#${e.target.dataset.target}`))
    })

    upBtn.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(`#${e.target.dataset.target}`)
        const parent = target.parentElement
        const prevEl = parent.previousElementSibling
        if (!prevEl.dataset.dntmove) {
            prevEl.before(parent)
        } else {
        }

    })
    dwnBtn.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(`#${e.target.dataset.target}`)
        const parent = target.parentElement
        const nextEl = parent.nextElementSibling
        if (!nextEl.dataset.dntmove) {
            nextEl.after(parent)
        } else {
        }

    })

    div.append(delBtn)
    div.append(setBtn)
    div.append(upBtn)
    div.append(dwnBtn)
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