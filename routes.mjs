const routes={
    login:{
        path:'/',
        component: 'auth',
        html: true,
        handler:"login"
    },
    logout:{
        path:'/logout',
        component: 'auth',
        handler:"logout"
    },
    home:{
        path:'/home',
        html: true,
        component:'home'
    },

    test:{
        path:'/test',
        html: true,
        component:'test'
    }

}
export default routes;