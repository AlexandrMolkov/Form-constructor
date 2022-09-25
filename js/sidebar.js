const sidebar = document.querySelector('.sidebar')




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

function changeProperty(inp) {
    console.log()
    const targets = document.querySelectorAll(`${inp.getAttribute('data-target')}`)
    targets.forEach((target)=>{
        const units = inp.nextElementSibling?.firstChild?.value
        target.style[inp.getAttribute('data-property')] = inp.value + (units ? units : "")
        inputsSettings[inp.getAttribute('data-property')] = inp.value + (units ? units : "")
    })
}

function disableGradient() {
    form.style.background = ''
}

function textAlign(target) {
    div = document.createElement(`div`)
    div.setAttribute('data-target', target)
    div.classList.add('sidebar-group__input')
    btnLeft = document.createElement(`button`)
    btnLeft.classList.add('button-align', 'button-align-left')
    btnCenter = document.createElement(`button`)
    btnCenter.classList.add('button-align', 'button-align-center')
    btnRight = document.createElement(`button`)
    btnRight.classList.add('button-align', 'button-align-right')
    div.append(btnLeft)
    div.append(btnCenter)
    div.append(btnRight)

    btnLeft.addEventListener(`click`,(e)=>{
        document.querySelector(e.target.parentElement.dataset.target)
            .style.textAlign = 'left'
    })
    btnCenter.addEventListener(`click`,(e)=>{
        document.querySelector(e.target.parentElement.dataset.target)
            .style.textAlign = 'center'
    })
    btnRight.addEventListener(`click`,(e)=>{
        document.querySelector(e.target.parentElement.dataset.target)
            .style.textAlign = 'right'
    })

    return div

}

function createInput(type,property,target, defaultVal, func){

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type',type)
    input.setAttribute('data-property',property)
    input.setAttribute('data-target',target)
    if (type !== 'color') {
        input.value = parseInt(defaultVal)
    } else{
        input.value = defaultVal
    }

    input.addEventListener('input',(ev)=>{
        if(func) func()
        changeProperty(ev.target)
        
    })

    if(input.getAttribute('type') === 'color') input.style.width = '100%'

    return input
}

function createUnitsSelect(){

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
    const lies = createLi('px','em','%','inherit')  // элементы, значения установятся как 'data-value'       

    lies.forEach((li)=> ul.append(li) )             // элементы списка в список
    select.append(ul)                               // список в селект (div class="select")

    lies[0].parentElement.previousElementSibling.value = lies[0].dataset.value



    lies.forEach((li)=>{
        li.addEventListener('click',()=>{
            const unitsInput =  li.parentElement.previousElementSibling
            unitsInput.value = li.dataset.value
            changeProperty(unitsInput.parentElement.previousElementSibling)
        })
    })

    
    

    return select
}
function createText(text){
    const textElem = document.createElement('p')
    textElem.classList.add('sidebar-group__text')
    textElem.textContent = text
    return textElem
}

