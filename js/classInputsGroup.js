"use strict"

///////////////////////////////////////////////////////////////////// InputsGroup


class InputsGroup {
    constructor(group) {
        this.group = document.querySelector(`${group}`)
    }

    init() {

        const input1 = this.group.querySelector(`.sidebar-group__input-1`)
        const select1 = input1.parentNode.querySelector(`.select__input`)

        const input2 = this.group.querySelector(`.sidebar-group__input-2`)
        const select2 = input2.parentNode.querySelector(`.select__input`)

        const input3 = this.group.querySelector(`.sidebar-group__input-3`)
        const select3 = input3.parentNode.querySelector(`.select__input`)

        const input4 = this.group.querySelector(`.sidebar-group__input-4`)
        const select4 = input4.parentNode.querySelector(`.select__input`)
        
        const btnTBConnect = this.group.querySelector(`#TBConnect`)
        const btnLRConnect = this.group.querySelector(`#LRConnect`)
        const btnAllConnect = this.group.querySelector(`#AllConnect`)

        let tbConnect = false,
        lrConnect = false,
        allConnect = false;
        
        btnTBConnect.addEventListener(`click`,()=>{
            tbConnect = !tbConnect
            btnTBConnect.classList.toggle(`button__active`)
        })
        btnLRConnect.addEventListener(`click`,()=>{
            lrConnect = !lrConnect
            btnLRConnect.classList.toggle(`button__active`)
        })
        btnAllConnect.addEventListener(`click`,()=>{
            allConnect = !allConnect
            btnAllConnect.classList.toggle(`button__active`)
        })
        

        const property1 = input1.parentNode.querySelector('.select__ul').dataset.property
        const property2 = input2.parentNode.querySelector('.select__ul').dataset.property
        const property3 = input3.parentNode.querySelector('.select__ul').dataset.property
        const property4 = input4.parentNode.querySelector('.select__ul').dataset.property


        input1.addEventListener(`input`,()=>{
        
            if(tbConnect) {
                input2.value = input1.value
                form.style.paddingBottom = input2.value + select2.value;
            }
            if(allConnect) {
                input2.value = input1.value
                input3.value = input1.value
                input4.value = input1.value
                form.style[property2] = input1.value + select1.value;
                form.style[property3] = input3.value + select3.value;
                form.style[property4] = input4.value + select4.value;
            }
            form.style[property1] = input1.value + select1.value;
        
        })
        input2.addEventListener(`input`,()=>{
           
            if(tbConnect) {
                input1.value = input2.value
                form.style.paddingTop = input1.value + input2.value;
            }
            if(allConnect) {
                input1.value = input2.value
                input3.value = input2.value
                input4.value = input2.value
                form.style[property1] = input1.value + select1.value;
                form.style[property3] = input3.value + select3.value;
                form.style[property4] = input4.value + select4.value;
            }
            form.style[property2] = input2.value + select2.value;
        })
        input3.addEventListener(`input`,()=>{
            
            if(lrConnect) {
                input4.value = input3.value
                form.style.paddingRight = input4.value + select4.value;
            }
            if(allConnect) {
                input1.value = input3.value
                input2.value = input3.value
                input4.value = input3.value
                form.style[property1] = input1.value + select1.value;
                form.style[property2] = input2.value + select2.value;
                form.style[property4] = input4.value + select4.value;
            }
            form.style[property3] = input3.value + select3.value;
        })
        input4.addEventListener(`input`,()=>{
            

            if(lrConnect) {
                input3.value = input4.value
                form.style.paddingLeft = input3.value + select3.value;
            }
            if(allConnect) {
                input1.value = input4.value
                input2.value = input4.value
                input3.value = input4.value
                form.style[property1] = input1.value + select1.value;
                form.style[property2] = input2.value + select2.value;
                form.style[property3] = input3.value + select3.value;
            }
            form.style[property4] = input4.value + select4.value;

        })

    // изменение едениц измерения
        
     
       const lists = this.group.querySelectorAll('.select__ul')

            lists.forEach(ul => {
                ul.querySelectorAll('.select__li').forEach(li => {
                    li.addEventListener('click', e => {

                        if(allConnect) {

                            lists.forEach(ul => {
                                    this.group.querySelector('#' + ul.dataset.input).value = e.target.dataset.value;
                                    form.style[ul.dataset.property] = this.group.querySelector(`#` + ul.dataset.target).value + e.target.dataset.value;
                            })

                        } if(tbConnect && e.target.parentNode.dataset.connect == 'tb') {
     
                                const value = e.target.dataset.value

                                this.group.querySelector('#' + lists[0].dataset.input).value = value;
                                form.style[lists[0].dataset.property] = this.group.querySelector(`#` + lists[0].dataset.target).value + value;

                                this.group.querySelector('#' + lists[1].dataset.input).value = value;
                                form.style[lists[1].dataset.property] = this.group.querySelector(`#` + lists[1].dataset.target).value + value;

                        } if(lrConnect && e.target.parentNode.dataset.connect == 'lr') {
                            
                                const value = e.target.dataset.value

                                this.group.querySelector('#' + lists[2].dataset.input).value = value;
                                form.style[lists[2].dataset.property] = this.group.querySelector(`#` + lists[2].dataset.target).value + value;

                                this.group.querySelector('#' + lists[3].dataset.input).value = value;
                                form.style[lists[3].dataset.property] = this.group.querySelector(`#` + lists[3].dataset.target).value + value;

                        } else {
                                this.group.querySelector('#' + ul.dataset.input).value = e.target.dataset.value;

                                form.style[ul.dataset.property] = this.group.querySelector(`#` + ul.dataset.target).value + e.target.dataset.value;
                        }

                        //form.style[ul.dataset.property] = this.group.querySelector(`#` + ul.dataset.target).value + e.target.dataset.value;
                    })
                })
            })
    }

}
