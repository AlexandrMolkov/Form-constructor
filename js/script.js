"use strict"


const buttonAddInput = document.querySelector(`#addInput`),
    buttonAddRadio = document.querySelector(`#addRadio`),
    buttonAddCheckbox = document.querySelector(`#addCheckbox`),
    buttonFormSettings = document.querySelector(`#formSettings`)

const formSettings = document.querySelectorAll('.form-settings')
const form = document.querySelector(`.form`)




{
    form.style.cssText = `
        margin = "0 auto"
        width = "300px";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
    `
}





formSettings.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        e.target.parentElement.querySelectorAll('.form-settings__wrapper')
            .forEach(element => {
                element.classList.toggle('form-settings_hidden')
                element.classList.toggle('form-settings_visible')

                if(element.classList.contains('form-settings_hidden')) {
                }

                if (element.classList.contains('form-settings_visible')) {
                }
                
            });
    })
})


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


const formBordRad = new Input("#form-br",".form")
formBordRad.init()







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


const formPadding = new InputsGroup(`#form-padding`)
formPadding.init()



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




///////////////////////////////////////////////////////////////////// Form Color

const formCol = document.querySelector(`#formCol`)

formCol.addEventListener(`input`,()=>{
    form.style.backgroundColor = formCol.value;
})




///////////////////////////////////////////////////////////////////// Form Title

const formTitle = document.querySelector(`#formTitle`)
const formText = document.querySelector(`.form__text`)

document.querySelector(`#formTitle`).addEventListener(`input`,()=>{
    const formTitle = document.querySelector(`#formTitle`)
    const formText = document.querySelector(`.form__text`)
    formText.innerText = formTitle.value;
})




const formTitleWeight = new Select("#form-title-weight", ".form__text")
formTitleWeight.init()



const formTitleSize = new Input("#form-title-size",".form__text")
formTitleSize.init()

const formTitleStyle = new Select("#form-title-style", ".form__text")
formTitleStyle.init()

const formTitleMB = new Input("#form-title-mb",".form__text")
formTitleMB.init()


///////////////////////////////////////////////////////////////////// Inputs Border Radius




const inputInputBR = document.querySelector(`#inputsBR`)
const selectInputBR = document.querySelector(`#selectInputsBR`)

let formInputs = form.querySelectorAll('input')


inputInputBR.addEventListener(`input`,()=>{
    formInputs = form.querySelectorAll('input')
    formInputs.forEach((e)=>{
        e.style.borderRadius = inputInputBR.value + selectInputBR.value;
    })
    
})
selectInputBR.addEventListener(`change`,()=>{
    if (selectInputBR.value == 'inherit') {
        inputInputBR.setAttribute("disabled", "disabled");
        inputInputBR.value = ''
        formInputs.style.borderRadius = 'inherit';
    } else {
        inputInputBR.removeAttribute("disabled", "disabled");
        formInputs.forEach((e)=>{
            e.style.borderRadius = inputInputBR.value + selectInputBR.value;
        })
    }
})
///////////////////////////////////////////////////////////////////// Inputs paddings




const formInputsPaddingT = document.querySelector(`#formInputsPaddingT`)
const selectFormInputsPaddingT = document.querySelector(`#selectFormInputsPaddingT`)
const formInputsPaddingB = document.querySelector(`#formInputsPaddingB`)
const selectFormInputsPaddingB = document.querySelector(`#selectFormInputsPaddingB`)
const formInputsPaddingL = document.querySelector(`#formInputsPaddingL`)
const selectFormInputsPaddingL = document.querySelector(`#selectFormInputsPaddingL`)
const formInputsPaddingR = document.querySelector(`#formInputsPaddingR`)
const selectFormInputsPaddingR = document.querySelector(`#selectFormInputsPaddingR`)

formInputsPaddingT.addEventListener(`input`,()=>{
    form.querySelectorAll('input').forEach((e)=>{
        e.style.paddingTop = formInputsPaddingT.value + selectFormInputsPaddingT.value;
    })
})

formInputsPaddingB.addEventListener(`input`,()=>{
    form.querySelectorAll('input').forEach((e)=>{
        e.style.paddingBottom = formInputsPaddingB.value + selectFormInputsPaddingB.value;
    })
})
formInputsPaddingL.addEventListener(`input`,()=>{
    form.querySelectorAll('input').forEach((e)=>{
        e.style.paddingLeft = formInputsPaddingL.value + selectFormInputsPaddingL.value;
    })
})
formInputsPaddingR.addEventListener(`input`,()=>{
    form.querySelectorAll('input').forEach((e)=>{
        e.style.paddingRight = formInputsPaddingR.value + selectFormInputsPaddingR.value;
    })
})


