
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

// Practical component - Message
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
});

// Practical component 2 - Modal
Vue.component('modal', {
    template: `
        <div class="modal is-active"> 
            <div class="modal-background"></div> <div class="modal-content">
                <div class="box">
                    <slot></slot>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        </div>
    `
});

// Practical component 3 - Tabs
Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="tab-details">
                <slot></slot>
            </div>
        </div>
    `,
    data(){
        return {
            tabs: []
        };
    },
    created(){
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    },
});

Vue.component('tab', {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,
    props: {
        name: { required: true },
        selected: { default: false }
    },
    data(){
        return {
            isActive: false
        }
    },
    computed: {
        href(){
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    mounted(){
        this.isActive = this.selected;
    }
});

// Component Communication 1 - Custom Event
Vue.component('coupon', {
    template: '<input @blur="onCouponApplied">',
    methods: {
        onCouponApplied(){
            this.$emit('applied');
        }
    }
});

// Component Communication 2 - Custom Event
window.Event = new class{
    constructor(){
        this.vue = new Vue();
    }

    fire(event, data){
        this.vue.$emit(event, data);
    }

    listen(event, callback){
        this.vue.$on(event, callback);
    }
}

Vue.component('coupon-2', {
    template: '<input @blur="onCouponApplied2">',
    methods: {
        onCouponApplied2(){
            Event.fire('applied');
        }
    }
});

// Named Slots in a Nutshell
Vue.component('modal-named-slots', {
    template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <slot name="header"></slot>
          </p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <slot></slot>
        </section>
        <footer class="modal-card-foot">
            <slot name="footer"></slot>
        </footer>
      </div>
    </div>
    `
});

// Single Component Inline Template
Vue.component('progress-view', {
    data(){
        return { completionRate: 50 };
    }
});

// Parent Instance
new Vue({
    el: '#root',
    data: {
        showModal: false,
        couponApplied: false
    },
    methods: {
        onCouponApplied(){
            this.couponApplied = true;
        },
        onCouponApplied2(){
            //
        }
    },
    created(){
        Event.listen('applied', () => alert('Handling it!'));
    }
});