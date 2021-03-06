import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'SignUp',
        component: SignUp
    }, {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/home',
        name: 'Home',
        component: Home
    }]
})