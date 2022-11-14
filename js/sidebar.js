import {propertys} from "./main.js"

"use strict"

const sidebar = document.createElement('aside')
sidebar.id = 'sidebar'
sidebar.classList.add('sidebar')
sidebar.classList.add('scroll')
document.querySelector('.wrapper').prepend(sidebar)

const addInputButton = document.createElement('button')
addInputButton.classList.add('add-input')
addInputButton.id = 'addInput'
addInputButton.textContent = 'Add input'
sidebar.prepend(addInputButton)


const addRadioButton = document.createElement('button')
addRadioButton.classList.add('add-input')
addRadioButton.id = 'addRadio'
addRadioButton.textContent = 'Add radio'
sidebar.prepend(addRadioButton)

const addCheckboxButton = document.createElement('button')
addCheckboxButton.classList.add('add-input')
addCheckboxButton.id = 'addCheckbox'
addCheckboxButton.textContent = 'Add Checkbox'
sidebar.prepend(addCheckboxButton)


class FormSettings {
    constructor(title) {
        this.title = title,
        this.wrapper
        this.group
    }
    create() {

        const formSettings = document.createElement('div')
        
        formSettings.classList.add('form-settings')

        const title = document.createElement('p')
        title.classList.add('form-settings__text')
        title.textContent = this.title

        const formSettingsWrapper = document.createElement('div')
        formSettingsWrapper.classList.add('form-settings__wrapper')
        formSettingsWrapper.classList.add('form-settings_hidden')
        
        this.wrapper = formSettingsWrapper

        formSettings.append(title)

        sidebar.append(formSettings)
        formSettings.append(formSettingsWrapper)

        const sidebarGroup = document.createElement('div')
        this.group = sidebarGroup
        sidebarGroup.classList.add('sidebar-group')
        this.wrapper.append(sidebarGroup)
    }

    addSidebarGroupItem(groupItemTitleContent,...content) {
        
        const sidebarGroupItem = document.createElement('div')
        sidebarGroupItem.classList.add('sidebar-group__item')
        sidebarGroupItem.append(...content)
        

        const groupItemTitleElement = document.createElement('p')
        groupItemTitleElement.classList.add('sidebar-group__desc')
        groupItemTitleElement.textContent = groupItemTitleContent

        this.group.append(groupItemTitleElement)
        this.group.append(sidebarGroupItem)

       
    }
}

function changeProperty(inp,propertys) {
    const targets = document.querySelectorAll(`${inp.getAttribute('data-target')}`)
    targets.forEach((target)=>{
        const units = inp.nextElementSibling?.firstChild?.value

        if(inp.getAttribute('data-property') == 'backgroundColor' || inp.getAttribute('data-property') == 'color') {
            const a = 1
            target.style[inp.getAttribute('data-property')] = `rgba(${hex2rgb(inp.value).r},${hex2rgb(inp.value).g},${hex2rgb(inp.value).b},${a})`
            propertys[inp.getAttribute('data-property')] = `rgba(${hex2rgb(inp.value).r},${hex2rgb(inp.value).g},${hex2rgb(inp.value).b},${a})`
        } else {

            target.style[inp.getAttribute('data-property')] = inp.value + (units ? units : "")
            /* inputsSettings[inp.getAttribute('data-property')] = inp.value + (units ? units : "") */
            propertys[inp.getAttribute('data-property')] = inp.value + (units ? units : "")
        }




        
    })
}

function disableGradient(target) {
    target.style.background = ''
}

function textAlign(target, propertys) {
    const div = document.createElement(`div`)
    div.setAttribute('data-target', target)
    div.classList.add('sidebar-group__input')
    const btnLeft = document.createElement(`button`)
    btnLeft.classList.add('button-align', 'button-align-left')
    btnLeft.dataset.value = "left"
    const btnCenter = document.createElement(`button`)
    btnCenter.classList.add('button-align', 'button-align-center')
    btnCenter.dataset.value = "center"
    const btnRight = document.createElement(`button`)
    btnRight.classList.add('button-align', 'button-align-right')
    btnRight.dataset.value = "right"
    div.append(btnLeft)
    div.append(btnCenter)
    div.append(btnRight)

    div.addEventListener(`click`,(e)=>{
        const value = e.target.dataset.value
        document.querySelectorAll(e.target.parentElement.dataset.target)
            .forEach((target)=>{
                target.style.textAlign = value
            })
        if(propertys) propertys.textAlign = value
    })

    return div

}

