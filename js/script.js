"use strict"


/* 
function createButton() {
    const div = document.createElement('div')
    const btn = document.createElement('button')
    btn.classList.add('form-btn', 'submit', 'interact')
    btn.textContent = 'submit'
    div.append(btn)
    form.append(div)

} */



///////////////////////////////////////////////////////////////////// menu Anim



document.querySelectorAll('.form-settings')
    .forEach((el)=>{
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




///////////////////////////////////////////////////////////////////// Init




for(let property in formPropertys) {
    form.style[property] = formPropertys[property]
}

for(let property in formTextPropertys) {
    
    document.querySelector('.form__text')
        .style[property] = formTextPropertys[property]
}

///////////////////////////////////////////////////////////////////// 



function render() {
    formElements.forEach((e)=>{e.render()})
}



///////////////////////////////////////////////////////////////////// 




class formInput {
    constructor(id) {

        this.id = id
    }
    
    getPropertyes() {

        return ``
    }
}



function renderFormInputs() {

    form.innerHTML = ""

    formInputs.forEach((input)=>{
        form.innerHTML += input.getPropertyes()
    })

}




/////////////////////////////////////////////////////////////////////





document.querySelector(`#addInput`).addEventListener(`click`,addNewInput)


function setInputStyle(input) {
    for(let property in inputsSettings) {
        input.style[property] = inputsSettings[property]
    }
}


function reIndex() {
    formElements.forEach((inp,ind)=>{
        inp.querySelector('.btn-del').setAttribute('data-index',`${ind}`)
    })
}

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
        createInput(type,place,name,id)

        createForm.reset()
        createWindow.classList.remove(`visible`)

    },{once: true})
}

createFormInput("text",":)")
createSubmitButton('submit','SUBMIT')
createExitButton()

function createExitButton(){
    const btn = document.createElement(`button`)
    btn.classList.add('btn','btnExt')
    btn.textContent = 'X'
    form.append(btn) 
    
    for(let property in btnExitProperty) {
        btn.style[property] = btnExitProperty[property]
    }
    btn.addEventListener('mouseover', ()=>{
        for(let property in btnExitPropertyHover){
            btn.style[property] = btnExitPropertyHover[property]
        }
    })
    btn.addEventListener('mouseout', ()=>{
        for(let property in btnExitPropertyHover) {
            btn.style[property] = btnExitProperty[property]
        }
    })
}

function createSubmitButton(type, btnText) {
    const div = document.createElement(`div`)
    div.classList.add(`input-group`)
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    const btn = document.createElement(`button`)
    btn.classList.add('btn')
    btn.textContent = btnText
    btn.type = type

    for(let property in btnSubmitProperty) {
        btn.style[property] = btnSubmitProperty[property]
    }
    btn.addEventListener('mouseover', ()=>{
        for(let property in btnSubmitPropertyHover){
            btn.style[property] = btnSubmitPropertyHover[property]
            console.log('hover')
        }
    })
    btn.addEventListener('mouseout', ()=>{
        for(let property in btnSubmitProperty) {
            btn.style[property] = btnSubmitProperty[property]
        }
    })

    div.append(btn) 
    form.append(div) 

    return div
}

function createFormInput(typeInput,placeInput,nameInput,idInput){
    
    const type = typeInput
    const place = placeInput
    const name = nameInput
    let id = idInput
    
    id ? `` : id = `input-${autoId++}`

    const getPlaceholder = () => {
        return place ? `placeholder="${place}"` : ``
    }
    const getName = () =>  {
        return name ? `name="${name}"` : `name="${type}"`
    }

    const div = document.createElement(`div`);
    const delBtn = document.createElement(`button`)
    delBtn.classList.add(`btn-del`)
    delBtn.setAttribute('title', 'delete input')
    div.classList.add(`input-group`)
    div.innerHTML +=`<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`
    div.classList.add(`interact`)
    const newInp = div.querySelector('input')
    for(let property in inputsSettings) {
        newInp.style[property] = inputsSettings[property]
    }
    
    delBtn.setAttribute('data-index',`${formElements.length}`)
    delBtn.addEventListener('click',(e)=>{
            e.preventDefault()
            
            formElements[e.target.dataset.index].remove()
            formElements.splice(e.target.dataset.index,1)
            reIndex()

        })
    div.append(delBtn) 
    form.append(div) 

    setInputStyle(div.querySelector('.input'))

    formElements.push(div)

    return div
}


function addNewElement() {
    elements[id] = form.querySelector(`#${id}`)
}