function cretateSelect(property,target,selectValues, current) {
    
    const select = document.createElement('div')
    select.classList.add('select')

    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type','text')
    selectInput.setAttribute('readonly','')
    selectInput.setAttribute('data-property',property)
    selectInput.setAttribute('data-target',target)
    select.append(selectInput)
    selectInput.value = current
    applyProperty()
    
    function applyProperty() {
        const targets = document.querySelectorAll(`${selectInput.getAttribute('data-target')}`)
        targets.forEach((target)=>{
            
            target.style[selectInput.getAttribute('data-property')] = selectInput.value

        })
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

    lies[0].parentElement.previousElementSibling.value = lies[0].dataset.value

    lies.forEach((li)=>{
        li.addEventListener('click',(e)=>{
            li.parentElement.previousElementSibling.value = li.dataset.value
            applyProperty()
            inputsSettings[e.target.parentElement.previousElementSibling.getAttribute('data-property')] 
            = e.target.parentElement.previousElementSibling.value
        })
    })
    selectInput.value = current
    return select
}

function cretateTextContentInput(target,defaultVal) {

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

function createInputBoxShadow(target){

    const targetElement = document.querySelector(target)

    const inputsWrapper = document.createElement('div')

    const propertys = {
        xOffset: 1,
        yOffset: 1,
        blurValue: 5,
        spread: 1,
        alpha: 0.7,
        color: '#000000'
    }

    let finalValue = `${propertys.xOffset}px ${propertys.yOffset}px ${propertys.blurValue}px ${propertys.spread}px ${propertys.color}`

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
    inputs[2].setAttribute('min','0')
    inputs.at(-1).setAttribute('type','color')
    inputs.at(-2).setAttribute('type','range')
    inputs.at(-2).setAttribute('min','0')
    inputs.at(-2).setAttribute('max','1')
    inputs.at(-2).setAttribute('step','0.05')

    inputs.forEach((el,id)=>{
        const propertyKeys = Object.keys(propertys)
        el.addEventListener('input',(e)=>{
            propertys[propertyKeys[id]] = e.target.value;
            applyValue(); 
        })
    
    })
   
    const applyValue = () => {
        finalValue = `
            ${propertys.xOffset}px 
            ${propertys.yOffset}px 
            ${propertys.blurValue}px 
            ${propertys.spread}px
            rgba(${hex2rgb(propertys.color).r}, ${hex2rgb(propertys.color).g}, ${hex2rgb(propertys.color).b},  ${propertys.alpha})`
            
        targetElement.style.boxShadow = finalValue

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
    const ElementTarget = document.querySelector(target)

    const inputsWrapper = document.createElement('div')

    const propertys = {
        deg: 90,
        color1: '#000000',
        color2: '#000000'
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
    degInput.addEventListener('input',()=>{
        propertys.deg = degInput.value
        applychange()
    })
    inputsWrapper.append(degInput)

    const color1Input = document.createElement('input')
        color1Input.setAttribute('type','color')
        color1Input.addEventListener('input',()=>{
            propertys.color1 = color1Input.value
            applychange()
    })
    inputsWrapper.append(color1Input)

    const color2Input = document.createElement('input')
        color2Input.setAttribute('type','color')
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
formSets.addSidebarGroupItem('width',createInput('number','width','.form', formPropertys.width),createUnitsSelect())
formSets.addSidebarGroupItem('padding',createInput('number','padding','.form', formPropertys.padding),createUnitsSelect())
formSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.form', formPropertys.backgroundColor,disableGradient))
formSets.addSidebarGroupItem('Background gradient',createLinearGradient('.form'))
formSets.addSidebarGroupItem('Shadow',createInputBoxShadow('.form'))
formSets.addSidebarGroupItem('border Radius',createInput('number','borderRadius','.form', formPropertys.borderRadius),createUnitsSelect())
formSets.addSidebarGroupItem('border',
    createText('Width'),createInput('number','borderWidth','.form', 0),createUnitsSelect(),
    createText('Style'),cretateSelect('borderStyle','.form',borderStyle),
    createText('Color'),createInput('color','borderColor','.form')
    )
const formTitle = new FormSettings('Title')
formTitle.create()
formTitle.addSidebarGroupItem('Title',cretateTextContentInput('.form__text','Hello!'))
formTitle.addSidebarGroupItem('Align', textAlign('.form__text'))
formTitle.addSidebarGroupItem('Title Font Size',createInput('number','fontSize','.form__text',formTextPropertys.fontSize),createUnitsSelect())
formTitle.addSidebarGroupItem('Title Color',createInput('color','color','.form__text',formTextPropertys.color))
formTitle.addSidebarGroupItem('Title Weight',cretateSelect('fontWeight','.form__text', weight, weight[6]))
formTitle.addSidebarGroupItem('Title Style',cretateSelect('fontStyle','.form__text', styles, styles[0]))
formTitle.addSidebarGroupItem('Title Shadow',createInputTextShadow('.form__text'))
formTitle.addSidebarGroupItem('Title Margin Bottom',createInput('number','marginBottom','.form__text',formTextPropertys.marginBottom),createUnitsSelect())

const inputsSets = new FormSettings('Inputs')
inputsSets.create()
inputsSets.addSidebarGroupItem('padding',createInput('number','padding','.input',inputsPropertys.padding),createUnitsSelect())
inputsSets.addSidebarGroupItem('Border-Radius',createInput('number','borderRadius','.input',inputsPropertys.borderRadius),createUnitsSelect())
inputsSets.addSidebarGroupItem('border',
    createText('Width'),createInput('number','borderWidth','.input',inputsPropertys.borderWidth),createUnitsSelect(),
    createText('Style'),cretateSelect('borderStyle','.input',borderStyle, inputsPropertys.borderStyle),
    createText('Color'),createInput('color','borderColor','.input',inputsPropertys.borderColor)
    )
inputsSets.addSidebarGroupItem('Color',createInput('color','color','.input',inputsPropertys.color))
inputsSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.input',inputsPropertys.backgroundColor))
