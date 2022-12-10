import { propertys, form, autoId, formElements } from "./main.js"
import { addInputButton, addRadioButton, addCheckboxButton } from "./sidebar.js"
import "./newInputPopup.js"
import "./outCode.js"


"use strict"

let autoID = autoId



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




for (let property in propertys.formPropertys) {
    form.style[property] = propertys.formPropertys[property]
}

for (let property in propertys.formTextPropertys) {

    form.querySelector('.form__text')
        .style[property] = propertys.formTextPropertys[property]
}

///////////////////////////////////////////////////////////////////// 

addInputButton.addEventListener(`click`, addNewInput)

addRadioButton.addEventListener(`click`, () => {
    addNewRadio()
    /* createFormInput('radio', 'radio') */
})

addCheckboxButton.addEventListener(`click`, () => {
    createFormInput('checkbox', 'checkbox')
})


function setInputStyle(input) {
    for (let property in propertys.inputsPropertys) {
        input.style[property] = propertys.inputsPropertys[property]
    }
}


function reIndex() {
    formElements.forEach((inp, ind) => {
        inp.querySelector('.btn-del').setAttribute('data-index', `${ind}`)
    })
}

function addNewInput() {

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
        createFormInput(type, place, name, id, label)

        createForm.reset()
        createWindow.classList.remove(`visible`)

    }, { once: true })
}
function createRadioForm() {
    const formWrapper = document.createElement('div')
    const radioInputsWrapper = document.createElement('div')
    const form = document.createElement('form')
    form.addEventListener(`submit`, (e) => {
        e.preventDefault();
    })

    formWrapper.classList.add('window-create', 'create-radio')
    form.classList.add('window-create__form')
    form.id = 'createRadioForm'
    formWrapper.append(form)

    const inputs = [
        { id: 'input-id', text: 'Id' },
        { id: 'input-label', text: 'Label' },
        { id: 'input-checked', text: 'Checked', type: 'radio' }
    ]

    let radioCount = 2

    {
        const inputGroup = document.createElement('div')
        inputGroup.classList.add('window-create__group')
        const label = document.createElement('label')
        label.classList.add('window-create__label')
        label.innerText = 'Count'
        const input = document.createElement('input')
        input.classList.add('window-create__input')
        input.id = 'input-count'
        input.type = 'number'
        input.value = radioCount
        input.min = 2
        inputGroup.append(label)
        inputGroup.append(input)
        form.append(inputGroup)

        input.addEventListener('input', () => {
            radioCount = input.value
            renderInputs()
        })
    }
    {
        const inputGroup = document.createElement('div')
        inputGroup.classList.add('window-create__group')
        const label = document.createElement('label')
        label.classList.add('window-create__label')
        label.innerText = 'Name'
        const input = document.createElement('input')
        input.classList.add('window-create__input')
        input.id = 'input-name'
        input.type = 'text'
        inputGroup.append(label)
        inputGroup.append(input)
        form.append(inputGroup)
    }

    form.append(radioInputsWrapper)

    function renderInputs() {
        radioInputsWrapper.innerHTML = ''

        for (let i = 0; i < radioCount; i++) {
            const p = document.createElement('p')
            p.innerText = 'radio: ' + (i + 1)
            radioInputsWrapper.append(p)
            for (let j = 0; j < inputs.length; j++) {
                const inputGroup = document.createElement('div')
                inputGroup.classList.add('window-create__group')
                const label = document.createElement('label')
                label.classList.add('window-create__label')
                label.innerText = inputs[j].text
                const input = document.createElement('input')
                input.classList.add('window-create__input')
                input.id = inputs[j].id + '-' + i
                input.type = inputs[j].type ? inputs[j].type : 'text'
                inputGroup.append(label)
                inputGroup.append(input)

                radioInputsWrapper.append(inputGroup)

            }
        }
    }

    renderInputs()

    // buttons

    {
        const inputGroup = document.createElement('div')
        inputGroup.classList.add('window-create__group')
        const inputSubm = document.createElement('button')
        inputSubm.classList.add('window-create__btn', 'btn')
        inputSubm.type = 'submit'
        inputSubm.innerText = 'Confirm'
        inputGroup.append(inputSubm)

        const inputCancel = document.createElement('button')
        inputCancel.classList.add('window-create__btn', 'btn')
        inputCancel.type = 'button'
        inputCancel.innerText = 'Exit'
        inputGroup.append(inputCancel)

        inputCancel.addEventListener('click', () => { formWrapper.classList.remove('visible') })
        inputSubm.addEventListener('click', createRadio)

        form.append(inputGroup)
    }

    return formWrapper
}

document.querySelector('.wrapper').append(createRadioForm())