function createInput(type, property ,target, propertys, func){
   
    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type',type)
    input.setAttribute('data-property',property)
    input.setAttribute('data-target',target)
    if (type !== 'color') {
        input.value = parseInt(propertys[property]) ? parseInt(propertys[property]) : 0
    } else{
        input.value = propertys[property]
        
    }

    input.addEventListener('input',(ev)=>{
        if(func) func(document.querySelector(target))
        changeProperty(ev.target,propertys)
        
    })

    if(input.getAttribute('type') === 'color') input.style.width = '100%'
    return input
}

function createInputHover(type, property, propertys){
   
    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type',type)
    input.setAttribute('data-property',property)
    if (type !== 'color') {
        input.value = parseInt(propertys[property]) ? parseInt(propertys[property]) : 0
    } else{
        input.value = propertys[property]
    }

    input.addEventListener('input',(ev)=>{
        propertys[property] = ev.target.value + (ev.target.nextElementSibling?.firstChild?.value ? ev.target.nextElementSibling.firstChild.value : '')
    })

    if(input.getAttribute('type') === 'color') input.style.width = '100%'
    return input
}

function createUnitsSelect(propertys, values=['px','em','%','inherit']){

    const select = document.createElement('div')
    select.classList.add('select')
    select.classList.add('units')

    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type','text')
    selectInput.setAttribute('readonly','')
    select.append(selectInput)

    const ul = document.createElement('ul')
    ul.classList.add('select__ul')


    function createLi(...val) {                         //создаются элементы списка (селекта)               
        const elements = []
        val.forEach((elem)=>{
            const li = document.createElement('li')
            li.classList.add('select__li')
            li.setAttribute('data-value',elem)
            li.textContent = elem
    
            elements.push(li)
            /* ul.append(li) */
        })
        return elements
    }
    if (values.length > 1){
        const lies = createLi(...values)  // элементы, значения установятся как 'data-value' 
        select.append(ul)                               // список в селект (div class="select")  
        lies.forEach((li)=> ul.append(li) )             // элементы списка в список   
        lies[0].parentElement.previousElementSibling.value = lies[0].dataset.value
        lies.forEach((li)=>{
            li.addEventListener('click',()=>{
                const unitsInput =  li.parentElement.previousElementSibling
                unitsInput.value = li.dataset.value
                changeProperty(unitsInput.parentElement.previousElementSibling, propertys)
            })
        })
    } else{
        selectInput.value = values[0]
    }
     


    




    return select
}
function createText(text){
    const textElem = document.createElement('p')
    textElem.classList.add('sidebar-group__text')
    textElem.textContent = text
    return textElem
}

function createSelect(property,target,selectValues, prop) {
    
    const select = document.createElement('div')
    select.classList.add('select')
    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type','text')
    selectInput.setAttribute('readonly','')
    selectInput.setAttribute('data-property',property)
    selectInput.setAttribute('data-target',target)
    select.append(selectInput)
    console.log(prop[property])
    selectInput.value = prop[property]
    applyProperty(prop)
    
    function applyProperty(propertys) {
        const targets = document.querySelectorAll(`${selectInput.getAttribute('data-target')}`)
        targets.forEach((target)=>{
            
            target.style[selectInput.getAttribute('data-property')] = selectInput.value

        })
        propertys[selectInput.getAttribute('data-property')] = selectInput.value
        
    }

    const ul = document.createElement('ul')
    ul.classList.add('select__ul')
    
    function createLi(...val) {
        const elements = []
        val.forEach((elem)=>{
            const li = document.createElement('li')
            li.classList.add('select__li')
            li.setAttribute('data-value',elem)
            li.textContent = elem
    
            elements.push(li)
        })
        return elements
    }
    const lies = createLi(...selectValues)

    lies.forEach((li)=> ul.append(li) )
    select.append(ul)

    lies.forEach((li)=>{
        li.addEventListener('click',(e)=>{
            li.parentElement.previousElementSibling.value = li.dataset.value
            applyProperty(prop)
        })
    })
    return select
}

