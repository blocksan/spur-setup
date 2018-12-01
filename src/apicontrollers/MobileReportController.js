module.exports = (BaseController, ReportService)=>{

    return new class MobileReportController extends BaseController{
        configure(app) {
            super.configure(app);
            app.get('/api/reports/getAllHotels', ReportService.getTestAppMain.bind(this));
        }
    }

}