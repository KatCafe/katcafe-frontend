/**
 * Created by BIT TECHNOLOGIES on 7/12/2017.
 */

import consts from "consts/consts"

export function addSuffix(initialString = '', maxLength = 100, suffix = consts.name, suffix2 = consts.title, ){

    if (initialString.length > maxLength) return initialString.substr(0, maxLength-3)+'...';

    if (initialString.length + suffix.length <= maxLength) return initialString + ' ' + suffix;

    if (initialString.length +suffix2.length <= maxLength) return initialString + ' ' + suffix2;

    return initialString;
}