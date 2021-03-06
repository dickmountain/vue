/* global Vue */

let CountryDropdown = {
    template:`
        <select id="country" @change="change" ref="country">
            <option value="">Choose</option>
            <option value="RU">Russia</option>
            <option value="US">USA</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
        </select>
    `,
    methods:{
        change(){
            this.$emit('input', this.$refs.country.value);
        }
    }
}

let Register = {
    components:{
        'country-dropdown':CountryDropdown
    },
    data(){
        return {
            form:{
                name:'',
                country:''
            }
        }    
    },
    template:`
        <form action="#">
            <div class="form__group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="form.name"/>
            </div>
            <div class="form__group">
                <label for="country">Country</label>
                <country-dropdown v-model="form.country"></country-dropdown>
            </div>
            {{ form }}
        </form>
       
    `
}

let app = new Vue({
    el:'#app',
    components:{
        register:Register
    }
});