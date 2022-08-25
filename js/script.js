"use strict"


const buttonAddInput = document.querySelector(`#addInput`),
    buttonAddRadio = document.querySelector(`#addRadio`),
    buttonAddCheckbox = document.querySelector(`#addCheckbox`),
    buttonFormSettings = document.querySelector(`#formSettings`)

const formSettings = document.querySelectorAll('.form-settings')
const form = document.querySelector(`.form`)


function getChildrenElements(){
   return form.childNodes
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



///////////////////////////////////////////////////////////////////// FormPadding


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

    // изменение едениц измерения Доделай!
        
     
        this.group.querySelectorAll('.select__ul')
            .forEach(ul => {
                ul.querySelectorAll('.select__li').forEach(li => {
                    li.addEventListener('click', e => {

                        if(allConnect) {

                            this.group.querySelectorAll('.select__ul')
                                .forEach(ul => {
                                    this.group.querySelector('#' + ul.dataset.input).value = e.target.dataset.value;
                            })
                        } else {
                            this.group.querySelector('#' + ul.dataset.input).value = e.target.dataset.value;
                        }

                        form.style[ul.dataset.property] = this.group.querySelector(`#` + ul.dataset.target).value + e.target.dataset.value;
                    })
                })
            })
    }

}


const formPadding = new InputsGroup(`#FormPadding`)
formPadding.init()

