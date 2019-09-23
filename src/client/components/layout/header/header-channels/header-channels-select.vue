<template>

    <div class="channels-select">
        <multiselect @input="onChangeSelect" v-model="value" :options="channels" :option-height="16"  :show-labels="false" :close-on-select="true" >

            <template slot="option" slot-scope="props">

                <div class="option__desc">
                    <span class="option__title">{{ props.option.replace(defaultCountry+'/','').substr(0,20) }}</span>
                </div>

            </template>

        </multiselect>
    </div>

</template>

<script>

import Multiselect from 'vue-multiselect'

export default {

    components: { Multiselect, },

    props: {

        channels: { default () { return [ ]}},
        channel:  { default: ''},

    },

    data () {
        return {
            value: this.channel,
        }
    },

    computed: {

        defaultCountry(){
            return this.$store.state.localization.selectedCountryCode;
        }

    },

    methods: {

        onChangeSelect(value, id){

            if (!value) return;

            this.value = value;
            this.$emit('onSelect',value);

            this.$router.push({path: '/' +value });

            return value;
        }

    },

}
</script>
