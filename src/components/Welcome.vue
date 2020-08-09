<template>
  <div class="welcome">
    <template v-if="showWelcome"> 
        <div class="row mt-5">
            <div class="col-md-6 m-auto">
                <div class="card card-body text-center">
                <h1><i class="fab fa-node-js fa-3x"></i></h1>
                <p>Create an account or login</p>
                <a href="#" class="btn btn-primary btn-block mb-2" @click.prevent="register"
                    >Register</a>
                <a href="#" class="btn btn-secondary btn-block" @click.prevent="login"
                    >Login</a>
                </div>
            </div>
        </div>
    </template>
    <template v-else-if="showRegistration">
        <registration/>
    </template> 
    <template v-else>  
        <login/>
    </template> 
  </div>

</template>

<script>
import Login from './Login.vue'
import Registration from './Registration.vue'

export default {
    name: 'Welcome',
    components: {
        login: Login,
        registration: Registration
    },
    data() {
        return {
            showWelcome: true,
            showRegistration: false,
            showLogin: false
        }
    },
    methods: {
        register() {
            this.showWelcome = false;
            this.showRegistration =  true;
            this.showLogin =  true;
        },
        login() {
            this.showWelcome = false;
            this.showRegistration =  false;
            this.showLogin =  true;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>