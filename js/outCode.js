import {propertys, form} from "./main.js"

"use strict"



function getResult() {
    code.innerText = form.outerHTML.replace('>`,`>\n')
}

const codeOut = document.querySelector(`#codeOut`)


document.querySelector(`#btnHtml`).addEventListener(`click`,outHtml)




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

const satastast = new String('sdasd')

function outHtml() {
    codeOut.value = getNewString(form.outerHTML.replaceAll(/\s\s/g,''))
        .replaceAll(/style="([^"]*)"/g,'')
        .replaceAll(/data-index="([^"]*)"/g,'')
        .replaceAll(/<button class="btn-del" title="delete input" >[^"]*<\/button>/g,'') 
}

const str = new String('')

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
    codeOut.value += `\n .btnSubm {\n \t ` + btnSubm.getAttribute('style') + `\n }`
    codeOut.value += `\n .btnSubm:hover {\n ` + hovProp(propertys.btnSubmitPropertyHover) + `\n }`
    codeOut.value += `\n .btnExt {\n \t ` + btnExt.getAttribute('style') + `\n }`
    codeOut.value += `\n .btnExt:hover {\n ` + hovProp(propertys.btnExitPropertyHover) + `\n }`
}

document.querySelector(`#btnСss`).addEventListener(`click`,outCss)