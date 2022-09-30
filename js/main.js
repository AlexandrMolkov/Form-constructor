"use strict"

let autoId = 1;
const formElements = []

const formSettings = document.querySelectorAll('.form-settings')
const form = document.querySelector(`.form`)



const inputsSettings = {
    textAlign: 'left',
    padding: '5px 10px',
    borderRadius: '50px',
    border: {
        width: '',
        style: '',
        color: ''
    },
    color: '',
    backgroundColor: ''
}

const formPropertys = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: '#7fffd4',
    boxShadow: '3px 3px 15px 1px rgba(0,0,0,0.2)',
    padding: '25px',
    borderRadius: '15px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '0',
}

const formTextPropertys = {
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '15px'
}

const inputsPropertys = {
    font: 'inherit',
    border: '0',
    borderRadius: '5px',
    padding: '5px 10px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '0'
}

const btnSubmitProperty = {
    padding: '0',
    width: `120px`,
    height: `40px`,
    background: `white`,
    color: `black`,
    borderRadius: '25px',
    fontSize: '18px',
    textTransform: 'uppercase',
    transition: 'all 0.3s' 
}

const btnSubmitPropertyHover = {
    cursor: 'pointer',
    background: `green`,
    color: `white`,
}

const btnExitProperty = {
    position: 'absolute',
    left: `92%`,
    top: `-5%`,
    padding: '0',
    width: `40px`,
    height: `40px`,
    background: `red`,
    color: `black`,
    fontSize: '18px',
    textTransform: 'uppercase',
    transition: 'all 0.3s',
    borderRadius: '25px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '0'
}

const btnExitPropertyHover = {
    cursor: 'pointer',
    background: `green`,
    color: `white`,
}