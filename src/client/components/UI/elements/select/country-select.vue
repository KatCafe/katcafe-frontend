<template>

    <div class="country-select" >

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

    .country-select{
        display: inline-block;
    }

    .country-select > .multiselect .multiselect__single {
        top: -6px;
        left: 12px;
    }

    .country-select > .multiselect .multiselect__input{
        top: -6px;
        left: 16px;
    }

</style>