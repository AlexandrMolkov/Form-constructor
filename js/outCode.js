import {propertys, form} from "./main.js"

"use strict"



const CodeBlock = document.createElement('div')
const codeButtons = document.createElement('div')
const codeButtonHtml = document.createElement('button')
const codeButtonCss = document.createElement('button')
const codeOut = document.createElement('textarea')

CodeBlock.classList.add("code")
CodeBlock.id = "code" 

codeOut.classList.add("code__out")
codeOut.classList.add("scroll")
codeOut.id = 'codeout'

codeButtons.classList.add("code__buttons")
codeButtonHtml.classList.add("code__btn")
codeButtonCss.classList.add("code__btn")

codeButtonHtml.innerText = 'HTML'
codeButtonCss.innerText = 'CSS'

codeButtons.append(codeButtonHtml)
codeButtons.append(codeButtonCss)

CodeBlock.append(codeButtons)
CodeBlock.append(codeOut)
document.querySelector(`.main`).append(CodeBlock)


function getResult() {
    code.innerText = form.outerHTML.replace('>`,`>\n')
}


codeButtonHtml.addEventListener(`click`,outHtml)
codeButtonCss.addEventListener(`click`,outCss)



const tabs = function(num){

    let string ='';
    for(let i = 0; i < num; i++){
        string = string + `\t`
    }
    return string
}

const getNewString = function(string) {
    let numbOfTab = 0;
    
    const arr = string.split(``)

    return arr.reduce((newArr,symb,i)=>{
        if (symb === '<' && arr[i+1] !== '/') {

            //console.log(`arr[++i] is : ` + arr[i+1])
            newArr.push(tabs(numbOfTab) + symb)
            if (symb === '<' && arr[i+1] !== 'i'){   //проверка на инпут
                numbOfTab++
            }

            return newArr
        }
  
        if (symb === '<' && arr[i+1] === '/') { 
            numbOfTab-- 
            newArr.push(tabs(numbOfTab) + symb)
            return newArr
        }

        if (symb === '>') {
            //console.log(`symb === '>'`)
            newArr.push(symb + `\n`)
            /* alert() */
            /* newArr.push(`X\n` + symb) */
            return newArr
        }

        newArr.push(symb)

        return newArr
    },[]).join(``)
} 

function outHtml() {
    codeOut.value = getNewString(form.outerHTML.replaceAll(/\s\s/g,''))
        .replaceAll(/style="([^"]*)"/g,'')
        .replaceAll(/data-index="([^"]*)"/g,'')
        .replaceAll(/<button class="btn-del" title="delete input" >[^"]*<\/button>/g,'') 
}

const hovProp = (propertys) =>{

    let res = ''

    for(let property in propertys){
        if(property.search(/[A-Z]/) > - 1) {
            let newProperty = property.slice()
            const ind = newProperty.indexOf(newProperty[newProperty.search(/[A-Z]/)])
            const arr = newProperty.split('')
            arr.splice(ind, 0, "-")
            newProperty = arr.join('').toLowerCase()

            res = res + `\t${newProperty}: ${propertys[property]};\n`
            continue
        }
        res = res + `\t${property}: ${propertys[property]};\n`
    }
    return res
}

function outCss() {
    const formText = form.querySelector(`.form__text`)
    const formInputGroup = form.querySelector(`.input-group`)
    const formInput = form.querySelector(`.input`)
    const btnSubm = form.querySelector(`.btnSubm`)
    const btnExt = form.querySelector(`.btnExt`)

    codeOut.value = `.form {\n \t ` + form.getAttribute('style') + `\n }`
    codeOut.value +=`\n.form__text {\n \t ` + formText.getAttribute('style') + `\n }`
    codeOut.value += formInputGroup && formInputGroup.getAttribute('style') ? `\n .input-group {\n \t ` + formInputGroup.getAttribute('style') + `\n }` : ``
    codeOut.value += formInput && formInput.getAttribute('style') ? `\n .input {\n \t ` + formInput.getAttribute('style') + `\n }` : ``
    codeOut.value += `\n .btnSubm {\n \t ` + hovProp(propertys.btnSubmitProperty) + `\n }`
    codeOut.value += `\n .btnSubm:hover {\n ` + hovProp(propertys.btnSubmitPropertyHover) + `\n }`
    codeOut.value += `\n .btnSubm > span {\n \t ` + hovProp(propertys.btnSubmitTextProperty) + `\n }`
    codeOut.value += `\n .btnSubm:hover > span {\n ` + hovProp(propertys.btnSubmitTextPropertyHover) + `\n }`
    codeOut.value += `\n .btnExt {\n \t ` + hovProp(propertys.btnExitProperty) + `\n }`
    codeOut.value += `\n .btnExt:hover {\n ` + hovProp(propertys.btnExitPropertyHover) + `\n }`
   
}

