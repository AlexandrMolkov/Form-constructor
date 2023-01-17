import { propertys, form } from "./main.js"
import { disableGradient, textAlign, createInput, createInputHover, createUnitsSelect, createText, createSelect, createTextContentInput, createInputBoxShadow, createInputTextShadow, createLinearGradient } from "./functions/sidebarFunctions.js"

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



class FormSettings {
    constructor(title) {
        this.title = title
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
formSets.addSidebarGroupItem('Background Color', createInput('color', 'backgroundColor', '.form', propertys.formPropertys, disableGradient,'bgcform'))
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
formTitle.addSidebarGroupItem('Title Color', createInput('color', 'color', '.form__text', propertys.formTextPropertys,null,'clrtitleform'))
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
inputsSets.addSidebarGroupItem('Background Color', createInput('color', 'backgroundColor', '.input', propertys.inputsPropertys, null,'clrform'))
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
buttonsSets.addSidebarGroupItem('background Color', createInput('color', 'backgroundColor', '.btnSubm', propertys.btnSubmitProperty, null, 'submitform'))
buttonsSets.addSidebarGroupItem('Color', createInput('color', 'color', '.btnSubm', propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Background gradient', createLinearGradient('.btnSubm',propertys.btnSubmitProperty))
buttonsSets.addSidebarGroupItem('Transform', createInputHover('textarea', 'transform', propertys.btnSubmitProperty, {width:'100%'}))
buttonsSets.addSidebarGroupItem('Transform button text', createInputHover('textarea', 'transform', propertys.btnSubmitTextProperty, {width:'100%'}))

// Hover
const buttonsSetsHover = new FormSettings('Submit Button Hover')
buttonsSetsHover.create()
buttonsSetsHover.addSidebarGroupItem('Background color', createInputHover('color', 'backgroundColor', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Color', createInputHover('color', 'color', propertys.btnSubmitPropertyHover))
buttonsSetsHover.addSidebarGroupItem('Width', createInputHover('number', 'width', propertys.btnSubmitPropertyHover), createUnitsSelect())
buttonsSetsHover.addSidebarGroupItem('Height', createInputHover('number', 'height', propertys.btnSubmitPropertyHover), createUnitsSelect())
buttonsSetsHover.addSidebarGroupItem('Transform', createInputHover('textarea', 'transform', propertys.btnSubmitPropertyHover, {width:'100%'}))
buttonsSetsHover.addSidebarGroupItem('Transform button text', createInputHover('textarea', 'transform', propertys.btnSubmitTextPropertyHover, {width:'100%'}))


// Exit button
const buttonsExitSets = new FormSettings('Exit Button')
buttonsExitSets.create()
buttonsExitSets.addSidebarGroupItem('padding', createInput('number', 'padding', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('width', createInput('number', 'width', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('height', createInput('number', 'height', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Right', createInput('number', 'right', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Top', createInput('number', 'top', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('Border Radius', createInput('number', 'borderRadius', '.btnExt', propertys.btnExitProperty), createUnitsSelect())
buttonsExitSets.addSidebarGroupItem('border',
    createText('Width'), createInput('number', 'borderWidth', '.btnExt', propertys.btnExitProperty), createUnitsSelect(),
    createText('Style'), createSelect('borderStyle', '.btnExt', borderStyles, propertys.btnExitProperty),
    createText('Color'), createInput('color', 'borderColor', '.btnExt', propertys.btnExitProperty)
)
buttonsExitSets.addSidebarGroupItem('background Color', createInput('color', 'backgroundColor', '.btnExt', propertys.btnExitProperty, disableGradient))
buttonsExitSets.addSidebarGroupItem('Background gradient', createLinearGradient('.btnExt'))

// Hover
const buttonExitHover = new FormSettings('Exit Button Hover')
buttonExitHover.create()
buttonExitHover.addSidebarGroupItem('Background color', createInputHover('color', 'backgroundColor', propertys.btnExitPropertyHover))
buttonExitHover.addSidebarGroupItem('Width', createInputHover('number', 'width', propertys.btnExitPropertyHover), createUnitsSelect())
buttonExitHover.addSidebarGroupItem('Height', createInputHover('number', 'height', propertys.btnExitPropertyHover), createUnitsSelect())

// Exit button pseudo elements
const buttonExitPseudo = new FormSettings('Exit Before & After')
buttonExitPseudo.create()
buttonExitPseudo.addSidebarGroupItem('Color', createInput('color', 'background', '.btnExt-pseudo', propertys.btnExitPseudo))
buttonExitPseudo.addSidebarGroupItem('Width', createInput('number', 'height', '.btnExt-pseudo', propertys.btnExitPseudo), createUnitsSelect())

const buttonExitPseudoHover = new FormSettings('Exit Before & After Hover')
buttonExitPseudoHover.create()
buttonExitPseudoHover.addSidebarGroupItem('Color', createInputHover('color', 'background', propertys.btnExitPseudoHover))
buttonExitPseudoHover.addSidebarGroupItem('Width', createInputHover('number', 'height',  propertys.btnExitPseudoHover), createUnitsSelect())




export { addInputButton, addRadioButton, addCheckboxButton }