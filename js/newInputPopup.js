"use strict"

const windowCreate = document.createElement('div')
windowCreate.classList.add('window-create')
const newInputForm = document.createElement('form')
newInputForm.classList.add('window-create__form')
windowCreate.append(newInputForm)

function group() {
    const groupDiv = document.createElement('div')
    groupDiv.classList.add('window-create__group')
    return groupDiv
} 


{
    const label = document.createElement('label')
    label.classList.add('window-create__label')
    label.for = 'text-type-select'
    label.textContent = 'Input type'

    const select = document.createElement('select')
    select.classList.add('window-create__select')
    select.name = "input-type"
    select.id = "text-type-select"
    select.innerHTML = `
        <option value="text" class="window-create_option">text</option>
        <option value="password" class="window-create_option">password</option>
        <option value="email" class="window-create_option">email</option>
        <option value="phone" class="window-create_option">phone</option>
    `

    const res = group()
    res.append(label)
    res.append(select)
    newInputForm.append(res)
}

{
    const label = document.createElement('label')
    label.classList.add('window-create__label')
    label.for = 'input-placeholder'
    label.textContent = 'Placeholder'

    const input = document.createElement('input')
    input.classList.add('window-create__input')
    input.name = "placeholder"
    input.id = "input-placeholder"
    input.type = 'text'


    const res = group()
    res.append(label)
    res.append(input)
    newInputForm.append(res)
}

{
    const label = document.createElement('label')
    label.classList.add('window-create__label')
    label.for = 'input-name'
    label.textContent = 'Name'

    const input = document.createElement('input')
    input.classList.add('window-create__input')
    input.name = "name"
    input.id = "input-name"
    input.type = 'text'


    const res = group()
    res.append(label)
    res.append(input)
    newInputForm.append(res)
}

{
    const label = document.createElement('label')
    label.classList.add('window-create__label')
    label.for = 'input-id'
    label.textContent = 'id'

    const input = document.createElement('input')
    input.classList.add('window-create__input')
    input.name = "id"
    input.id = "input-id"
    input.type = 'text'


    const res = group()
    res.append(label)
    res.append(input)
    newInputForm.append(res)
}

{
    const label = document.createElement('label')
    label.classList.add('window-create__label')
    label.for = 'input-label'
    label.textContent = 'label'

    const input = document.createElement('input')
    input.classList.add('window-create__input')
    input.name = "label"
    input.id = "input-label"
    input.type = 'text'


    const res = group()
    res.append(label)
    res.append(input)
    newInputForm.append(res)
}

{
    const buttonSub = document.createElement('button')
    buttonSub.classList.add('window-create__btn')
    buttonSub.type = 'submit'
    buttonSub.textContent = 'Confirm'

    const buttonRes = document.createElement('button')
    buttonRes.classList.add('window-create__btn')
    buttonRes.type = 'button'
    buttonRes.textContent = 'Cancel'


    const res = group()
    res.append(buttonSub)
    res.append(buttonRes)
    newInputForm.append(res)
}

document.querySelector('.wrapper').append(windowCreate)

