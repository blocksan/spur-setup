module.exports = (BaseController, ReportService)=>{

    return new class TestController extends BaseController{
        configure(app) {
            super.configure(app);
            app.get('/api/testController/getTestAppMain', ReportService.getTestAppMain.bind(this));
        }
    }

}