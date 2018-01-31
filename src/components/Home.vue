<template>
<div>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">HOME</a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li v-on:click="logout" style="cursor: pointer; color: white;">Log Out</li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="hello container">
    <div class="sub-container">
      <h1>Hi {{userName}} , Welcome to Vue.js App</h1>
    </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
     
      userName : ''
    }
  },methods: {
       
       logout : function (){
         this.$cookies.remove('token')
          this.$router.push('/login')
       }

      },
   /**
   * Before Mount is used to load the required functions on default page load
   */
  beforeMount: function () {

    this.userName = this.$cookies.get('first_name');

    if (!this.$cookies.get('token')) {
      this.$router.push('/login')
    }
  }
} 
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #d2e2db ;
}
.sub-container {
    margin: 30px 0;
    background: #6ba57b;
    padding: 30px;
    border-radius: 4px;
    color: #fff;
}
</style>
