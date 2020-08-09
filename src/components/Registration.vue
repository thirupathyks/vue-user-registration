<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <label for="email" class="form-control-label">Email</label>  
            <input type="text" id="email" class="form-control" placeholder="e.g. user@example.com" v-model="$v.email.$model"/>    
            <div class="error" v-if="!$v.email.required">Field is required</div>
        </div> 
        <div class="form-group">
            <label for="password" class="form-control-label">Password</label>  
            <input type="password" id="password" class="form-control" v-model="$v.password.$model"/>    
            <div class="error" v-if="!$v.password.required">Field is required</div>
            <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
        </div>
        <div class="form-group">
            <label for="displayName" class="form-control-label">Display Name</label>  
            <input type="text" id="displayName" class="form-control" v-model="$v.displayName.$model"/>    
            <div class="error" v-if="!$v.displayName.required">Field is required</div>
            <div class="error" v-if="!$v.displayName.minLength">Name must have at least {{$v.displayName.$params.minLength.min}} letters.</div>
        </div>  

        <button type="submit" class="btn btn-primary">Register</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Registration Completed!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
</template>

<script>
import axios from 'axios';
import { required, minLength } from 'vuelidate/lib/validators';


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
            required
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
        }
    }
}
</script>

<style scoped>

</style>