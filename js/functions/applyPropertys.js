export default function applyPropertys(element, propertys) {
    for (let property in propertys) {
        element.style[property] = propertys[property]
    }
}