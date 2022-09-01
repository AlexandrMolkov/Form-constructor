"use strict"



function getResult() {
    //code.innerText = result.outerHTML
    //code.innerText = result.outerHTML.replace('value`,`value=""')
    code.innerText = form.outerHTML.replace('>`,`>\n')
}

const codeOut = document.querySelector(`#codeOut`)


document.querySelector(`#btnHtml`).addEventListener(`click`,outHtml)




const tabs = function(num){
    //console.log(num)

    let string ='';
    for(let i = 0; i < num; i++){
        string = string + `\t`
        //console.log(`loop`)
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
            numbOfTab++
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
            return newArr
        }
       // console.log(`just push(symb) : ` + symb)

        newArr.push(symb)

        return newArr
    },[]).join(``)
}



function outHtml() {

    codeOut.value = getNewString(form.outerHTML.replaceAll(/style="([^"]*)"/g,'')) 

}

function outCss() {
    const formText = form.querySelector(`.form__text`)
    const formInputGroup = form.querySelector(`.input-group`)
    const formInput = form.querySelector(`.input`)

    codeOut.value = `.form {\n \t ` + form.getAttribute('style') + `\n }`
    codeOut.value +=`\n.form__text {\n \t ` + formText.getAttribute('style') + `\n }`

    codeOut.value += formInputGroup && formInputGroup.getAttribute('style') ? `\n .form__text {\n \t ` + formInputGroup.getAttribute('style') + `\n }` : ``
    codeOut.value += formInput && formInput.getAttribute('style') ? `\n .form__text {\n \t ` + formInput.getAttribute('style') + `\n }` : ``
}


document.querySelector(`#btnСss`).addEventListener(`click`,outCss)