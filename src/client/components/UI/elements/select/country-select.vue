<template>

    <div >

        <span class="input-group-addon">
            <img :class="`${ ( (value ? value.css : '') ||'flag').toLowerCase() } flagImg `">
        </span>

        <multiselect @input="onChangeSelect" v-model="value" label="label" track-by="label" :options="optionsFiltered" :option-height="16" :custom-label="customLabel" :show-labels="false" :close-on-select="true" >

            <template slot="option" slot-scope="props">
                <img :class="props.option.css + ' option__flag '"  />
                <div class="option__desc">
                    <span class="option__title">{{ props.option.label }}</span>
                </div>
            </template>


        </multiselect>

    </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
import Flags from './flags/flags';

export default {

    components: { Multiselect, },

    data () {
        return {
            value: {
                value: this.defaultCountryCode,
                css: 'flag ' + this.defaultCountryCode,
                label: Flags.getLabelByCode(this.defaultCountryCode || '')
            },
            options: Flags.getFlags(),
        }
    },

    props: {
        defaultCountryCode : {default: ''},
        countryAllowed: { default () { return [ ]}},
        css: '',
        label :'',
    },

    //@onSelect
    computed:{
        getSelectValue(){
            if (( !this.value || !this.value.value ))
                return {value: this.defaultCountryCode, css: 'flag '+this.defaultCountryCode, label: Flags.getLabelByCode(this.defaultCountryCode||'')  }
            else
                return this.value;
        },

        optionsFiltered(){

            if (this.countryAllowed.length === 0) return this.options;

            const countriesAllowed = {};
            this.countryAllowed.map( it => countriesAllowed[it] = true);

            return this.options.filter ( it => countriesAllowed[it.value] );
        }

    },
    methods: {

        customLabel ({label, css, value}) {
            return `${label}`
        },

        onChangeSelect(value, id){

            if (!value) return;

            this.value = value;
            this.$emit('onSelect',value.label, this.value.value, this.value.css);
            return value;
        }

    }
}
</script>



<style>

    .flagImg{
        position: relative;
        top: 10px;
        z-index: 50;
        left: 5px;
        height: 12px;
        padding-right: 10px;
    }

    .multiselect{
        width: 100% !important;
        z-index: 10 !important;
        height: 30px;
        min-height: 30px;
    }

    .multiselect input{
        border: none;
        padding: 0 !important;
        margin: 0 !important;
        left: 20px;
        color: white;
        min-height: 20px !important;
        height: 20px !important;
        font-size: 16px;
    }

    .multiselect .multiselect__single{
        left: 15px;
        z-index: 3 !important;
        white-space: nowrap;
        line-height: 10px;
        background-color: transparent;

        color: #9f9e9e;
        width: 95%;
        font-size: 14px;
        overflow: initial;
    }


    .multiselect__content-wrapper {
        z-index: 3 !important;
    }

    .multiselect__tags {
        border-radius: 0;
        border: none;
        background-color: #323232;
        padding: 0 40px 0 10px;

        min-height: 30px;
        height: 30px;
    }

    .multiselect__input{
        top: -5px;
    }

    .multiselect__input::placeholder{
        color: #9f9e9e;
        opacity: 1; /* Firefox */
        font-size: 14px;
    }

    .multiselect__select{
        height: 36px;
        top: -3px;
    }

    .option__title{
        color: black;
    }

    .option__desc{
        line-height: 13px;
        font-size: 14px;
    }

    .option__flag{
        display: inline-block;
        position: relative;
        verticalAlign: middle;
        padding-top:11px !important;
    }

    @media only screen and (max-width: 600px) {


    }

</style>