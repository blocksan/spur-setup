module.exports = (BaseController, ReportService)=>{

    return new class MobileReportController extends BaseController{
        configure(app) {
            super.configure(app);
            app.get('/api/reports/getTestAppMain', ReportService.getTestAppMain.bind(this));
            app.get('/api/reports/getAllHotels', ReportService.getAllHotels.bind(this));
            app.get('/api/reports/getHotelsByUser', ReportService.getHotelsByUser.bind(this));
            app.get('/api/reports/filterForUser', ReportService.filterForUser.bind(this));
            app.get('/api/reports/getAllRooms', ReportService.getAllRooms.bind(this));
            app.get('/api/reports/hotelWithFilledStatus', ReportService.hotelWithFilledStatus.bind(this));
            app.get('/api/reports/incomeReports', ReportService.incomeReports.bind(this));
            app.get('/api/reports/taxReports', ReportService.taxReports.bind(this));
        }
    }

}