function addNewRadio() {

    const createWindow = document.querySelector('.create-radio')
    const createForm = createWindow.querySelector(`.window-create__form`)

    createWindow.classList.add(`visible`)

    createForm.addEventListener(`submit`, (e) => {
        e.preventDefault();

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
                alert('error: double id')
            } else {
                console.log('succes')
                for (let i = 0; i < count; i++) {
                    label.push(createWindow.querySelector(`#input-label-${i}`).value)
                }
                createFormInput(type, null, name, id, label, count)
                createForm.reset()

                createForm.querySelector(`.input-count`).formDefault()

                createWindow.classList.remove(`visible`)
            }
        } else {
            const id = createWindow.querySelector(`#input-id-0`).value
            const label = createWindow.querySelector(`#input-label-0`).value
            createFormInput(type, null, name, id, label, count)
            createForm.reset()
            createWindow.classList.remove(`visible`)
        }

        /* 
                
        
                if (count) {
                    label = []
                    id = []
                    for (let i = 0; i < count; i++) {
                        label.push(createWindow.querySelector(`#input-label-${i}`).value)
                        id.push(createWindow.querySelector(`#input-id-${i}`).value)
                    }
                } else {
                    id = createWindow.querySelector(`#input-id-0`).value
                    label = createWindow.querySelector(`#input-label-0`).value
                }
                createFormInput(type, null, name, id, label, count)
                createForm.reset()
                createWindow.classList.remove(`visible`)
         */
    }, { once: true })
}

function createRadio() {
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
            createFormInput(type, null, name, id, label, count)
            createForm.reset()
            createWindow.classList.remove(`visible`)
        }
    } else {
        const id = createWindow.querySelector(`#input-id-0`).value
        const label = createWindow.querySelector(`#input-label-0`).value
        createFormInput(type, null, name, id, label, count)
        createForm.reset()
        createWindow.classList.remove(`visible`)
    }
}


createFormInput("text", ":)")
createSubmitButton('submit', 'SUBMIT')
createExitButton()

function createExitButton() {
    const btn = document.createElement(`button`)
    btn.classList.add('btn', 'btnExt')
    btn.textContent = 'X'
    form.append(btn)

    for (let property in propertys.btnExitProperty) {
        btn.style[property] = propertys.btnExitProperty[property]
    }
    btn.addEventListener('mouseover', () => {
        for (let property in propertys.btnExitPropertyHover) {
            btn.style[property] = propertys.btnExitPropertyHover[property]
        }
    })
    btn.addEventListener('mouseout', () => {
        for (let property in propertys.btnExitPropertyHover) {
            btn.style[property] = propertys.btnExitProperty[property]
        }
    })
    btn.addEventListener('click', (e) => {
        e.preventDefault()
    })
}

function createSubmitButton(type, btnText) {
    const div = document.createElement(`div`)
    div.classList.add(`input-group`)
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    const btn = document.createElement(`button`)
    btn.classList.add('btnSubm')
    const span = document.createElement(`span`)
    span.textContent = btnText
    /*  btn.textContent = btnText */
    btn.append(span)
    btn.type = type

    for (let property in propertys.btnSubmitProperty) {
        btn.style[property] = propertys.btnSubmitProperty[property]
    }
    btn.addEventListener('mouseover', () => {
        for (let property in propertys.btnSubmitPropertyHover) {
            btn.style[property] = propertys.btnSubmitPropertyHover[property]
        }
        for (let property in propertys.btnSubmitTextPropertyHover) {
            btn.firstChild.style[property] = propertys.btnSubmitTextPropertyHover[property]
        }

    })
    btn.addEventListener('mouseout', () => {
        for (let property in propertys.btnSubmitProperty) {
            btn.style[property] = propertys.btnSubmitProperty[property]
        }
        for (let property in propertys.btnSubmitTextProperty) {
            btn.firstChild.style[property] = propertys.btnSubmitTextProperty[property]
        }
    })
    btn.addEventListener('click', (e) => {
        e.preventDefault()
    })

    div.append(btn)
    form.append(div)

    return div
}

function createFormInput(typeInput, placeInput, nameInput, idInput, label, count) {

    const type = typeInput
    const place = placeInput
    const name = nameInput
    let id = idInput

    id ? `` : id = `input-${autoID++}`

    const getPlaceholder = () => {
        return place ? `placeholder="${place}"` : ``
    }
    const getName = () => {
        return name ? `name="${name}"` : `name="${type}"`
    }


    const div = document.createElement(`div`);
    div.classList.add(`input-group`)

    for (let property in propertys.inputGroupPropertys) {
        div.style[property] = propertys.inputGroupPropertys[property]
    }


    // кнопка удаления инпута
    const delBtn = document.createElement(`button`)
    delBtn.classList.add(`btn-del`)
    delBtn.textContent = 'X'
    delBtn.setAttribute('title', 'delete input')


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
            /* input.placeholder = getPlaceholder() */
            input.id = id[i]
            div.append(input)
            div.classList.add(`interact`)

            for (let property in propertys.inputsPropertys) {
                input.style[property] = propertys.inputsPropertys[property]
            }
        }
    } else {

        if (label) {
            div.prepend(createLabel())
        }

        div.innerHTML += `<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`
        div.classList.add(`interact`)
        const newInp = div.querySelector('input')

        for (let property in propertys.inputsPropertys) {
            newInp.style[property] = propertys.inputsPropertys[property]
        }
    }



    delBtn.setAttribute('data-index', `${formElements.length}`)
    delBtn.addEventListener('click', (e) => {
        e.preventDefault()

        formElements[e.target.dataset.index].remove()
        formElements.splice(e.target.dataset.index, 1)
        reIndex()

    })
    div.append(delBtn)
    const inputs = form.querySelectorAll('.input')
    if (inputs.length > 0) inputs[inputs.length - 1].parentNode.after(div)
    else { form.append(div) }

    setInputStyle(div.querySelector('.input'))

    formElements.push(div)

    return div
}


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