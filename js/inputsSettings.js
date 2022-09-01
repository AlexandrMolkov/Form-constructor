"use strict"

///////////////////////////////////////////////////////////////////// Inputs Border Radius



{
    const form = document.querySelector(`.form`)

    const inputInputBR = document.querySelector(`#inputsBR`)
    const selectInputBR = document.querySelector(`#selectInputsBR`)

    let formInputs = form.querySelectorAll('input')


    inputInputBR.addEventListener(`input`,()=>{
        formInputs = form.querySelectorAll('input')
        formInputs.forEach((e)=>{
            const newValue = inputInputBR.value + selectInputBR.value;

            e.style.borderRadius = newValue
            inputsSettings.borderRadius = newValue
        })
        
    })
    selectInputBR.addEventListener(`change`,()=>{
        if (selectInputBR.value == 'inherit') {
            inputInputBR.setAttribute("disabled", "disabled");
            inputInputBR.value = ''
            formInputs.style.borderRadius = 'inherit';
            
        } else {
            inputInputBR.removeAttribute("disabled", "disabled");
            formInputs.forEach((e)=>{
                e.style.borderRadius = inputInputBR.value + selectInputBR.value;
                
            })
        }
    })

}
///////////////////////////////////////////////////////////////////// Inputs paddings



{
    const formInputsPaddingT = document.querySelector(`#formInputsPaddingT`)
    const selectFormInputsPaddingT = document.querySelector(`#selectFormInputsPaddingT`)
    const formInputsPaddingB = document.querySelector(`#formInputsPaddingB`)
    const selectFormInputsPaddingB = document.querySelector(`#selectFormInputsPaddingB`)
    const formInputsPaddingL = document.querySelector(`#formInputsPaddingL`)
    const selectFormInputsPaddingL = document.querySelector(`#selectFormInputsPaddingL`)
    const formInputsPaddingR = document.querySelector(`#formInputsPaddingR`)
    const selectFormInputsPaddingR = document.querySelector(`#selectFormInputsPaddingR`)

    formInputsPaddingT.addEventListener(`input`,()=>{
        form.querySelectorAll('input').forEach((e)=>{
            e.style.paddingTop = formInputsPaddingT.value + selectFormInputsPaddingT.value;
        })
    })

    formInputsPaddingB.addEventListener(`input`,()=>{
        form.querySelectorAll('input').forEach((e)=>{
            e.style.paddingBottom = formInputsPaddingB.value + selectFormInputsPaddingB.value;
        })
    })
    formInputsPaddingL.addEventListener(`input`,()=>{
        form.querySelectorAll('input').forEach((e)=>{
            e.style.paddingLeft = formInputsPaddingL.value + selectFormInputsPaddingL.value;
        })
    })
    formInputsPaddingR.addEventListener(`input`,()=>{
        form.querySelectorAll('input').forEach((e)=>{
            e.style.paddingRight = formInputsPaddingR.value + selectFormInputsPaddingR.value;
        })
    })


/*     selectFormInputsPaddingT.addEventListener(`change`,()=>{
        if (selectFormInputsPaddingT.value == 'inherit') {
            formInputsPaddingT.setAttribute("disabled", "disabled");
            formInputsPaddingT.value = ''
            form.style.paddingTop = 'inherit';
        } else {
            formInputsPaddingT.removeAttribute("disabled", "disabled");
            form.style.paddingTop = formInputsPaddingT.value + selectFormInputsPaddingT.value;
        }
    }) */

    

}
/*
selectFormPaddingB.addEventListener(`change`,()=>{
    if (selectFormPaddingB.value == 'inherit') {
        inputFormPaddingB.setAttribute("disabled", "disabled");
        inputFormPaddingB.value = ''
        form.style.paddingBottom = 'inherit';
    } else {
        inputFormPaddingB.removeAttribute("disabled", "disabled");
        form.style.paddingBottom = inputFormPaddingB.value + selectFormPaddingB.value;
    }
})
selectFormPaddingL.addEventListener(`change`,()=>{
    if (selectFormPaddingL.value == 'inherit') {
        inputFormPaddingL.setAttribute("disabled", "disabled");
        inputFormPaddingL.value = ''
        form.style.paddingLeft = 'inherit';
    } else {
        inputFormPaddingL.removeAttribute("disabled", "disabled");
        form.style.paddingLeft = inputFormPaddingL.value + selectFormPaddingL.value;
    }
})
selectFormPaddingR.addEventListener(`change`,()=>{
    if (selectFormPaddingR.value == 'inherit') {
        inputFormPaddingR.setAttribute("disabled", "disabled");
        inputFormPaddingR.value = ''
        form.style.paddingRight = 'inherit';
    } else {
        inputFormPaddingR.removeAttribute("disabled", "disabled");
        form.style.paddingRight = inputFormPaddingR.value + selectFormPaddingR.value;
    }
})

*/

