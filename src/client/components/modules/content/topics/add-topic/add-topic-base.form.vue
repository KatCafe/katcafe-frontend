<template>



</template>

<script>

function initialState (){
    return {

        titleEdit: '',
        bodyEdit: '',

        link: '',
        _prevLink: '',

        file: undefined,

        scraped: null,

        error : '',
        loading: false,

        previewContent:{
            title: '',
            body: '',

            slug: '',
            date: new Date().getTime(),

            link: '',
            preview: null,
        }

    }
}

import StringHelper from "utils/string-helper"

export default {

    props: {
        parentSlug: {default: ''},
        useTitle: {default: true},
    },

    data(){
        const out = initialState();
        return out;
    },

    computed:{

        additionalParamsForm(){
            return null;
        },

        author(){
            return this.$store.state.auth.user ? this.$store.state.auth.user.username : '';
        },

        title(){
            return this.titleEdit || ( this.scraped ? this.scraped.title : ''  ) || '';
        },

        body(){
            return this.bodyEdit   || ( this.scraped ? this.scraped.description : ''  ) || '';
        },

        showPreview(){
            return this.title.length || this.body.length || this.previewContent.preview;
        }


    },

    methods:{

        async extractLink(){

            let links =  this.useTitle ? StringHelper.findLinks(this.titleEdit) : [];
            let links2 =StringHelper.findLinks(this.bodyEdit) ;

            links = links.concat(links2);

            if (!links.length ) return;

            links = links.map( it => StringHelper.fixURL( it ) );

            this.link = links[0];

            const out = await this.linkChanged();

            if (out) {
                if (this.useTitle)  this.titleEdit = this.titleEdit.replace(this.link, '');
                this.bodyEdit = this.bodyEdit.replace(this.link, '');
            }

        },

        async linkChanged(e){

            this.loading = true;

            try{

                if (!this.link || this.link === this._prevLink){
                    this.loading = false;
                    return false;
                }

                this._prevLink = this.link;

                const out = await this.$root.networkHelper.post('/scraper/get',{ uri: this.link, });

                console.log(out);

                if (out && (out.scrape.image || out.scrape.title || out.scrape.description ) ) {

                    if (out.scrape.uri) {
                        this._prevLink = out.scrape.uri;
                        this.link = out.scrape.uri;
                    }

                    this.scraped = out.scrape;
                    this.$emit('scraped', out.scrape)
                }

            }catch(err){
                console.error(err);
                this.scraped = null;
            }

            this.loading = false;
            if (this.scraped) return true;
        },

        async fileChanged(e){

            const files = e.target.files || e.dataTransfer.files;
            if ( !files.length ) return;

            const reader = new FileReader();
            reader.onloadend = async (e) => {

                this.file = {
                    file: files[0],
                    preview: {
                        img: reader.result
                    }
                };
            };

            reader.readAsDataURL(files[0]);

        },

        async openCaptcha(resolve){

            resolve(true);

            const captchaModal = document.getElementById('captchaModal').__vue__;
            captchaModal.showModal( async (resolve2, captchaData, refAdditionalParams)=>{

                try{

                    this.error = '';

                    const out = await this.postSubmit(captchaData, refAdditionalParams);

                    captchaModal.reset();
                    captchaModal.closeModal();

                    this.reset();


                    this.postSubmitSuccessful(out);

                }catch(err){

                    this.error = captchaModal.processError(err.message);
                    if (this.error) captchaModal.closeModal();

                    this.error = this.error.replace('Too few letters. Minimum 4 letters', this.$i18n.t('topic.errorTooFewLetters'));
                    this.error = this.error.replace('You need to provide either a link/file or write 5 characters', this.$i18n.t('comment.errorNoFileOrText'));

                    setTimeout( () => this.error = '', 8000 );

                }

                if (resolve2) resolve2(true);

            }, this.$store.state.auth.user ? this.additionalParamsForm : undefined);

        },

        reset(){
            Object.assign(this.$data, initialState());
        },

        openFileUpload(){
            this.$refs['refFileInput'].click();
        },

        titleChanged(){
            this.extractLink();
        },

        bodyChanged(){
            this.extractLink();
        },

        updatePreviewAdditional(){

        },

        updatePreview(){

            this.updatePreviewAdditional();

            this.previewContent.title = this.title;
            this.previewContent.body = this.body;
            this.previewContent.link = this.link;

            this.previewContent.preview = undefined;

            if (this.scraped && this.scraped.image)
                this.previewContent.preview = Object.assign( {
                    link: this.link
                }, this.scraped.image);

            if (this.file)
                this.previewContent.preview = {
                    base64: this.file.preview,
                    link: this.file.file.name,
                };

            this.previewContent.author = this.author;

        }

    },


    watch: {
        parent: function (newValue, oldValue) {
            this.updatePreview();
        },
        titleEdit: function (newValue, oldValue) {
            this.updatePreview();
        },
        bodyEdit: function (newValue, oldValue) {
            this.updatePreview();
        },
        scraped: function (newValue, oldValue) {
            this.updatePreview();
        },
        file: function (newValue, oldValue) {
            this.updatePreview();
        },
    },

}

</script>