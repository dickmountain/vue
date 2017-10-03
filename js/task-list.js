/* global Vue */
let bus = new Vue()

let Task = {
    props:['task'],
    template:`
        <div class="task" :class="{ 'task--done':task.done }">
            <span>{{ task.body }}</span> 
            <a href="#" :class="{done:!task.done, undone:task.done}" @click.prevent="toggleDone(task.id)"><i class="fa fa-check" aria-hidden="true"></i></a>
            <a href="#" class="remove" @click.prevent="deleteTask(task.id)"><i class="fa fa-remove" aria-hidden="true"></i></a>
        </div>
    `,
    methods:{
        toggleDone(taskId){
            bus.$emit('task:toggleDone', taskId)
        },
        deleteTask(taskId){
            bus.$emit('task:deleted', taskId)
        }
    }
}

let TaskForm = {
    data(){
        return {
            body:''
        }
    },
    template:`
        <form action="#" @submit.prevent="addTask">
            <input type="text" v-model.trim="body">
            <button>Add task</button>
        </form> 
    `,
    methods:{
        addTask(){
            if(!this.body){
                return
            }
            this.$emit('task:added', {
                id:Date.now(),
                body:this.body,
                done:false
            })
            
            this.body = '';
        }
    }
}

let Tasks = {
    components:{
        'task':Task,
        'task-form':TaskForm
    },
    data(){
        return {
            tasks:[
                { id:1, body:'Task one', done:true },  
                { id:2, body:'Task two', done:false }    
            ]
        }
    },
    template:`
        <div>
            <div class="tasks">
                <template v-if="tasks.length">
                    <task v-for="task in tasks" :key="task.id" :task="task"></task>
                </template>
                <span v-else>No tasks</span>
            </div>
            <task-form v-on:task:added="addTask"></task-form>
        </div>        
    `,
    methods:{
        toggleDone(taskId){
            this.tasks = this.tasks.map((task) => {
                if(task.id === taskId){
                    task.done = !task.done;
                }
                return task
            })
        },
        deleteTask(taskId){
            this.tasks = this.tasks.filter((task) => {
               return task.id !== taskId
            })
        },
        addTask(task){
            this.tasks.unshift(task);
        }
    },
    mounted(){
        bus.$on('task:toggleDone', (taskId) => {
            this.toggleDone(taskId)
        })
        
        bus.$on('task:deleted', (taskId) => {
            this.deleteTask(taskId)
        })
    }
}

let app = new Vue({
    el:'#app',
    components:{
        tasks:Tasks
    }
})