function createTextContentInput(target,defaultVal) {

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.style.width = '100%'
    input.value = defaultVal
    const targetElement = document.querySelector(target)

    input.addEventListener('input',()=>{
        targetElement.textContent = input.value
    })

    return input
}

function hex2rgb(c) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function createInputBoxShadow(target, prop){

    const targetElement = document.querySelector(target)

    const inputsWrapper = document.createElement('div')
    inputsWrapper.classList.add('sidebar-group__item')

    const propertys = {
        xOffset: 3,
        yOffset: 3,
        blurValue: 15,
        spread: 1,
        alpha: 0.2,
        color: '#000000'
    }

    let finalValue = `${propertys.xOffset}px ${propertys.yOffset}px ${propertys.blurValue}px ${propertys.spread}px ${propertys.color}`
    const inputs = []

    function createBoxShadowInput(attributes, property, text) {
            const newInput = document.createElement('input')
            newInput.classList.add('sidebar-group__input')
            console.log(attributes)
            for(attr in attributes) {
                newInput.setAttribute(attr, attributes[attr])
            }
            newInput.value = propertys[property]
            
            inputsWrapper.append(createText(text))
            inputsWrapper.append(newInput)
            if(attributes.type === 'number') {
                inputsWrapper.append(createUnitsSelect(prop,['px']))
            }
            

            newInput.addEventListener('input', (e)=>{
                propertys[property] = e.target.value
                applyValue(prop)
            })

        return newInput
    }

    inputs.push(createBoxShadowInput({
        type: 'number'
    }, "xOffset", "X"))

    inputs.push(createBoxShadowInput({
        type: 'number'
    }, "yOffset", "Y"))

    inputs.push(createBoxShadowInput({
        type: 'number',
        min: '0'
    }, "blurValue", "Blur"))

    inputs.push(createBoxShadowInput({
        type: 'number',
    }, "spread", "Spread"))

    inputs.push(createBoxShadowInput({
        type: 'range',
        min: '0',
        step: '0.05',
        max: '1'
    }, "alpha", "Alpha"))

    inputs.push(createBoxShadowInput({
        type: 'color'
    }, "color", "Color"))
   
    const applyValue = (prop) => {
        finalValue = `${propertys.xOffset}px ${propertys.yOffset}px ${propertys.blurValue}px ${propertys.spread}px rgba(${hex2rgb(propertys.color).r}, ${hex2rgb(propertys.color).g}, ${hex2rgb(propertys.color).b}, ${propertys.alpha})`
            
        targetElement.style.boxShadow = finalValue
        
        prop.boxShadow = finalValue

    }
    
    return inputsWrapper
}
function createInputTextShadow(target){

    const targetElement = document.querySelector(target)

    const inputsWrapper = document.createElement('div')

    const propertys = {
        xOffset: 1,
        yOffset: 1,
        blurValue: 5,
        alpha: 0.7,
        color: '#000000'
    }

    let finalValue = `${propertys.xOffset}px ${propertys.yOffset}px ${propertys.blurValue}px ${propertys.color}`

    const inputs = []


    function createBoxShadowInputs() {
        
        return document.createElement('input')
    }

    for(let i = 0; i < Object.keys(propertys).length ; i++) {
        let newInput = createBoxShadowInputs()
        newInput.setAttribute('type','number')
        newInput.value = propertys[Object.keys(propertys)[i]]
        inputs.push(newInput)
        inputsWrapper.append(newInput)
    }
    inputs.at(-1).setAttribute('type','color')
    inputs.at(-2).setAttribute('type','range')
    inputs.at(-2).setAttribute('min','0')
    inputs.at(-2).setAttribute('max','1')
    inputs.at(-2).setAttribute('step','0.1')

    inputs.forEach((el,id)=>{
        const propertyKeys = Object.keys(propertys)
        el.addEventListener('input',(e)=>{
            propertys[propertyKeys[id]] = e.target.value;
            applyValue(); 
        })
    
    })
   
    const applyValue = () => {
        console.log(propertys.color)
        finalValue = `
            ${propertys.xOffset}px 
            ${propertys.yOffset}px 
            ${propertys.blurValue}px 
            rgba(${hex2rgb(propertys.color).r}, ${hex2rgb(propertys.color).g}, ${hex2rgb(propertys.color).b},  ${propertys.alpha})`
            
        targetElement.style.textShadow = finalValue

    }
    
    return inputsWrapper
}

