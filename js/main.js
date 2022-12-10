"use strict"

let autoId = 1;
const formElements = []
const formSettings = document.querySelectorAll('.form-settings')

document.formGradientUse = false

function createForm() {

    const result = document.createElement('div')
    result.classList.add('result')

    const form = document.createElement('form')
    form.action = '#'
    const p = document.createElement('p')
    p.classList.add('form__text')
    p.textContent = 'Hello!'
    form.append(p)
    form.classList.add('form')
    result.append(form)

    document.querySelector('.main').prepend(result)

    return form
}
const form = createForm()

const propertys = {
    formPropertys: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 'calc(50% - 100px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: '#54a4f9',
        boxShadow: '3px 3px 15px 1px rgba(0,0,0,0.2)',
        paddingTop: '25px',
        paddingBottom: '25px',
        paddingLeft: '25px',
        paddingRight: '25px',
        borderRadius: '15px',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '0',
        fontSize: '30px',
    },
    formTextPropertys: {
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '30px'
    },
    inputsPropertys: {
        fontFamily: 'inherit',
        fontSize: '16px',
        borderRadius: '15px',
        padding: '5px 15px',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '0',
        width: '100%',
    },
    inputGroupPropertys: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '15px',
    },
    inputLabelPropertys: {
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        marginRight: '15px',
    },
    btnSubmitProperty: {
        padding: '0',
        border: '0',
        width: `120px`,
        height: `40px`,
        background: `white`,
        color: `black`,
        borderRadius: '25px',
        fontSize: '18px',
        textTransform: 'uppercase',
        transform: 'skewX(0deg) scale(1)',
        transition: 'all 0.3s'
    },
    btnSubmitTextProperty: {
        transform: 'skewX(0deg)',
        display: 'block',
        transition: 'all 0.3s'
    },
    btnSubmitTextPropertyHover: {
        transform: 'skewX(-15deg)',
    },
    btnSubmitPropertyHover: {
        cursor: 'pointer',
        transform: 'skewX(15deg) scale(1.2)'
    },
    btnExitProperty: {
        position: 'absolute',
        left: `86%`,
        top: `3px`,
        padding: '0',
        width: `40px`,
        height: `40px`,
        background: `transparent`,
        color: `black`,
        fontSize: '18px',
        textTransform: 'uppercase',
        transition: 'all 0.3s',
        borderRadius: '25px',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '0'
    },
    btnExitPropertyHover: {
        cursor: 'pointer',
        color: `red`
    },
}



export { propertys, form, autoId, formElements }


