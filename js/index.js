import { render, createElement } from "./virtualDom"
import { createPatch } from "./patch"
import { putPatches } from "./doPatch"

const vDom = createElement('ul',{
    class:'list',
    style:'width:300px; height:300px; background-color:pink'
    },
    [
        createElement('li',{
                class:'item',
                'data-index':0
            },
            [
                createElement('input',{
                    class:'text',
                    value:'第1个列表项'
                },
                ['第1个列表项'])
            ]
        ),
        createElement('li',{
                class:'item',
            },
            ['第2个列表项']
        )
    ]
)
console.log('virtual Dom', vDom)
const newVDom = createElement('ul',{
    class:'lists',
    style:'width:300px; height:300px; background-color:skyblue'
    },
    [
        createElement('li',{
                class:'item',
                'data-index':1
            },
            [
                createElement('p',{
                    class:'text',
                },
                ['第1个列表项'])
            ]
        ),
        createElement('li',{
                class:'item',
            },
            ['第2个列表项']
        ),
        /* createElement('li',{
            class:'item',
        },
        ['第3个列表项']
    )*/
    ]
)

const root = document.querySelector('#app')
const rDom = render(vDom, root)
console.log('real Dom', rDom)
/*
    新增补丁较为复杂，暂未添加
 */
const patch = createPatch(vDom, newVDom)
console.log('patch', patch)

putPatches(rDom, patch)