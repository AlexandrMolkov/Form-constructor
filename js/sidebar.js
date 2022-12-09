import { propertys, form } from "./main.js"

"use strict"

const sidebar = document.createElement('aside')
sidebar.id = 'sidebar'
sidebar.classList.add('sidebar')
sidebar.classList.add('scroll')
document.querySelector('.wrapper').prepend(sidebar)

const topPanel = document.createElement('div')
topPanel.classList.add('topPanel')
document.querySelector('.main').prepend(topPanel)

const addInputButton = document.createElement('button')
addInputButton.classList.add('add-input', 'btn')
addInputButton.id = 'addInput'
addInputButton.textContent = 'Add input'
topPanel.append(addInputButton)


const addRadioButton = document.createElement('button')
addRadioButton.classList.add('add-input', 'btn')
addRadioButton.id = 'addRadio'
addRadioButton.textContent = 'Add radio'
topPanel.append(addRadioButton)

const addCheckboxButton = document.createElement('button')
addCheckboxButton.classList.add('add-input', 'btn')
addCheckboxButton.id = 'addCheckbox'
addCheckboxButton.textContent = 'Add Checkbox'
topPanel.append(addCheckboxButton)





sidebar.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('select__li') || e.target.classList.contains('select__input')) {
        if (document.formGradientUse) {
            e.target.style.background = propertys.formPropertys.background
        } else {
            e.target.style.background = propertys.formPropertys.backgroundColor
        }

    }

})
sidebar.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('select__li') || e.target.classList.contains('select__input')) {
        e.target.style.background = 'white'
    }
})


const getValues = (target, parent, property) => {

    let parentValue = document.querySelector(parent).offsetWidth
    if (property === 'borderRadius') parentValue = target.offsetWidth
    const targetValue = parseInt(getComputedStyle(target)[property])

    return {
        parentValue,
        targetValue
    }
}

