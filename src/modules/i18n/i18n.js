import VueI18n from 'vue-i18n'
import Languages from "./languages";

var i18n;

class I18n {

    i18nInit(){

        this.i18n =  new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: Languages,
        })

    }

}

export default new I18n();