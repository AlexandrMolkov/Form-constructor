

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

export function disableGradient(target) {
    target.style.background = ''
    document.formGradientUse = false
}

export function textAlign(target, propertys) {
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

export function createInput(type, property, target, propertys, func) {

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

export function createInputHover(type, property, propertys) {

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

export function createUnitsSelect(propertys, values = ['px', 'em', 'rem', '%']) {

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

export function createText(text) {
    const textElem = document.createElement('p')
    textElem.classList.add('sidebar-group__text')
    textElem.textContent = text
    return textElem
}

export function createSelect(property, target, selectValues, prop) {

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

export function createTextContentInput(target, defaultVal) {

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

export function createInputBoxShadow(target, prop) {

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
export function createInputTextShadow(target, prop) {

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

export function createLinearGradient(target, prop) {

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