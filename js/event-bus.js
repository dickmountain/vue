/* global Vue, faker */

faker.locale = 'ru';
        
let bus = new Vue();

let Message = {
    data(){
        return{
            message:''
        }
    },
    template:`
        <div class="message" v-if="message">
            {{ message }}
        </div>
    `,
    mounted(){
        bus.$on('message:set', (message) => {
            this.message = message;
            
            setTimeout(() => {
                this.message = '';
            }, 2000)
        });
    }
}

let Person = {
    props:['person'],
    template:`
        <div class="person">
            {{ person.name }}
        </div>
    `
}

let People = {
    components:{
        person:Person
    },
    data(){
        return{
            people:[]
        }
    },
    template:`
         <div class="people">
            <person v-for="person in people" :person="person" :key="person.id"></person>
        </div>
    `,
    mounted(){
       bus.$on('person:joined', (person) => {
           this.people.push(person);
           
           bus.$emit('message:set', `${person.name} has joined`)
       });
    }
}

let Chat = {
    components:{
        people:People
    },
    template:`
        <div class="chat">
           <people></people>
        </div>
    `        
}

setInterval(() => {
    bus.$emit('person:joined', {
        id:1,
        name:faker.name.findName()
    });
}, 5000)

let app = new Vue({
    el:'#app',
    components:{
        'chat':Chat,
        'message':Message
    }
});