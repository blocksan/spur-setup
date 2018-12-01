module.exports = (BaseController, ApiService) => {

    return new class ApiController extends BaseController{

        configure(app){
            super.configure(app)
            app.get('/api/apicontroller/getIncome', ApiService.getIncome.bind(this));
        }
    }

}