<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <label for="email" class="form-control-label">Email</label>  
            <input type="text" id="email" class="form-control" placeholder="e.g. user@example.com" v-model="$v.email.$model"/>    
        </div> 
        <div class="form-group">
            <label for="password" class="form-control-label">Password</label>  
            <input type="password" id="password" class="form-control" v-model="$v.password.$model"/>    
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Successfully logged in!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Invalid data provided. Please correct before retrying!</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        <div class="form-group">
            {{this.errorMessage}}
        </div>
    </form>   
</template>

<script>
import axios from 'axios';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Login',
    data() {
        return {
            errorMessage: '',
            email: '',
            password: '',
            submitStatus: null
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    },
    methods: {
        submit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                // do your submit logic here
                this.submitStatus = 'PENDING'
                var data = {'email': this.email, 'password': this.password}
                axios.post('http://localhost:8081/signinuser', data
                ).then((response)=> {
                    console.log(response);
                    this.submitStatus = 'OK'
                    this.errorMessage='';
                }).catch((error) => {
                    console.log(error.response);
                    this.errorMessage = error.response.data.error.message;
                })
            }
        }
    }
}
</script>

<style scoped>

</style>