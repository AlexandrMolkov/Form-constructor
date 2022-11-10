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
    
    form.querySelector('.form__text')
        .style[property] = formTextPropertys[property]
}

///////////////////////////////////////////////////////////////////// 

addInputButton.addEventListener(`click`,addNewInput)

addRadioButton.addEventListener(`click`, ()=>{
    createFormInput('radio','radio')
})

addCheckboxButton.addEventListener(`click`, ()=>{
    createFormInput('checkbox','checkbox')
})


function setInputStyle(input) {
    for(let property in inputsPropertys) {
        input.style[property] = inputsPropertys[property]
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
        const id = createWindow.querySelector(`#input-id`).value
        const label = createWindow.querySelector(`#input-label`).value
        createFormInput(type,place,name,id,label)

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
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
    })
}

function createSubmitButton(type, btnText) {
    const div = document.createElement(`div`)
    div.classList.add(`input-group`)
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems= 'center'
    const btn = document.createElement(`button`)
    btn.classList.add('btnSubm')
    const span = document.createElement(`span`)
    span.textContent = btnText
   /*  btn.textContent = btnText */
    btn.append(span)
    btn.type = type

    for(let property in btnSubmitProperty) {
        btn.style[property] = btnSubmitProperty[property]
    }
    btn.addEventListener('mouseover', ()=>{
        for(let property in btnSubmitPropertyHover){
            btn.style[property] = btnSubmitPropertyHover[property]
        }
        for(let property in btnSubmitTextPropertyHover){
            btn.firstChild.style[property] = btnSubmitTextPropertyHover[property]
        }

    })
    btn.addEventListener('mouseout', ()=>{
        for(let property in btnSubmitProperty) {
            btn.style[property] = btnSubmitProperty[property]
        }
        for(let property in btnSubmitTextProperty){
            btn.firstChild.style[property] = btnSubmitTextProperty[property]
        }
    })
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
    })

    div.append(btn) 
    form.append(div) 

    return div
}

function createFormInput(typeInput,placeInput,nameInput,idInput,label){
    
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
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.marginBottom = '15px'
    const delBtn = document.createElement(`button`)
    delBtn.classList.add(`btn-del`)
    delBtn.textContent = 'X'
    delBtn.setAttribute('title', 'delete input')
    div.classList.add(`input-group`)

    if (label) div.innerHTML += `<label style="margin-right:15px" for="${id}">${label}</label>`

    div.innerHTML +=`<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`
    div.classList.add(`interact`)
    const newInp = div.querySelector('input')
   
    for(let property in inputsPropertys) {
        newInp.style[property] = inputsPropertys[property]
    }
    
    delBtn.setAttribute('data-index',`${formElements.length}`)
    delBtn.addEventListener('click',(e)=>{
            e.preventDefault()
            
            formElements[e.target.dataset.index].remove()
            formElements.splice(e.target.dataset.index,1)
            reIndex()

        })
    div.append(delBtn)
    const inputs = form.querySelectorAll('.input')
    if (inputs.length>0) inputs[inputs.length - 1].parentNode.after(div)
    else {form.append(div)}

    setInputStyle(div.querySelector('.input'))

    formElements.push(div)

    return div
}


function addNewElement() {
    elements[id] = form.querySelector(`#${id}`)
}



const simplebar = document.createElement('div')
simplebar.setAttribute('data-simplebar','')
sidebar.append(simplebar)

new SimpleBar(document.getElementById('sidebar'),{
    autoHide: false
});
