"use strict"

import {form, propertys} from "../main.js"
import rgbToHex from './rgb2hex.js'
import {changeProperty} from './sidebarFunctions.js'
import createFormInput from "./createFormInput.js"

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const Elements = [
    {
        element: form, 
        propertys: [
            'backgroundColor',
        ]
    },
    {        
        element: 'inputs', 
        propertys: [
            'backgroundColor',
        ]
    }
]


const random = () => {
  
   let fbgc = rgbToHex(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255))
   document.querySelector('#bgcform').value = fbgc
   changeProperty(document.querySelector('#bgcform'),propertys.formPropertys)

   let ftclr = rgbToHex(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255))
   document.querySelector('#clrform').value = ftclr
   changeProperty(document.querySelector('#clrform'),propertys.inputsPropertys)

   let ficlr = rgbToHex(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255))
   document.querySelector('#clrtitleform').value = ficlr
   changeProperty(document.querySelector('#clrtitleform'),propertys.formTextPropertys)

   let fsclr = rgbToHex(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255))
   document.querySelector('#submitform').value = fsclr
   changeProperty(document.querySelector('#submitform'),propertys.formTextPropertys)

/*    for(let count = 0 ; count < 3; count++) {
        createFormInput({ type: 'text', place: ':)', name: 'smile' })
   } */
}

export default random