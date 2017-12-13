/* global Vue, localStorage, pluralize */

let Editor = {
    props:[
        'noteObject'    
    ],
    data(){
        return {
            note:this.noteObject
        }
    },
    template:`
        <textarea 
            class="editor" rows="10" placeholder="Write a note" 
            v-model="note.body" @input="update"
        ></textarea>
    `,
    methods:{
        update(){
            this.$emit('update')
        }
    }
}

let Note = {
    components:{
        editor:Editor
    },
    props:[
        'noteObject'    
    ],
    data(){
        return {
            open:false,
            note:this.noteObject
        }
    },
    computed:{
        wordCount(){
            if(!this.note.body.trim()){
                return '0 words'
            }
            
            let count = this.note.body.trim().split(' ').length
            
            return count + ' ' +pluralize('word', count)
        }  
    },
    template:`
        <div class="note__wrapper">
            <div class="note__header">
                <a href="#" class="note" @click.prevent="open = !open">
                    <span>{{ _.truncate(note.body, {length:30}) || 'Empty note' }}</span>
                    <span>{{ wordCount }}</span>
                </a>
                <a v-if="open" href="#" class="note__delete" @click.prevent="deleteNote">Delete</a>
            </div>
            <editor v-if="open" :note-object="this.note" v-on:update="saveNote"></editor>
        </div>
    `,
    methods:{
        saveNote(){
            let notes = JSON.parse(localStorage.getItem('notes')) || []
            notes.map((note) => { 
                if(note.id == this.note.id){
                    note.body = this.note.body
                }
            })
            localStorage.setItem('notes', JSON.stringify(notes))
        },
        deleteNote(){
            this.$emit('delete', this.note.id)
        }
    }
}

let Notes = {
    components:{
        note:Note
    },
    data(){
        return{
            notes: JSON.parse(localStorage.getItem('notes')) || []
        }
    },
    template:`
        <div class="notes">
            <a href="#" class="notes__new" @click.prevent="newNote">
                Create a new note
            </a>
            <note 
                v-for="note in notes" 
                :note-object="note" 
                :key="note.id"
                v-on:delete="deleteNote"
            ></note>
        </div>
    `,
    methods:{
        newNote(){
            this.notes.unshift({
                id:Date.now(),
                body:''
            })
            
            localStorage.setItem('notes', JSON.stringify(this.notes))
        },
        deleteNote(id){
            this.notes = this.notes.filter((note) => {
                return note.id !== id
            })
            
            localStorage.setItem('notes', JSON.stringify(this.notes))
        }
    }
}

let app = new Vue({
    el:'#app',
    components:{
        notes:Notes
    }
})