selectFormInputsPaddingT.addEventListener(`change`,()=>{
    if (selectFormInputsPaddingT.value == 'inherit') {
        formInputsPaddingT.setAttribute("disabled", "disabled");
        formInputsPaddingT.value = ''
        form.style.paddingTop = 'inherit';
    } else {
        formInputsPaddingT.removeAttribute("disabled", "disabled");
        form.style.paddingTop = formInputsPaddingT.value + selectFormInputsPaddingT.value;
    }
})
/*
selectFormPaddingB.addEventListener(`change`,()=>{
    if (selectFormPaddingB.value == 'inherit') {
        inputFormPaddingB.setAttribute("disabled", "disabled");
        inputFormPaddingB.value = ''
        form.style.paddingBottom = 'inherit';
    } else {
        inputFormPaddingB.removeAttribute("disabled", "disabled");
        form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
    }
})
selectFormPaddingL.addEventListener(`change`,()=>{
    if (selectFormPaddingL.value == 'inherit') {
        inputFormPaddingL.setAttribute("disabled", "disabled");
        inputFormPaddingL.value = ''
        form.style.paddingLeft = 'inherit';
    } else {
        inputFormPaddingL.removeAttribute("disabled", "disabled");
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
    }
})
selectFormPaddingR.addEventListener(`change`,()=>{
    if (selectFormPaddingR.value == 'inherit') {
        inputFormPaddingR.setAttribute("disabled", "disabled");
        inputFormPaddingR.value = ''
        form.style.paddingRight = 'inherit';
    } else {
        inputFormPaddingR.removeAttribute("disabled", "disabled");
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
})

*/





///////////////////////////////////////////////////////////////////// 
const code = document.querySelector(`.code-out`)
let autoId = 1;

const elements = []


buttonAddInput.addEventListener(`click`,addNewInput)




function addNewInput() {

    const createWindow = document.querySelector(`.window-create`)
    const createForm = createWindow.querySelector(`.window-create__form`)
    createWindow.classList.add(`visible`)

    createForm.addEventListener(`submit`,(e)=>{
        e.preventDefault();
        const type = createWindow.querySelector(`.window-create__select`).value
        const place = createWindow.querySelector(`#input-placeholder`).value
        const name = createWindow.querySelector(`#input-name`).value
        let id = createWindow.querySelector(`#input-id`).value
        id ? `` : id = `input-${autoId++}`
        
        const getPlaceholder = () => {
            return place ? `placeholder="${place}"` : ``
        }
        const getName = () =>  {
            return name ? `name="${name}"` : `name="${type}"`
        }

        const div = document.createElement(`div`);
        div.classList.add(`input-group`)

        div.innerHTML += `<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`

        form.append(div) 

        //form.innerHTML += `<div class="input-group"><input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}"></div>`

       

        //console.log(result.querySelector(`#${id}`))

        //elements[id] = result.querySelector(`#${id}`)

        elements.push(`${id}`)

        createForm.reset()
        createWindow.classList.remove(`visible`)

    },{once: true})
}


/*
buttonAddRadio.addEventListener('click',()=>{
    const createWindow = document.querySelector(`.window-create-radio`)
    const createForm = createWindow.querySelector(`.window-create__form`)
    createWindow.classList.add(`visible`)
    createForm.addEventListener(`submit` ,(e)=>{
        e.preventDefault();
        const name = createWindow.querySelector(`#input-name`).value
        let id = createWindow.querySelector(`#input-id`).value
        id ? `` : id = `input-${autoId++}`

        const getName = () =>  {
            return name ? `name="${name}"` : `name="radio`
        }

        form.innerHTML += `<div class="input-group"><input class="radio" type="radio" ${getName()} value="" id="${id}"></div>`


        //elements.push(`${id}`)


        createForm.reset()
        createWindow.classList.remove(`visible`)

    },{once: true})
})
*/



function addNewElement() {
    elements[id] = form.querySelector(`#${id}`)
}

function getResult() {
    //code.innerText = result.outerHTML
    //code.innerText = result.outerHTML.replace('value`,`value=""')
    code.innerText = form.outerHTML.replace('>`,`>\n')
}

const codeOut = document.querySelector(`#codeOut`)


document.querySelector(`#btnHtml`).addEventListener(`click`,outHtml)




const tabs = function(num){
    //console.log(num)

    let string ='';
    for(let i = 0; i < num; i++){
        string = string + `\t`
        //console.log(`loop`)
    }
    return string
}

const getNewString = function(string) {
    let numbOfTab = 0;
    
    const arr = string.split(``)

    return arr.reduce((newArr,symb,i)=>{
        if (symb === '<' && arr[i+1] !== '/') {

            //console.log(`arr[++i] is : ` + arr[i+1])
            newArr.push(tabs(numbOfTab) + symb)
            numbOfTab++
            return newArr
        }
  
        if (symb === '<' && arr[i+1] === '/') { 
            numbOfTab-- 
            newArr.push(tabs(numbOfTab) + symb)
            return newArr
        }

        if (symb === '>') {
            //console.log(`symb === '>'`)
            newArr.push(symb + `\n`)
            return newArr
        }
       // console.log(`just push(symb) : ` + symb)

        newArr.push(symb)

        return newArr
    },[]).join(``)
}



function outHtml() {

    codeOut.value = getNewString(form.outerHTML.replaceAll(/style="([^"]*)"/g,'')) 

}

function outCss() {
    const formText = form.querySelector(`.form__text`)
    const formInputGroup = form.querySelector(`.input-group`)
    const formInput = form.querySelector(`.input`)

    codeOut.value = `.form {\n \t ` + form.getAttribute('style') + `\n }`
    codeOut.value +=`\n.form__text {\n \t ` + formText.getAttribute('style') + `\n }`

    codeOut.value += formInputGroup && formInputGroup.getAttribute('style') ? `\n .form__text {\n \t ` + formInputGroup.getAttribute('style') + `\n }` : ``
    codeOut.value += formInput && formInput.getAttribute('style') ? `\n .form__text {\n \t ` + formInput.getAttribute('style') + `\n }` : ``
}


document.querySelector(`#btnСss`).addEventListener(`click`,outCss)