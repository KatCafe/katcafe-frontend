import consts from "consts/consts"

class BrowserHelpers{

    static addEvent (object, type, callback) {
        if (object === null || typeof(object) === 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    }

    static timeDiff(previous) {

        const current = new Date().getTime();

        if (current < previous) return 'now';

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) return Math.round(elapsed/1000 ) + 's';
        if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute ) + 'm';
        if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + 'h';
        if (elapsed < msPerMonth) return Math.round(elapsed/msPerDay ) + 'd';
        if (elapsed < msPerYear) return Math.round(elapsed/msPerMonth ) + 'mo';

        return Math.round(elapsed/msPerYear  + 'y');
    }

    static processRelativeLink(link){

        if (!link) return '';

        return link[0] === '/' ? consts.serverApi + link : link;
    }

    static processLink(link){

        link = link.replace('https://','').replace('http://').replace('www.','');
        return link.length < 40 ? link : link.substr(0, 40) + '...';

    }


}

export default BrowserHelpers;