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

function createInput(type,property,target){

    const input = document.createElement('input')
    input.classList.add('sidebar-group__input')
    input.classList.add('newinp')
    input.setAttribute('type',type)
    input.setAttribute('data-property',property)
    input.setAttribute('data-target',target)

    input.addEventListener('input',()=>{
        const targets = document.querySelectorAll(`${input.getAttribute('data-target')}`)
        targets.forEach((target)=>{
            const units = input.nextElementSibling?.firstChild?.value
            target.style[input.getAttribute('data-property')] = 
            input.value + (units ? units : "")
        })
    })

    return input
}

function createSelect(){

    const select = document.createElement('div')
    select.classList.add('select')


    const selectInput = document.createElement('input')
    selectInput.classList.add('select__input')
    selectInput.setAttribute('type','text')
    selectInput.setAttribute('readonly','')
    select.append(selectInput)

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
            /* ul.append(li) */
        })
        return elements
    }
    const lies = createLi('px','em','%','inherit')

    lies.forEach((li)=> ul.append(li) )
    select.append(ul)

    lies[0].parentElement.previousElementSibling.value = lies[0].dataset.value



    lies.forEach((li)=>{
        li.addEventListener('click',()=>{
            li.parentElement.previousElementSibling.value = li.dataset.value
        })
    })

    
    

    return select
}
function createInputText(text){
    const textElem = document.createElement('p')
    textElem.classList.add('sidebar-group__text')
    textElem.textContent = text
    return textElem
}

const formSets = new FormSettings('formSettingsTest')
formSets.create()
formSets.addSidebarGroupItem('padding',createInput('number','padding','.form'),createSelect())
formSets.addSidebarGroupItem('margin',createInput('number','margin','.form'),createSelect())
formSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.form'))
formSets.addSidebarGroupItem('border Radius',createInput('number','borderRadius','.form'),createSelect())
formSets.addSidebarGroupItem('border',
    createInputText('Width'),createInput('number','borderWidth','.form',),createSelect(),
    createInputText('Style'),createInput('text','borderStyle','.form',),
    createInputText('Color'),createInput('color','borderColor','.form',)
    )


const inputsSets = new FormSettings('Inputs')
inputsSets.create()
inputsSets.addSidebarGroupItem('padding',createInput('number','padding','.input'),createSelect())
inputsSets.addSidebarGroupItem('margin',createInput('number','margin','.input'),createSelect())
inputsSets.addSidebarGroupItem('Background Color',createInput('color','backgroundColor','.input'))

/* function addListeners(){
    const inputs = document.querySelectorAll('.newinp')
        inputs.forEach((inp)=> {
            inp.addEventListener('input',()=>{
                const targets = document.querySelectorAll(`${inp.getAttribute('data-target')}`)
                
                targets.forEach((target)=>{
                    const units = inp.nextElementSibling?.firstChild?.value
                    target.style[inp.getAttribute('data-property')] = 
                        inp.value + (units ? units : "")
                })
            })
        })
} */