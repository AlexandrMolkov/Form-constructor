"use strict"

class TextAlign {
    constructor(text,btnRight,btnCenter,btnLeft) {
        this.text = document.querySelector(text);
        this.btnRight = document.querySelector(btnRight);;
        this.btnCenter = document.querySelector(btnCenter);;
        this.btnLeft = document.querySelector(btnLeft);;
    }

    init() {
        
        this.btnRight.addEventListener('click', ()=> {
            this.text.style.textAlign = 'right'
        })
        this.btnCenter.addEventListener('click', ()=> {
            this.text.style.textAlign = 'center'
        })
        this.btnLeft.addEventListener('click', ()=> {
            this.text.style.textAlign = 'left'
        })
    }
}