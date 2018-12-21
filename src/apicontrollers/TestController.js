module.exports = (BaseController, ReportService, AuthService)=>{

    return new class TestController extends BaseController{
        configure(app) {
            super.configure(app);
            let isAuth = AuthService.isAuthenticated;
            app.get('/api/testController/getTestAppMain', isAuth(), ReportService.getTestAppMain.bind(this));
        }
    }

}