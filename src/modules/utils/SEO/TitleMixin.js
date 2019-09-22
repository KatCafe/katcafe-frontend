/**
 * Created by BIT TECHNOLOGIES on 7/12/2017.
 */

import {addSuffix} from './helpers/MixinHelpers';

/*
 TITLE
 */

function getTitle (vm) {
    const { title } = vm.$options
    if (title) {

        const result = typeof title === 'function'
            ? title.call(vm)
            : title || '';

        return {
            'title':addSuffix( result,53, ),
            'facebook': addSuffix( result,  60),
            'twitter': addSuffix( result, 70)
        }
    }
}

const serverTitleMixin = {
    created () {
        const title = getTitle(this)
        if (title)
            this.$ssrContext.SEOMixinTitle = title
    }
}

const clientTitleMixin = {
    mounted () {
        const title = getTitle(this)
        if (title)
            document.SEOMixinTitle = title
    }
}


export default process.env.VUE_ENV === 'server'
    ?
    serverTitleMixin
    :
    clientTitleMixin
