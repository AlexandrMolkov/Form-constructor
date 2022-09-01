"use strict"

///////////////////////////////////////////////////////////////////// Select



class Select {
    constructor(select,target){
        this.select = document.querySelector(`${select}`)
        this.target = document.querySelector(`${target}`)
    }

    init() {

        const input = this.select.parentNode.querySelector(`.select__input`)

        this.select.querySelectorAll('.select__li').forEach(li => {
            li.addEventListener('click', e => {
                this.target.style[this.select.dataset.property] = e.target.dataset.value;
                input.value = e.target.dataset.value;
            })
        })


    }

}