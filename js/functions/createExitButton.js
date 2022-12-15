import { propertys, form } from '../main.js'

export default function createExitButton() {
    const btn = document.createElement(`button`)
    btn.classList.add('btn', 'btnExt')
    btn.textContent = 'X'
    btn.dataset.dntmove = 'true'
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