const percentToPx = (parent, target, property, propertys) => {
    const t = document.querySelector(target)
    /*   const {parentValue, targetValue} = getValues(t, parent, property, propertys)
        let value = parentValue * (pxToPercent(parent, target, property, propertys) / 100) */
    let value = parseInt(getComputedStyle(t)[property])
    return value
}
const pxToPercent = (parent, target, property, propertys) => {
    const t = document.querySelector(target)
    const { parentValue, targetValue } = getValues(t, parent, property, propertys)
    return (targetValue * 100) / parentValue
}
const percentToEm = (parent, target, property, propertys) => {
    const targetElement = document.querySelector(target)
    let em = parseInt(getComputedStyle(targetElement).fontSize)
    if (property === 'fontSize') em = parseInt(getComputedStyle(targetElement.parentElement).fontSize)
    const targetValue = parseInt(getComputedStyle(document.querySelector(target))[property])
    return targetValue / em
}
const pxToEm = (parent, target, property, propertys) => {
    const targetElement = document.querySelector(target)
    const parentElement = targetElement.parentElement
    /* parentElement.prepend(block) */
    /* targetElement.prepend(block) */
    /*  const em = block.offsetWidth */
    let em = parseInt(getComputedStyle(targetElement).fontSize)
    if (property === 'fontSize') em = parseInt(getComputedStyle(parentElement).fontSize)
    return parseInt(getComputedStyle(targetElement)[property]) / em
    /* return parseInt(getComputedStyle(targetElement)[property]) / pEm */
}
const toRem = (target, property) => {
    const targ = document.querySelector(target)
    const rem = parseInt(getComputedStyle(document.body).fontSize)
    const { targetValue } = getValues(targ, '.result', property, propertys)

    return targetValue / rem
}

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
        title.classList.add('form-settings__label')
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

    addSidebarGroupItem(groupItemTitleContent, ...content) {

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

function changeProperty(inp, propertys) {
    const targets = document.querySelectorAll(`${inp.getAttribute('data-target')}`)
    targets.forEach((target) => {
        const units = inp.nextElementSibling?.firstChild?.value

        if (inp.getAttribute('data-property') == 'backgroundColor' || inp.getAttribute('data-property') == 'color') {
            const a = 1
            target.style[inp.getAttribute('data-property')] = `rgba(${hex2rgb(inp.value).r},${hex2rgb(inp.value).g},${hex2rgb(inp.value).b},${a})`
            propertys[inp.getAttribute('data-property')] = `rgba(${hex2rgb(inp.value).r},${hex2rgb(inp.value).g},${hex2rgb(inp.value).b},${a})`
        } else {

            target.style[inp.getAttribute('data-property')] = inp.value + (units ? units : "")

            propertys[inp.getAttribute('data-property')] = inp.value + (units ? units : "")
        }

    })
}

function disableGradient(target) {
    target.style.background = ''
    document.formGradientUse = false
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

    div.addEventListener(`click`, (e) => {
        const value = e.target.dataset.value
        document.querySelectorAll(e.target.parentElement.dataset.target)
            .forEach((target) => {
                target.style.textAlign = value
            })
        if (propertys) propertys.textAlign = value
    })

    return div

}

function createInput(type, property, target, propertys, func) {

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type', type)
    input.setAttribute('data-property', property)
    input.setAttribute('data-target', target)
    if (type !== 'color') {
        input.value = parseInt(propertys[property]) ? parseInt(propertys[property]) : 0
    } else {
        input.value = propertys[property]

    }

    input.addEventListener('input', (ev) => {
        if (func) func(document.querySelector(target))
        changeProperty(ev.target, propertys)

    })

    if (input.getAttribute('type') === 'color') input.style.width = '100%'
    return input
}

function createInputHover(type, property, propertys) {

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type', type)
    input.setAttribute('data-property', property)
    if (type !== 'color') {
        input.value = parseInt(propertys[property]) ? parseInt(propertys[property]) : 0
    } else {
        input.value = propertys[property]
    }

    input.addEventListener('input', (ev) => {
        propertys[property] = ev.target.value + (ev.target.nextElementSibling?.firstChild?.value ? ev.target.nextElementSibling.firstChild.value : '')
    })

    if (input.getAttribute('type') === 'color') input.style.width = '100%'
    return input
}

function createUnitsSelect(propertys, values = ['px', 'em', 'rem', '%']) {

    const select = document.createElement('div')
    select.classList.add('select')
    select.classList.add('units')

    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type', 'text')
    selectInput.setAttribute('readonly', '')
    select.append(selectInput)

    const ul = document.createElement('ul')
    ul.classList.add('select__ul')

    function createLi(...val) {                         //создаются элементы списка (селекта)               
        const elements = []
        val.forEach((elem) => {
            const li = document.createElement('li')
            li.classList.add('select__li')
            li.setAttribute('data-value', elem)
            li.textContent = elem

            elements.push(li)
        })
        return elements
    }
    if (values.length > 1) {
        const lies = createLi(...values)  // элементы, значения установятся как 'data-value' 
        select.append(ul)                               // список в селект (div class="select")  
        lies.forEach((li) => ul.append(li))             // элементы списка в список   
        lies[0].parentElement.previousElementSibling.value = lies[0].dataset.value
        lies.forEach((li) => {
            li.addEventListener('click', () => {

                if (li.parentElement.previousElementSibling.value === li.dataset.value) return null // если выбранные юнитсы соответствуют текущим

                const unitsInput = li.parentElement.previousElementSibling
                const valueInput = unitsInput.parentElement.previousElementSibling
                const targetProperty = valueInput.dataset.property
                const lastUnitsValue = unitsInput.value
                unitsInput.value = li.dataset.value

                if (lastUnitsValue === 'px') {
                    switch (li.dataset.value) {
                        case '%': valueInput.value = pxToPercent('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'em': valueInput.value = pxToEm('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'rem': valueInput.value = toRem(valueInput.dataset.target, targetProperty); break;
                    }
                } else if (lastUnitsValue === '%') {
                    switch (li.dataset.value) {
                        case 'px': valueInput.value = percentToPx('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'em': valueInput.value = percentToEm('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'rem': valueInput.value = toRem(valueInput.dataset.target, targetProperty); break;
                    }
                } else if (lastUnitsValue === 'em') {
                    switch (li.dataset.value) {
                        case 'px': valueInput.value = percentToPx('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case '%': valueInput.value = pxToPercent('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'rem': valueInput.value = toRem(valueInput.dataset.target, targetProperty); break;
                    }
                } else if (lastUnitsValue === 'rem') {
                    switch (li.dataset.value) {
                        case 'px': valueInput.value = percentToPx('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case '%': valueInput.value = pxToPercent('.result', valueInput.dataset.target, targetProperty, propertys); break;
                        case 'em': valueInput.value = percentToEm('.result', valueInput.dataset.target, targetProperty, propertys); break;
                    }
                }
                changeProperty(valueInput, propertys)
            })
        })
    } else {
        selectInput.value = values[0]
    }

    return select
}

function createText(text) {
    const textElem = document.createElement('p')
    textElem.classList.add('sidebar-group__text')
    textElem.textContent = text
    return textElem
}

function createSelect(property, target, selectValues, prop) {

    const select = document.createElement('div')
    select.classList.add('select')
    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type', 'text')
    selectInput.setAttribute('readonly', '')
    selectInput.setAttribute('data-property', property)
    selectInput.setAttribute('data-target', target)
    select.append(selectInput)
    selectInput.value = prop[property]
    applyProperty(prop)

    function applyProperty(propertys) {
        const targets = document.querySelectorAll(`${selectInput.getAttribute('data-target')}`)
        targets.forEach((target) => {

            target.style[selectInput.getAttribute('data-property')] = selectInput.value

        })
        propertys[selectInput.getAttribute('data-property')] = selectInput.value

    }

    const ul = document.createElement('ul')
    ul.classList.add('select__ul')

    function createLi(...val) {
        const elements = []
        val.forEach((elem) => {
            const li = document.createElement('li')
            li.classList.add('select__li')
            li.setAttribute('data-value', elem)
            li.textContent = elem

            elements.push(li)
        })
        return elements
    }
    const lies = createLi(...selectValues)

    lies.forEach((li) => ul.append(li))
    select.append(ul)

    lies.forEach((li) => {

        li.addEventListener('click', () => {
            li.parentElement.previousElementSibling.value = li.dataset.value
            applyProperty(prop)
        })
    })

    return select
}

function createTextContentInput(target, defaultVal) {

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.style.width = '100%'
    input.value = defaultVal
    const targetElement = document.querySelector(target)

    input.addEventListener('input', () => {
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

function createInputBoxShadow(target, prop) {

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
        for (let attr in attributes) {
            newInput.setAttribute(attr, attributes[attr])
        }
        newInput.value = propertys[property]

        inputsWrapper.append(createText(text))
        inputsWrapper.append(newInput)
        if (attributes.type === 'number') {
            inputsWrapper.append(createUnitsSelect(prop, ['px']))
        }


        newInput.addEventListener('input', (e) => {
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
function createInputTextShadow(target, prop) {

    let targetElements = document.querySelectorAll(target)

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


    function createShadowInputs() {

        return document.createElement('input')
    }

    for (let i = 0; i < Object.keys(propertys).length; i++) {
        let newInput = createShadowInputs()
        newInput.setAttribute('type', 'number')
        newInput.value = propertys[Object.keys(propertys)[i]]
        inputs.push(newInput)
        inputsWrapper.append(newInput)
    }
    inputs.at(-1).setAttribute('type', 'color')
    inputs.at(-2).setAttribute('type', 'range')
    inputs.at(-2).setAttribute('min', '0')
    inputs.at(-2).setAttribute('max', '1')
    inputs.at(-2).setAttribute('step', '0.1')

    inputs.forEach((el, id) => {
        const propertyKeys = Object.keys(propertys)
        el.addEventListener('input', (e) => {
            propertys[propertyKeys[id]] = e.target.value;
            applyValue();
        })

    })

    const applyValue = () => {

        finalValue = `
            ${propertys.xOffset}px 
            ${propertys.yOffset}px 
            ${propertys.blurValue}px 
            rgba(${hex2rgb(propertys.color).r}, ${hex2rgb(propertys.color).g}, ${hex2rgb(propertys.color).b},  ${propertys.alpha})`

        prop.textShadow = finalValue
        let targetElements = document.querySelectorAll(target)
        targetElements.forEach((e) => {
            e.style.textShadow = finalValue
        })

    }

    return inputsWrapper
}

function createLinearGradient(target, prop) {

    let ElementTarget

    setTimeout(() => {
        ElementTarget = document.querySelector(target)
    }, 1000);

    const inputsWrapper = document.createElement('div')

    const gradientPropertys = {
        deg: '140deg',
        color1: '#fbfe48',
        color2: '#67db29'
    }
    const applychange = function () {
        const value = `linear-gradient(
            ${gradientPropertys.deg}deg, ${gradientPropertys.color1}, ${gradientPropertys.color2})`;
        ElementTarget.style.background = value
        prop.background = value
    }

    const degInput = document.createElement('input')
    degInput.setAttribute('type', 'number')
    degInput.setAttribute('type', 'range')
    degInput.setAttribute('min', '0')
    degInput.setAttribute('max', '360')
    degInput.value = gradientPropertys.deg
    degInput.addEventListener('input', () => {
        gradientPropertys.deg = degInput.value
        document.formGradientUse = true
        applychange()
    })

    inputsWrapper.append(createText('Degrees'))
    inputsWrapper.append(degInput)

    const color1Input = document.createElement('input')
    color1Input.setAttribute('type', 'color')
    color1Input.value = gradientPropertys.color1
    color1Input.addEventListener('input', () => {
        document.formGradientUse = true
        gradientPropertys.color1 = color1Input.value
        applychange()
    })
    inputsWrapper.append(color1Input)

    const color2Input = document.createElement('input')
    color2Input.setAttribute('type', 'color')
    color2Input.value = gradientPropertys.color2
    color2Input.addEventListener('input', () => {
        document.formGradientUse = true
        gradientPropertys.color2 = color2Input.value
        applychange()
    })
    inputsWrapper.append(color2Input)

    return inputsWrapper
}


const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']
const weight = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
const fontStyles = ['normal', 'italic', 'oblique', 'inherit']
const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse']

// Form
const formSets = new FormSettings('Form')
formSets.create()
formSets.addSidebarGroupItem('width', createInput('number', 'width', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys))
formSets.addSidebarGroupItem('padding',
    createText('Top'), createInput('number', 'paddingTop', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys),
    createText('Bottom'), createInput('number', 'paddingBottom', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys),
    createText('Left'), createInput('number', 'paddingLeft', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys),
    createText('Right'), createInput('number', 'paddingRight', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys)
)
formSets.addSidebarGroupItem('Background Color', createInput('color', 'backgroundColor', '.form', propertys.formPropertys, disableGradient))
formSets.addSidebarGroupItem('Background gradient', createLinearGradient('.form', propertys.formPropertys))
formSets.addSidebarGroupItem('Shadow', createInputBoxShadow('.form', propertys.formPropertys))
formSets.addSidebarGroupItem('border Radius', createInput('number', 'borderRadius', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys))
formSets.addSidebarGroupItem('border',
    createText('Width'), createInput('number', 'borderWidth', '.form', propertys.formPropertys), createUnitsSelect(propertys.formPropertys),
    createText('Style'), createSelect('borderStyle', '.form', borderStyles, propertys.formPropertys),
    createText('Color'), createInput('color', 'borderColor', '.form', propertys.formPropertys)
)

// Form Title
const formTitle = new FormSettings('Title')
formTitle.create()
formTitle.addSidebarGroupItem('Title', createTextContentInput('.form__text', 'Hello!'))
formTitle.addSidebarGroupItem('Align', textAlign('.form__text'))
formTitle.addSidebarGroupItem('Title Font Size', createInput('number', 'fontSize', '.form__text', propertys.formTextPropertys), createUnitsSelect(propertys.formTextPropertys, ['px', 'em', 'rem']))
formTitle.addSidebarGroupItem('Title Color', createInput('color', 'color', '.form__text', propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Weight', createSelect('fontWeight', '.form__text', weight, propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Style', createSelect('fontStyle', '.form__text', fontStyles, propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Shadow', createInputTextShadow('.form__text', propertys.formTextPropertys))
formTitle.addSidebarGroupItem('Title Margin Bottom', createInput('number', 'marginBottom', '.form__text', propertys.formTextPropertys), createUnitsSelect())


// Inputs 
const inputsSets = new FormSettings('Inputs')
inputsSets.create()
inputsSets.addSidebarGroupItem('padding', createInput('number', 'padding', '.input', propertys.inputsPropertys), createUnitsSelect())
inputsSets.addSidebarGroupItem('Border-Radius', createInput('number', 'borderRadius', '.input', propertys.inputsPropertys), createUnitsSelect())
inputsSets.addSidebarGroupItem('border',
    createText('Width'), createInput('number', 'borderWidth', '.input', propertys.inputsPropertys), createUnitsSelect(),
    createText('Style'), createSelect('borderStyle', '.input', borderStyles, propertys.inputsPropertys),
    createText('Color'), createInput('color', 'borderColor', '.input', propertys.inputsPropertys)
)
inputsSets.addSidebarGroupItem('Color', createInput('color', 'color', '.input', propertys.inputsPropertys))
inputsSets.addSidebarGroupItem('Background Color', createInput('color', 'backgroundColor', '.input', propertys.inputsPropertys))
inputsSets.addSidebarGroupItem('Align', textAlign('.input', propertys.nputsPropertys))

// Input group
const inputsGroupSets = new FormSettings('Inputs-group')
inputsGroupSets.create()
inputsGroupSets.addSidebarGroupItem('Margin Bottom', createInput('number', 'marginBottom', '.input-group', propertys.inputGroupPropertys), createUnitsSelect())
inputsGroupSets.addSidebarGroupItem('Flex Direction', createSelect('flexDirection', '.input-group', flexDirections, propertys.inputGroupPropertys))

// Input label
const InputLabel = new FormSettings('Inputs-label')
InputLabel.create()
InputLabel.addSidebarGroupItem('Font-size', createInput('number', 'fontSize', '.label', propertys.inputLabelPropertys), createUnitsSelect(propertys.inputLabelPropertys, ['px', 'em', 'rem']))
InputLabel.addSidebarGroupItem('Color', createInput('color', 'color', '.label', propertys.inputLabelPropertys))
InputLabel.addSidebarGroupItem('Weight', createSelect('fontWeight', '.label', weight, propertys.inputLabelPropertys))
InputLabel.addSidebarGroupItem('Style', createSelect('fontStyle', '.label', fontStyles, propertys.inputLabelPropertys))
InputLabel.addSidebarGroupItem('Shadow', createInputTextShadow('.label', propertys.inputLabelPropertys))


// Submit Buton
const buttonsSets = new FormSettings('Submit Button')
buttonsSets.create()
buttonsSets.addSidebarGroupItem('padding', createInput('number', 'padding', '.btnSubm', propertys.btnSubmitProperty), createUnitsSelect())
buttonsSets.addSidebarGroupItem('width', createInput('number', 'width', '.btnSubm', propertys.btnSubmitProperty), createUnitsSelect())
buttonsSets.addSidebarGroupItem('height', createInput('number', 'height', '.btnSubm', propertys.btnSubmitProperty), createUnitsSelect())
buttonsSets.addSidebarGroupItem('background Color', createInput('color', 'backgroundColor', '.btnSubm', propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Color', createInput('color', 'color', '.btnSubm', propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Background gradient', createLinearGradient('.btnSubm'))

// Hover
const buttonsSetsHover = new FormSettings('Submit Button Hover')
buttonsSetsHover.create()
buttonsSetsHover.addSidebarGroupItem('Background color', createInputHover('color', 'backgroundColor', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Color', createInputHover('color', 'color', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Width', createInputHover('number', 'width', propertys.btnSubmitPropertyHover), createUnitsSelect())
buttonsSetsHover.addSidebarGroupItem('Height', createInputHover('number', 'height', propertys.btnSubmitPropertyHover), createUnitsSelect())

// Exit buttom
const buttonsExitSets = new FormSettings('Exit Button')
buttonsExitSets.create()
buttonsExitSets.addSidebarGroupItem('padding', createInput('number', 'padding', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('width', createInput('number', 'width', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('height', createInput('number', 'height', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Left', createInput('number', 'left', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Top', createInput('number', 'top', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Border Radius', createInput('number', 'borderRadius', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('border',
    createText('Width'), createInput('number', 'borderWidth', '.btnExt', propertys.btnExitProperty), createUnitsSelect(),
    createText('Style'), createSelect('borderStyle', '.btnExt', borderStyles, propertys.btnExitProperty),
    createText('Color'), createInput('color', 'borderColor', '.btnExt', propertys.btnExitProperty)
)
buttonsExitSets.addSidebarGroupItem('background Color', createInput('color', 'backgroundColor', '.btnExt', propertys.btnExitProperty, disableGradient))
buttonsExitSets.addSidebarGroupItem('Color', createInput('color', 'color', '.btnExt', propertys.btnExitProperty))
buttonsExitSets.addSidebarGroupItem('Background gradient', createLinearGradient('.btnExt'))

// Hover
const buttonExitHover = new FormSettings('Exit Button Hover')
buttonExitHover.create()
buttonExitHover.addSidebarGroupItem('Background color', createInputHover('color', 'backgroundColor', propertys.btnExitPropertyHover))
buttonExitHover.addSidebarGroupItem('Color', createInputHover('color', 'color', propertys.btnExitPropertyHover))
buttonExitHover.addSidebarGroupItem('Width', createInputHover('number', 'width', propertys.btnExitPropertyHover), createUnitsSelect())
buttonExitHover.addSidebarGroupItem('Height', createInputHover('number', 'height', propertys.btnExitPropertyHover), createUnitsSelect())







export { addInputButton, addRadioButton, addCheckboxButton }