function createLinearGradient(target){

    let ElementTarget

    setTimeout(() => {
        ElementTarget = document.querySelector(target)
    }, 1000);

    const inputsWrapper = document.createElement('div')

    const propertys = {
        deg: '140deg',
        color1: '#fbfe48',
        color2: '#67db29'
    }
    const applychange = function() {
        ElementTarget.style.background = `linear-gradient(
            ${propertys.deg}deg, ${propertys.color1}, ${propertys.color2})`;
           
        }

    const degInput = document.createElement('input')
    degInput.setAttribute('type','number')
    degInput.setAttribute('type','range')
    degInput.setAttribute('min','0')
    degInput.setAttribute('max','360')
    degInput.value = propertys.deg
    degInput.addEventListener('input',()=>{
        propertys.deg = degInput.value
        applychange()
    })
    
    inputsWrapper.append(createText('Degrees'))
    inputsWrapper.append(degInput)

    const color1Input = document.createElement('input')
        color1Input.setAttribute('type','color')
        color1Input.value = propertys.color1
        color1Input.addEventListener('input',()=>{
            propertys.color1 = color1Input.value
            applychange()
    })
    inputsWrapper.append(color1Input)

    const color2Input = document.createElement('input')
        color2Input.setAttribute('type','color')
        color2Input.value = propertys.color2
        color2Input.addEventListener('input',()=>{
            propertys.color2 = color2Input.value
            applychange()
    })
    inputsWrapper.append(color2Input)
    
    return inputsWrapper
}




const borderStyle = ['solid','dotted','dashed','double','groove','ridge','inset','outset']
const weight = ['100','200','300','400','500','600','700','800','900']
const styles = ['normal','italic','oblique','inherit']
const formSets = new FormSettings('Form')
formSets.create()
formSets.addSidebarGroupItem('width',createInput('number','width','.form', propertys.formPropertys),createUnitsSelect(propertys.formPropertys))
formSets.addSidebarGroupItem('padding',
    createText('Top'),createInput('number','paddingTop','.form', propertys.formPropertys),createUnitsSelect(),
    createText('Bottom'),createInput('number','paddingBottom','.form', propertys.formPropertys),createUnitsSelect(),
    createText('Left'),createInput('number','paddingLeft','.form', propertys.formPropertys),createUnitsSelect(),
    createText('Right'),createInput('number','paddingRight','.form', propertys.formPropertys),createUnitsSelect()
    )
formSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.form', propertys.formPropertys,disableGradient))
formSets.addSidebarGroupItem('Background gradient',createLinearGradient('.form'))
/* formSets.addSidebarGroupItem('Shadow',createInputBoxShadow('.form', propertys.formPropertys)) */
formSets.addSidebarGroupItem('border Radius',createInput('number','borderRadius','.form', propertys.formPropertys),createUnitsSelect())
formSets.addSidebarGroupItem('border',
    createText('Width'),createInput('number','borderWidth','.form', propertys.formPropertys),createUnitsSelect(),
    createText('Style'),createSelect('borderStyle','.form',borderStyle, propertys.formPropertys),
    createText('Color'),createInput('color','borderColor','.form', propertys.formPropertys)
    )


