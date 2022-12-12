export let formWrapper
export let form

export default function createRadioForm() {
    formWrapper = document.createElement('div')
    const radioInputsWrapper = document.createElement('div')
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
        { id: 'input-label', text: 'Label', required: true },
        { id: 'input-checked', text: 'Checked', type: 'checkbox' }
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
        input.setAttribute('required', '')
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
            p.classList.add('radio-number')
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
                if (inputs[j]?.required) input.setAttribute('required', '')
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

        form.append(inputGroup)
    }

    return formWrapper
}