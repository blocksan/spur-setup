module.exports = (BaseController, AuthService)=>{

    return new class AuthController extends BaseController{
        configure(app) {
            super.configure(app);
            app.get('/api/auth/login', AuthService.login.bind(this));
            app.post('/api/auth/signup', AuthService.createUser.bind(this));
        }
    }

}