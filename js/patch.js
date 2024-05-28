import { REMOVE, TEXT, REPLACE, ATTR } from './patchMap'

let patch = { }
let vNodeIndex = 0

function createPatch(oldVDom, newVDom){
    vNodeWalk(oldVDom,newVDom,vNodeIndex++)
    return patch
}

function vNodeWalk(oldNode, newNode, index){
    let nodePatch = []
    if(!newNode) nodePatch.push({
        type: REMOVE,
        index
    })
    else if(typeof oldNode === 'string' && typeof newNode === 'string' &&  oldNode !== newNode){
        nodePatch.push({
            type: TEXT,
            value: newNode
        })
    }
    else if(oldNode.type === newNode.type){
        const attrPatch = attrsWalk(oldNode.props, newNode.props)
        if(Object.keys(attrPatch).length > 0){
            nodePatch.push({
                type: ATTR,
                value: attrPatch
            })
        }
    }else{
        nodePatch.push({
            type: REPLACE,
            newNode
        })
    }
    if(nodePatch.length > 0){
        patch[index] = nodePatch
    }
    if(oldNode.children && oldNode.children.length > 0){
        oldNode.children.forEach((item,index)=>{
            vNodeWalk(item, newNode.children[index], vNodeIndex++)
        })
    }
}

function attrsWalk(oldAttr, newAttr){
    let attrPatch = {}
    for(let key in oldAttr){
        if(oldAttr[key] !== newAttr[key]){
            attrPatch[key] = newAttr[key]
        }
    }
    for(let key in newAttr){
        if(!oldAttr[key]){
            attrPatch[key] = newAttr[key]
        }
    }
    return attrPatch
}

export{
    createPatch
}