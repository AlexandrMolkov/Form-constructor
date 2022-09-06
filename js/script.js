"use strict"




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

document.querySelector('.form').style.cssText = `
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    background-color: #7fffd4;
    padding: 25px;
    border-radius: 15px;
`

document.querySelector('.form__text').style.cssText = `
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 15px
`

createInput("text",":)")



/* new InputsGroup(`#form-padding`).init() */

/* new Input("#form-br",".form").init()


new Input("#form-title-size",".form__text").init()

new Select("#form-title-weight", ".form__text").init()

new Select("#form-title-style", ".form__text").init()

new Input("#form-title-mb",".form__text").init()

new TextAlign('.form__text','#btn-title-r', '#btn-title-c', '#btn-title-l').init()


 */


///////////////////////////////////////////////////////////////////// 



function render() {
    formElements.forEach((e)=>{e.render()})
}






/* const inputsAlign = new TextAlign('.input','#btn-input-r', '#btn-input-c', '#btn-input-l')
inputsAlign.init() */


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
       /*  const type = createWindow.querySelector(`.window-create__select`).value
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
        const delBtn = document.createElement(`button`)
        div.classList.add(`input-group`)
        div.innerHTML += `<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`
        div.classList.add(`interact`)
        
        delBtn.classList.add(`btn-del`)
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

        new TextAlign(`#${id}`,'#btn-input-r', '#btn-input-c', '#btn-input-l').init()

        formElements.push(div) */


        createForm.reset()
        createWindow.classList.remove(`visible`)

    },{once: true})
}


function createInput(typeInput,placeInput,nameInput,idInput){
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
    div.innerHTML += `<input class="input" type="${type}" ${getName()} value="" ${getPlaceholder()} id="${id}">`
    div.classList.add(`interact`)
    
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

    /* new TextAlign(`#${id}`,'#btn-input-r', '#btn-input-c', '#btn-input-l').init() */

    formElements.push(div)
}


function addNewElement() {
    elements[id] = form.querySelector(`#${id}`)
}