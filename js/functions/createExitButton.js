import { propertys, form } from '../main.js'

export default function createExitButton() {
    const btn = document.createElement(`button`)
    btn.classList.add('btn', 'btnExt')
/*     btn.innerHTML = `
        <svg class="btn-svg" style="enable-background:new 0 0 132 131;" version="1.1" viewBox="0 0 132 131" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
        <![CDATA[
            .st0{fill:#EF3E42;}
            .st1{fill:#FFFFFF;}
            .st2{fill:none;}
            .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
        ]]>
        </style><defs/><polygon points="115,92.8 89.2,118.6 61.5,90.8 33.7,118.6 7.9,92.8 35.7,65 7.9,37.4 33.8,11.4 61.5,39.1 89.1,11.4 115,37.4   87.2,65 115,92.8 115,92.8 "/><rect class="st2" height="131" id="_x3C_Slice_x3E__100_"/></svg>
    ` 
*/

        const before = document.createElement('div')
        before.classList.add('btnExt-pseudo', 'btnExt-before')
        const after = document.createElement('div')
        after.classList.add('btnExt-pseudo', 'btnExt-after')

        btn.append(before)
        btn.append(after)

    btn.dataset.dntmove = 'true'
    form.append(btn)

    for (let property in propertys.btnExitProperty) {
        btn.style[property] = propertys.btnExitProperty[property]
    }
/*     for (let property in propertys.btnExitSvg) {
       btn.querySelector('.btn-svg').style[property] = propertys.btnExitSvg[property]
    } */

    // before & after
    for (let property in propertys.btnExitPseudo) {
        btn.querySelector('.btnExt-before').style[property] = propertys.btnExitPseudo[property]
    }
    for (let property in propertys.btnExitBefore) {
        btn.querySelector('.btnExt-before').style[property] = propertys.btnExitBefore[property]
    }
    for (let property in propertys.btnExitPseudo) {
        btn.querySelector('.btnExt-after').style[property] = propertys.btnExitPseudo[property]
    }
    for (let property in propertys.btnExitAfter) {
        btn.querySelector('.btnExt-after').style[property] = propertys.btnExitAfter[property]
    }

    btn.addEventListener('mouseover', () => {
        for (let property in propertys.btnExitPropertyHover) {
            btn.style[property] = propertys.btnExitPropertyHover[property]
        }
/*         for (let property in propertys.btnExitSvgHover) {
            btn.querySelector('.btn-svg').style[property] = propertys.btnExitSvgHover[property]
        } */
            // before & after
            for (let property in propertys.btnExitPseudo) {
                btn.querySelector('.btnExt-before').style[property] = propertys.btnExitPseudoHover[property]
            }
            for (let property in propertys.btnExitPseudo) {
                btn.querySelector('.btnExt-after').style[property] = propertys.btnExitPseudoHover[property]
            }
        
    })
    btn.addEventListener('mouseout', () => {
        for (let property in propertys.btnExitPropertyHover) {
            btn.style[property] = propertys.btnExitProperty[property]
        }
/*         for (let property in propertys.btnExitSvg) {
            btn.querySelector('.btn-svg').style[property] = propertys.btnExitSvg[property]
        } */

    // before & after
    for (let property in propertys.btnExitPseudo) {
        btn.querySelector('.btnExt-before').style[property] = propertys.btnExitPseudo[property]
    }
    for (let property in propertys.btnExitBefore) {
        btn.querySelector('.btnExt-before').style[property] = propertys.btnExitBefore[property]
    }
    for (let property in propertys.btnExitPseudo) {
        btn.querySelector('.btnExt-after').style[property] = propertys.btnExitPseudo[property]
    }
    for (let property in propertys.btnExitAfter) {
        btn.querySelector('.btnExt-after').style[property] = propertys.btnExitAfter[property]
    }
    })
    btn.addEventListener('click', (e) => {
        e.preventDefault()
    })
}