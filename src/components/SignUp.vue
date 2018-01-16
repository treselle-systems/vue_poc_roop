<template>
<div id="main-wrapper">
  <div class="container-fluid">
    <div class="row">
      <!-- <div class="col-md-6 left-side">
        <header>
          <span>Need an account?</span>
          <h3>Create Your Account</h3>
        </header>
      </div>   -->
      <div style="margin-left:400px;padding: 50px;" class="col-md-6 right-side">
        <header>
          <h3>Create Your Account</h3>
        </header>
        <span class="input input--custom">
          <input v-on:keyup="checkValidFied('name')" v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="text" id="name"  v-model="formData.name"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="name">
            <span class="input__label-content input__label-content--custom">First Name</span>
        </label>
        <span class="error-msg" v-if="errMsg.name">{{errMsg.name}}</span>
        </span>
        <span class="input input--custom">
          <input v-on:keyup="checkValidFied('lname')" v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="text" id="lname"  v-model="formData.lname"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="lname">
            <span class="input__label-content input__label-content--custom">Last Name</span>
        </label>
        <span class="error-msg" v-if="errMsg.lname">{{errMsg.lname}}</span>
        </span>
        <span class="input input--custom">
          <input  v-on:keyup="checkValidFied('email')" v-on:blur="checkValExist($event);checkValEmail();" class="input__field input__field--custom" type="text" id="email"  v-model="formData.email"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="email">
            <span class="input__label-content input__label-content--custom">E-mail</span>
        </label>
        <span class="error-msg" v-if="errMsg.email"> {{errMsg.email}}</span>
        </span>
        <span class="input input--custom">
          <input v-on:keyup="checkValidFied('password')" v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="password" id="password"  v-model="formData.password"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="password">
            <span class="input__label-content input__label-content--custom">Password</span>
        </label>
        <span class="error-msg" v-if="errMsg.password"> {{errMsg.password}}</span>
        </span>
        <span class="input input--custom">
          <input v-on:keyup="checkValidFied('repeatPassword')" v-on:blur="checkValExist($event)" class="input__field input__field--custom" type="password" id="repeatPassword"  v-model="formData.repeatPassword"/>
          <label class="input__label input__label--custom input__label--custom-color-3" for="repeatPassword">
            <span class="input__label-content input__label-content--custom">Repeat Passowrd</span>
        </label>
        <span class="error-msg" v-if="errMsg.repeatPassword">  {{errMsg.repeatPassword}}</span>
        </span>
        <div v-if="resMsg">
          <span class="success-msg"> {{resMsg}}</span> <span v-on:click="login()" class="login-link">login</span>
        </div>
        <div class="cta">
          <button class="btn btn-primary pull-left" v-on:click="SignUp" v-bind:class="{ disabled: resMsg}">
            Sign-Up Now
          </button>
          <span><a @click.prevent="login()" >I am already a member</a></span>
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
    name: 'SignUp',

    data() {
        return {
            errMsg: {
                name: '',
                lname: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
            formData: {
                name: '',
                lname: '',
                email: '',
                password: '',
                repeatPassword: ''
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


        /* To redirect login route */
        login: function() {
            this.$router.push('/login');
        },


        /* Check empty field validation */
        checkValidFied: function(field) {

            if (this.formData[field] != undefined) {

                if (this.formData[field] == '') {
                    this.errorStatus = true;
                    this.errMsg[field] = 'Please fill out this field.';
                    // this.errMsg[field] = 'Please enter '+field+'.';

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
                password: '',
                repeatPassword: ''
            };
        },

        /* To the email is valid format or not */
        checkValidEmail: function(email) {

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        },


        checkValEmail: function(email) {

            if (!this.checkValidEmail(this.formData.email)) {
                this.errMsg.email = 'Please enter valid email.';
                this.errorStatus = true;
            }

        },

        /* To integrate api call to register the user details */
        checkSignUp: function(params) {

            return this.$http.post('http://localhost:3001/api/v1/signup', params).then(response => {
                return response.body;
            });

        },

        /* To validate form fields and construct the fields to call api. */
        SignUp: function() {

            if (this.resMsg) {
                return;
            }

            const encode = require('nodejs-base64-encode');
            this.errorStatus = false;

            for (let each in this.formData) {
                this.checkValidFied(each);
            }

            if (this.formData.password != '' && this.formData.repeatPassword != '') {

                if (this.formData.password != this.formData.repeatPassword) {
                    this.errMsg.repeatPassword = 'The repeat password does not matched.';
                    this.errorStatus = true;
                }
            }

            if (this.formData.email != '' && !this.checkValidEmail(this.formData.email)) {
                this.errMsg.email = 'Please enter valid email.';
                this.errorStatus = true;
            }

            if (this.errorStatus != true) {

                let params = {
                    first_name: this.formData.name,
                    last_name: this.formData.lname,
                    userEmail: this.formData.email,
                    userPwd: encode.encode(this.formData.password, 'base64'),
                };

                this.checkSignUp(params).then(function(res) {

                    if (res.res != undefined && res.res == 'saved') {
                        this.resMsg = 'Thank you for creating an account. To access your account click here ';
                        this.clearFormFields();
                    } else if (res.res != undefined && res.res == 'already_exist') {
                        this.errMsg.email = 'The email address already exist.';
                        this.errorStatus = true;
                    }
                });
            }
        }
    },

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
    color: green;
}
#main-wrapper{
  margin: 60px 0px;
}

.login-link {
    color: #ff5500;
    cursor: pointer;
}

a{
   cursor: pointer;
}
</style>
