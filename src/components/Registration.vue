<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <label for="email" class="form-control-label">Email</label>  
            <input type="text" id="email" class="form-control" placeholder="e.g. user@example.com" v-model="$v.email.$model" v-on:keyup="handleChange"/>    
            <div class="error" v-if="(!$v.email.required) && (submitStatus === 'ERROR')">Field is required</div>
            <div class="error" v-if="(!$v.email.email) && (submitStatus === 'ERROR')">Invalid Email ID</div>
        </div> 
        <div class="form-group">
            <label for="password" class="form-control-label">Password</label>  
            <input type="password" id="password" class="form-control" v-model="$v.password.$model" v-on:keyup="handleChange"/>    
            <div class="error" v-if="(!$v.password.required) && (submitStatus === 'ERROR' )">Field is required</div>
            <div class="error" v-if="(!$v.password.minLength) && (submitStatus === 'ERROR' )">Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
        </div>
        <div class="form-group">
            <label for="displayName" class="form-control-label">Display Name</label>  
            <input type="text" id="displayName" class="form-control" v-model="$v.displayName.$model" v-on:keyup="handleChange"/>    
            <div class="error" v-if="(!$v.displayName.required) && (submitStatus === 'ERROR')">Field is required</div>
            <div class="error" v-if="(!$v.displayName.minLength) && (submitStatus === 'ERROR')">Name must have at least {{$v.displayName.$params.minLength.min}} letters.</div>
        </div>  
        <button type="submit" class="btn btn-primary">Register</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Registration Completed!</p>
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
    name: 'Registration',
    data() {
        return {
            errorMessage: '',
            email: '',
            password: '',
            displayName:'',
            submitStatus:null
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
        },
        displayName: {
            required,
            minLength: minLength(4)
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
                var data = {'email': this.email, 'password': this.password, 'displayName': this.displayName}
                axios.post('http://localhost:8081/createuser', data
                ).then((response)=> {
                    console.log(response);
                    this.submitStatus = 'OK'
                    this.errorMessage='';
                }).catch((error) => {
                    console.log(error.response);
                    this.errorMessage = error.response.data.error.message;
                })
            }
        },
        handleChange() {
            this.submitStatus = null;
        }
    }
}
</script>

<style scoped>

</style>