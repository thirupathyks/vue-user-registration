<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <label for="email" class="form-control-label">Email</label>  
            <input type="text" id="email" class="form-control" placeholder="e.g. user@example.com" v-model="form.email"/>    
        </div> 
        <div class="form-group">
            <label for="password" class="form-control-label">Password</label>  
            <input type="password" id="password" class="form-control" v-model="form.password"/>    
        </div>
        <div class="form-group">
            <label for="displayName" class="form-control-label">Display Name</label>  
            <input type="text" id="displayName" class="form-control" v-model="form.displayName"/>    
        </div>  

        <button type="submit" class="btn btn-primary">Register</button>

    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Registration',
    data() {
        return {
            errorMessage: '',
            form: {
                email: '',
                password: '',
                displayName:''
            }
        }
    },
    methods: {
        submit() {
            axios.post('http://localhost:8081/signinuser',this.form
            ).then((response)=> {
                console.log(response);
                this.errorMessage='';
            }).catch((error) => {
                console.log(error.response);
                this.errorMessage = error.response.data.error.message;
            })
        }
    }
}
</script>

<style scoped>

</style>