const formTitle = new FormSettings('Title')
formTitle.create()
formTitle.addSidebarGroupItem('Title',createTextContentInput('.form__text','Hello!'))
formTitle.addSidebarGroupItem('Align', textAlign('.form__text'))
formTitle.addSidebarGroupItem('Title Font Size',createInput('number','fontSize','.form__text', propertys.formTextPropertys),createUnitsSelect())
formTitle.addSidebarGroupItem('Title Color',createInput('color','color','.form__text', propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Weight',createSelect('fontWeight','.form__text', weight, propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Style',createSelect('fontStyle','.form__text', styles, propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Shadow',createInputTextShadow('.form__text'))
formTitle.addSidebarGroupItem('Title Margin Bottom',createInput('number','marginBottom','.form__text', propertys.formTextPropertys),createUnitsSelect())



const inputsSets = new FormSettings('Inputs')
inputsSets.create()
inputsSets.addSidebarGroupItem('padding',createInput('number','padding','.input', propertys.inputsPropertys),createUnitsSelect())
inputsSets.addSidebarGroupItem('Border-Radius',createInput('number','borderRadius','.input', propertys.inputsPropertys),createUnitsSelect())
inputsSets.addSidebarGroupItem('border',
    createText('Width'),createInput('number','borderWidth','.input', propertys.inputsPropertys),createUnitsSelect(),
    createText('Style'),createSelect('borderStyle','.input',borderStyle, propertys.inputsPropertys),
    createText('Color'),createInput('color','borderColor','.input', propertys.inputsPropertys)
    )
inputsSets.addSidebarGroupItem('Color',createInput('color','color','.input', propertys.inputsPropertys))
inputsSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.input', propertys.inputsPropertys))
inputsSets.addSidebarGroupItem('Align', textAlign('.input', propertys.nputsPropertys))



const buttonsSets = new FormSettings('Submit Button')
buttonsSets.create()
buttonsSets.addSidebarGroupItem('padding',createInput('number','padding','.btnSubm', propertys.btnSubmitProperty),createUnitsSelect())
buttonsSets.addSidebarGroupItem('width',createInput('number','width','.btnSubm', propertys.btnSubmitProperty),createUnitsSelect())
buttonsSets.addSidebarGroupItem('height',createInput('number','height','.btnSubm', propertys.btnSubmitProperty),createUnitsSelect())
buttonsSets.addSidebarGroupItem('background Color',createInput('color','backgroundColor','.btnSubm', propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Color',createInput('color','color','.btnSubm', propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Background gradient',createLinearGradient('.btnSubm'))

const buttonsSetsHover = new FormSettings('Submit Button Hover')
buttonsSetsHover.create()
buttonsSetsHover.addSidebarGroupItem('Background color',createInputHover('color','backgroundColor', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Color',createInputHover('color','color', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Width',createInputHover('number','width', propertys.btnSubmitPropertyHover),createUnitsSelect())
buttonsSetsHover.addSidebarGroupItem('Height',createInputHover('number','height', propertys.btnSubmitPropertyHover),createUnitsSelect())

const buttonsExitSets = new FormSettings('Exit Button')
buttonsExitSets.create()
buttonsExitSets.addSidebarGroupItem('padding',createInput('number','padding','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('width',createInput('number','width','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('height',createInput('number','height','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Left',createInput('number','left','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Top',createInput('number','top','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Border Radius',createInput('number','borderRadius','.btnExt', propertys.btnExitProperty),createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('border',
    createText('Width'),createInput('number','borderWidth','.btnExt', propertys.btnExitProperty),createUnitsSelect(),
    createText('Style'),createSelect('borderStyle','.btnExt',borderStyle, propertys.btnExitProperty),
    createText('Color'),createInput('color','borderColor','.btnExt', propertys.btnExitProperty)
    )
buttonsExitSets.addSidebarGroupItem('background Color',createInput('color','backgroundColor','.btnExt', propertys.btnExitProperty,disableGradient))
buttonsExitSets.addSidebarGroupItem('Color',createInput('color','color','.btnExt', propertys.btnExitProperty))
buttonsExitSets.addSidebarGroupItem('Background gradient',createLinearGradient('.btnExt'))

const buttonExitHover = new FormSettings('Exit Button Hover')
buttonExitHover.create()
buttonExitHover.addSidebarGroupItem('Background color',createInputHover('color','backgroundColor', propertys.btnExitPropertyHover))
buttonExitHover.addSidebarGroupItem('Color',createInputHover('color','color', propertys.btnExitPropertyHover))
buttonExitHover.addSidebarGroupItem('Width',createInputHover('number','width', propertys.btnExitPropertyHover),createUnitsSelect())
buttonExitHover.addSidebarGroupItem('Height',createInputHover('number','height', propertys.btnExitPropertyHover),createUnitsSelect())







export {addInputButton, addRadioButton, addCheckboxButton}