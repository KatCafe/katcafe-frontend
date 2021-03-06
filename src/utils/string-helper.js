const linkRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

class StringHelper{

    findLinks(text){

        const matches = text.match(linkRegex);

        const result = [];
        for(const match in matches) {

            let link = matches[match];
            link = link.replace(/ *\([^)]*\) */g, " ");
            link = link.replace(/ *\[[^)]*\] */g, " ");

            result.push( link );
        }

        return result;

    }

    fixURL(link){

        let linkLowerCase = link.toLowerCase();
        if (linkLowerCase.indexOf('http://') < 0 && linkLowerCase.indexOf('https://') < 0) {
            link = "http://"+link;
            linkLowerCase = link.toLowerCase();
        }

        if (linkLowerCase.indexOf('http') < 0 && linkLowerCase.indexOf('https') < 0) {
            link = "http"+link;
            linkLowerCase = link.toLowerCase();
        }

        return link;
    }

    trimSlashes(string){
        return string.replace(/^\/|\/$/g, '');
    }

}

export default new StringHelper()