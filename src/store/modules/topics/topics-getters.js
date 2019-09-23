import BrowserHelper from "modules/helpers/browser.helpers"

export default {


    getTopics: (state => ( sortField = 'hot', value = 1, filter,  )=>{

        let list = Object.values( state.map );

        if (filter)
            list = list.filter ( it => filter(it) );

        return list.sort( (a, b) => ( a[sortField] < b[sortField] ) ? value : -value );

    }),

    getPreviewImage: ( state => (preview, fullImage) => {

        if (!preview ) return '';

        let img;

        if ( preview.base64 ) return preview.base64;
        else
        if ( preview.youtubeId ){

            if (this.index === 0)
                img =  `https://i.ytimg.com/vi/${preview.youtubeId}/0.jpg`;
            else
                img =  `https://i.ytimg.com/vi/${preview.youtubeId}/sd${this.index}.jpg`;

        } else if (preview.full && fullImage) img = preview.full;
        else img = typeof preview.img === "string" ? preview.img : preview.img.img ;

        return {
            img: BrowserHelper.processRelativeLink(img),
        };

    }),



}