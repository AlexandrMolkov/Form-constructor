"use strict"

///////////////////////////////////////////////////////////////////// Input



class Input {
    constructor(group,target) {
        this.group = document.querySelector(`${group}`)
        this.target = document.querySelector(`${target}`)
    }

    init() {

        const input = this.group.querySelector(`.sidebar-group__input`)
        const property = input.parentNode.querySelector('.select__ul').dataset.property
        const select = this.group.parentNode.querySelector(`.select__input`)

        input.addEventListener(`input`, ()=>{
            this.target.style[property] = input.value + select.value;
        })

        const ul = this.group.querySelector('.select__ul')
            ul.querySelectorAll('.select__li').forEach(li => {
                li.addEventListener('click', e => {
                    this.group.querySelector('#' + ul.dataset.input).value = e.target.dataset.value;
                    this.target.style[ul.dataset.property] = this.group.querySelector(`#` + ul.dataset.target).value + e.target.dataset.value;
                })
            }) 
    }
}