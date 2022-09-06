"use strict"

let autoId = 1;
const formElements = []

const formSettings = document.querySelectorAll('.form-settings')
const form = document.querySelector(`.form`)





    form.style.cssText = `
        margin = "0 auto"
        width = "300px";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
    `


const inputsSettings = {
    textAlign: 'left',
    padding: '5px 10px',
    borderRadius: '50px' 
}