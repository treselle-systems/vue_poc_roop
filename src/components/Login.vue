<template>
<div id="main-wrapper">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 left-side">
        <header>
          <!--   <span>Need an account?</span> -->
          <h3>Welcome to  Vue Single Page Application.  </h3>
        </header>
      </div>
      <div class="col-md-5 right-side" style=" padding: 35px;">
        <header>
          <h3>Login</h3>
        </header>
        <span class="input input--custom">
          <input v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="text" id="email"  v-model="formData.email"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="email">
            <span class="input__label-content input__label-content--custom">E-mail</span>
        </label>
        <span class="error-msg" v-if="errMsg.email"> {{errMsg.email}}</span>
        </span>
        <span class="input input--custom">
          <input v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="password" id="password"  v-model="formData.password"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="password">
            <span class="input__label-content input__label-content--custom">Password</span>
        </label>
        <span class="error-msg" v-if="errMsg.password"> {{errMsg.password}}</span>
        </span>
        <!--  <div>
             <span class="success-msg" > Thank you for creating an account. To access your account click here. </span> <span>login</span>
        </div> -->
        <div class="cta">
          <button class="btn btn-primary pull-left" v-on:click="Login">
            Login
          </button>
          <span><a href="/#/signup">Create Account</a></span>
        </div>
        <!-- <ul class="social list-inline">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Linkedin</a></li>
        </ul> -->
      </div>
    </div>
  </div>
</div>
 
</template>

<script>

export default {
    name: 'Login',

    data() {
        return {
            errMsg: {
                email: '',
                password: ''
            },
            formData: {
                email: '',
                password: ''
            },
            errorStatus: false,
            resMsg: ''

        }
    },
    methods: {

        /* To Add class name when value entered*/
        checkValExist: function(field) {

            let fieldName = field.target.id;

            if (this.formData[fieldName] != undefined && this.formData[fieldName] != '') {
                field.srcElement.parentNode.className = 'input input--custom input--filled';
            } else {
                field.srcElement.parentNode.className = 'input input--custom';
            }


        },

        /* Check empty field validation */
        checkValidFied: function(field) {

            if (this.formData[field] != undefined) {

                if (this.formData[field] == '') {
                    this.errorStatus = true;
                    this.errMsg[field] = 'Please fill out this field.';
                } else {
                    this.errMsg[field] = '';
                }

            }

        },

        /* Clear all form fields value once signup complete */
        clearFormFields: function() {
            this.formData = {
                name: '',
                email: '',
                password: ''
            };
        },

        /* To the email is valid format or not */
        checkValidEmail: function(email) {

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        },

        /* To integrate api call to get the user details */

        checkLogin: function(params) {

            return this.$http.post('http://localhost:3001/api/v1/login', params).then(response => {
                return response.body;
            });

        },


        /* To validate login fields and allow to login. */
        Login: function() {

            const encode = require('nodejs-base64-encode');

            this.errorStatus = false;

            console.log(this.errorStatus);
            for (let each in this.formData) {
                this.checkValidFied(each);
            }


            if (this.formData.email != '' && !this.checkValidEmail(this.formData.email)) {
                this.errMsg.email = 'Please enter valid email';
                this.errorStatus = true;
            }

            if (this.errorStatus != true) {

                let params = {
                    userEmail: this.formData.email,
                    userPwd: encode.encode(this.formData.password, 'base64'),
                };

                this.checkLogin(params).then(function(res) {

                    if (res.res != undefined && res.res == 'success') {
                        this.$cookies.set('token', res.token);
                        this.$cookies.set('first_name', res.first_name)
                        this.$router.push('/home');

                    } else if (res.res != undefined && res.res == 'failure') {
                        this.errMsg.email = 'Email or Password is wrong';
                        this.errorStatus = true;
                    }
                });
            }
        },
    },
    /**
     * Before Mount is used to load the required functions on default page load
     */
    beforeMount: function() {
        console.log(this.$cookies.get('token'));
        if (this.$cookies.get('token')) {
            this.$router.push('/home')
        }
    },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-msg {
  
  float:left;

   margin-top: 62px;
    position: absolute;
    font-size: small;
    color: red;
}

.success-msg {
     margin-top: 62px;
    font-size: small;
    color: green;
}
#main-wrapper{
  margin-top: 120px;
}
</style>