/*
const inputFormPaddingT = document.querySelector(`#formPaddingT`)
const selectFormPaddingT = document.querySelector(`#selectFormPaddingT`)
const inputFormPaddingB = document.querySelector(`#formPaddingB`)
const selectFormPaddingB = document.querySelector(`#selectFormPaddingB`)
const inputFormPaddingL = document.querySelector(`#formPaddingL`)
const selectFormPaddingL = document.querySelector(`#selectFormPaddingL`)
const inputFormPaddingR = document.querySelector(`#formPaddingR`)
const selectFormPaddingR = document.querySelector(`#selectFormPaddingR`)

const btnTBConnect = document.querySelector(`#TBConnect`)
const btnLRConnect = document.querySelector(`#LRConnect`)
const btnAllConnect = document.querySelector(`#AllConnect`)

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

let tbConnect = false,
    lrConnect = false,
    allConnect = false;

inputFormPaddingT.addEventListener(`input`,()=>{
    if(tbConnect) {
        inputFormPaddingB.value = inputFormPaddingT.value
        form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
    }
    if(allConnect) {
        inputFormPaddingB.value = inputFormPaddingT.value
        inputFormPaddingL.value = inputFormPaddingT.value
        inputFormPaddingR.value = inputFormPaddingT.value
        form.style.paddingBottom = inputFormPaddingT.value + selectFormPaddingT.value;
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
    form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;

})
inputFormPaddingB.addEventListener(`input`,()=>{
    if(tbConnect) {
        inputFormPaddingT.value = inputFormPaddingB.value
        form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;
    }
    if(allConnect) {
        inputFormPaddingT.value = inputFormPaddingB.value
        inputFormPaddingL.value = inputFormPaddingB.value
        inputFormPaddingR.value = inputFormPaddingB.value
        form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
    form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
})
inputFormPaddingL.addEventListener(`input`,()=>{
    if(lrConnect) {
        inputFormPaddingR.value = inputFormPaddingL.value
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
    if(allConnect) {
        inputFormPaddingT.value = inputFormPaddingL.value
        inputFormPaddingB.value = inputFormPaddingL.value
        inputFormPaddingR.value = inputFormPaddingL.value
        form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;
        form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
    form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
})
inputFormPaddingR.addEventListener(`input`,()=>{
    if(lrConnect) {
        inputFormPaddingL.value = inputFormPaddingR.value
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
    }
    if(allConnect) {
        inputFormPaddingT.value = inputFormPaddingR.value
        inputFormPaddingB.value = inputFormPaddingR.value
        inputFormPaddingL.value = inputFormPaddingR.value
        form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;
        form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
    }
    form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
})

selectFormPaddingT.addEventListener(`change`,()=>{
    if (selectFormPaddingT.value == 'inherit') {
        inputFormPaddingT.setAttribute("disabled", "disabled");
        inputFormPaddingT.value = ''
        form.style.paddingTop = 'inherit';
    } else {
        inputFormPaddingT.removeAttribute("disabled", "disabled");
        form.style.paddingTop = inputFormPaddingT.value + selectFormPaddingT.value;
    }
})
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

///////////////////////////////////////////////////////////////////// Form Border Radius
const inputFormBR = document.querySelector(`#formBR`)
const selectFormBR = document.querySelector(`#selectFormBR`)

inputFormBR.addEventListener(`input`,()=>{
    form.style.borderRadius = inputFormBR.value + selectFormBR.value;
})
selectFormBR.addEventListener(`change`,()=>{
    if (selectFormBR.value == 'inherit') {
        inputFormBR.setAttribute("disabled", "disabled");
        inputFormBR.value = ''
        form.style.borderRadius = 'inherit';
    } else {
        inputFormBR.removeAttribute("disabled", "disabled");
        form.style.borderRadius = inputFormBR.value + selectFormBR.value;
    }
})

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

//size
const inputformTitleSize = document.querySelector(`#formTitleSize`)
const selectFormTitleSize = document.querySelector(`#selectformTitleSize`)

inputformTitleSize.addEventListener(`input`,()=>{
    formText.style.fontSize = inputformTitleSize.value + selectFormTitleSize.value;
})
selectFormTitleSize.addEventListener(`change`,()=>{
    if (selectFormTitleSize.value == 'inherit') {
        inputformTitleSize.setAttribute("disabled", "disabled");
        inputformTitleSize.value = ''
        formText.style.fontSize = 'inherit';
    } else {
        inputformTitleSize.removeAttribute("disabled", "disabled");
        formText.style.fontSize = inputformTitleSize.value + selectFormTitleSize.value;
    }
})
//Weight

const inputformTitleWeight = document.querySelector(`#formTitleWeight`)
const selectFormTitleWeight = document.querySelector(`#selectFormTitleWeight`)

inputformTitleWeight.addEventListener(`input`,()=>{
    formText.style.fontWeight = inputformTitleWeight.value;
})
selectFormTitleWeight.addEventListener(`change`,()=>{
    if (selectFormTitleWeight.value == 'inherit') {
        inputformTitleWeight.setAttribute("disabled", "disabled");
        inputformTitleWeight.value = 'inherit'
        formText.style.fontWeight = 'inherit';
    } else {
        inputformTitleWeight.removeAttribute("disabled", "disabled");
        inputformTitleWeight.value = selectFormTitleWeight.value
        formText.style.fontWeight = selectFormTitleWeight.value;
    }
})

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


buttonAddInput.addEventListener(`click` ,()=>{
    const createWindow = document.querySelector(`.window-create`)
    const createForm = createWindow.querySelector(`.window-create__form`)
    createWindow.classList.add(`visible`)
    createForm.addEventListener(`submit` ,(e)=>{
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


        form.innerHTML += `<div class="input-group"><input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}"></div>`


        //console.log(result.querySelector(`#${id}`))

        //elements[id] = result.querySelector(`#${id}`)

        elements.push(`${id}`)


        createForm.reset()
        createWindow.classList.remove(`visible`)


    },{once: true})
})
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

//document.querySelector(`#btnСss`).addEventListener(`click`,()=>{
    /*const outPopup = document.createElement(`div`);
    outPopup.style.cssText = `
        width: 300px;
        height: 300px;
        background-color: grey;
         white-space: pre;
    `

    document.body.append(outPopup)*/



   /*
    codeOut.value = `.form {\n \t ` + form.getAttribute('style') + `\n }`
    codeOut.value +=`\n .form__text {\n \t ` + formText.getAttribute('style') + `\n }`
    codeOut.value += formInputGroup.getAttribute('style') ? `\n .form__text {\n \t ` + formInputGroup.getAttribute('style') + `\n }` : ``
    codeOut.value += formInput.getAttribute('style') ? `\n .form__text {\n \t ` + formInput.getAttribute('style') + `\n }` : ``

})*/