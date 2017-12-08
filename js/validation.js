/* global Vue, axios */

let Login = {
    data(){
        return {
            errors:{},
            form:{
                email:'',
                password:''
            }
        }
    },
    template:`
        <form action="#" @submit.prevent="submit">
            <div class="form-group" :class="{ 'has-danger':errors.email }">
                <label for="email" class="form-control-label">Email</label>
                <input type="text" id="email" class="form-control" placeholder="Email"
                    v-model="form.email">
                <div class="form-control-feedback" v-if="errors.email">
                    {{ errors.email[0] }}
                </div>
            </div>
            <div class="form-group" :class="{ 'has-danger':errors.password }">
                <label for="password" class="form-control-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password"
                    v-model="form.password">
                <div class="form-control-feedback" v-if="errors.password">
                    {{ errors.password[0] }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    `,
    methods:{
        submit(){
            axios.post('php/register.php', this.form).then((response) => {
                
            }).catch((error) => {
                this.errors = error.response.data.data
            })
        }
    }
}

let app = new Vue({
    el:'#app',
    components:{
        login:Login
    }
})