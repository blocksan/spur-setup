module.exports = (BaseController, ApiService, AuthService) => {

    return new class ApiController extends BaseController{

        configure(app){
            super.configure(app)
            let isAuth = AuthService.isAuthenticated;
            app.get('/api/apicontroller/appmains', isAuth(), ApiService.appmains.bind(this));
        }
    }

}