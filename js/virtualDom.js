class Element{
    constructor(type, props, children){
        this.type = type,
        this.props = props,
        this.children = children
    }
}

function createElement(type, props, children){
    return new Element(type, props, children)
}

// function setAtt(node, key, value){
//     if(key === 'value'){

//     }else if(key){}
// }

function render(vDom, father){
    const {type, props, children} = vDom
    const el = document.createElement(type)
    for(let key in props){
        el.setAttribute(key, props[key])
        // if(key === 'value' && (el.tagName === 'INPUT' || el.tagName === 'TEXTARE')) el.value = props[key]
    }
    father.appendChild(el)
    if(vDom.children){
        vDom.children.forEach(item=>{
            item instanceof Element ? render(item, el) : el.innerText = item
        })
    }
    return el
}

export{
    createElement,
    render
}