import { propertys, form } from '../main.js'

export default function createSubmitButton(type, btnText) {
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
