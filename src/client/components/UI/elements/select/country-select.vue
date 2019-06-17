<template>

    <div >

        <span class="input-group-addon">
            <img :class="`${ (getSelectValue.css||'flag').toLowerCase() } flagImg `">
        </span>

        <multiselect @input="onChangeSelect" v-model="getSelectValue" label="label" track-by="label" :options="optionsFiltered" :option-height="16" :custom-label="customLabel" :show-labels="false" :close-on-select="true" >

            <template slot="option" scope="props">
                <img :class="props.option.css" style="display: inline-block; position: relative; verticalAlign: middle; padding-top:11px !important;" />
                <div class="option__desc">
                    <span class="option__title">{{ props.option.label }}</span>
                </div>
            </template>

        </multiselect>



    </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
import {getFlags, getLabelByCode} from './flags/flags';
const FLAGS_SIZE = 18;
export default {

    components: { Multiselect, },

    data () {
        return {
            value: {},
            options: getFlags(),
        }
    },

    props: {
        defaultCountryCode : {default: ''},
        countryAllowed: { default () { return [ ]}},
    },
    //@onSelect
    computed:{
        getSelectValue(){
            if (( !this.value.value ))
                return {value: this.defaultCountryCode, css: 'flag '+this.defaultCountryCode, label: getLabelByCode(this.defaultCountryCode||'')  }
            else
                return this.value;
        },

        optionsFiltered(){

            if (this.countryAllowed.length === 0) return this.options;

            const countriesAllowed = {};
            this.countryAllowed.map( it => countriesAllowed[it] = true)

            console.log(countriesAllowed);

            return this.options.filter ( it => countriesAllowed[it.value] );
        }

    },
    methods: {

        customLabel ({label, css, value}) {
            return `${label}`
        },

        onChangeSelect(value, id){
            this.value = value;
            this.$emit('onSelect',value.label, this.value.value, this.value.css);
            return value;
        }

    }
}
</script>



<style>
    .flagImg{
        position: relative;;
        top: 15px;
        z-index: 50;
        left: 5px;
        height: 12px;
        padding-right: 10px;
    }

    .multiselect{
        width: 100% !important;
    }

    .multiselect input{
        border: none;
        padding: 0 !important;
        margin: 0 !important;
        left: 20px;
    }

    .multiselect .multiselect__single{
        left: 15px;
    }

</style>