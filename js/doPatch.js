import { REMOVE, TEXT, REPLACE, ATTR } from './patchMap'
import { render } from './virtualDom'

let nodeIndex = 0
function putPatches(rDom, patch){
    if(patch[nodeIndex]){
        patchAction(rDom, patch[nodeIndex++])
    }
    let childNode = rDom.childNodes
    if(childNode && childNode.length>0){
        childNode.forEach(child=>{
            putPatches(child, patch)
        })
    }
}

function patchAction(rNode, nodePatch){
    // console.log(rNode, nodePatch)
    nodePatch.forEach(p=>{
        switch (p.type){
            case(ATTR): 
                // console.log(rNode,p.value)
                for(let key in p.value){
                    rNode.setAttribute(key, p.value[key])
                }
                break;
            case(TEXT):
                rNode = p.value
                break;
            case(REPLACE):
                if(!p.newNode instanceof Element) rNode.parentNode.replaceChild(document.createTextNode(p.newNode), rNode)
                else{
                    const el = render(p.newNode, rNode.parentNode)
                    rNode.parentNode.replaceChild(el, rNode)
                }
                break;
            case(REMOVE):
                rNode.parentNode.removeChild(rNode)
                break;
            default:
                break;
        }
    })
}

export{
    putPatches
}