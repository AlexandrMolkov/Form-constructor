"use strict"




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

const inputsSettings = {
    textAlign: 'left',
    padding: '5px',
    borderRadius: '50px' 
}

///////////////////////////////////////////////////////////////////// menu Anim




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




///////////////////////////////////////////////////////////////////// Init





new InputsGroup(`#form-padding`).init()

new Input("#form-br",".form").init()


new Input("#form-title-size",".form__text").init()

new Select("#form-title-weight", ".form__text").init()

new Select("#form-title-style", ".form__text").init()

new Input("#form-title-mb",".form__text").init()

new TextAlign('.form__text','#btn-title-r', '#btn-title-c', '#btn-title-l').init()





///////////////////////////////////////////////////////////////////// 










/* const inputsAlign = new TextAlign('.input','#btn-input-r', '#btn-input-c', '#btn-input-l')
inputsAlign.init() */


///////////////////////////////////////////////////////////////////// 


let autoId = 1;

const elements = []





document.querySelector(`#addInput`).addEventListener(`click`,addNewInput)


const setInputStyle = function(input) {
    for(let property in inputsSettings) {
        input.style[property] = inputsSettings[property]
    }
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
        
        id ? `` : id = `input-${autoId++}`
        //console.log(id)
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

        setInputStyle(div.querySelector('.input'))

        new TextAlign(`#${id}`,'#btn-input-r', '#btn-input-c', '#btn-input-l').init()

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