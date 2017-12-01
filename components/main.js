Vue.component('task-list', {
    template: `
        <div>
            <task v-for="task in tasks" :key="task.title">{{ task.title }}</task>
        </div>
    `,
    data() {
        return {
            tasks: [
                { title: 'This is book store', is_complete: true },
                { title: 'This is grocery store', is_complete: true },
                { title: 'This is witch store', is_complete: true },
                { title: 'This is computer store', is_complete: true }
            ]
        };
    }
});

Vue.component('task', {
    template: '<li><slot></slot></li>'
});

Vue.component('message', {
    props: ['header','body'],
    template: `
        <article class="message" v-show="isVisible">
            <div class="message-header">
                <p>{{ header }}</p>
                <button class="delete" aria-label="delete" @click="hideMessage"></button>
            </div>
            <div class="message-body">
                {{ body }}
            </div>
        </article>
    `,
    data() {
        return {
            isVisible: true
        };
    },
    methods: {
        hideMessage(){
            this.isVisible = false;
        }
    }
})

new Vue({
    el: '#root'
});