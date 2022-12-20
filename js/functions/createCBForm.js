export let formWrapper
export let form

export default function createCBForm() {
    formWrapper = document.createElement('div')
    form = document.createElement('form')
    form.addEventListener(`submit`, (e) => {
        e.preventDefault();
    })

    formWrapper.classList.add('window-create', 'create-radio')
    form.classList.add('window-create__form')
    form.id = 'createRadioForm'
    formWrapper.append(form)

    const inputs = [
        { id: 'input-id', text: 'Id', required: true },
        { id: 'input-name', text: 'Name', required: true },
        { id: 'input-label', text: 'Label'},
        { id: 'input-checked', text: 'Checked', type: 'checkbox' }
    ]

    'window-create__group'
    'window-create__label'
    'window-create__input'

    for (let i = 0; i < inputs.length; i++) {
        const inputGroup = document.createElement('div')
        inputGroup.classList.add('window-create__group')

        const label = document.createElement('label')
        label.classList.add('window-create__label')

        label.innerText = inputs[i].text

        const input = document.createElement('input')
        input.classList.add('window-create__input')
        input.id = inputs[i].id
        if (inputs[i].type !== 'text') input.type = inputs[i].type

        if (inputs[i]?.required) input.setAttribute('required', '')

        inputGroup.append(label)
        inputGroup.append(input)

        form.append(inputGroup)

    }



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

        form.append(inputGroup)
    }

    return formWrapper
}