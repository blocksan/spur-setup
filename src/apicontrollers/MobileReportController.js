module.exports = (BaseController, ReportService, AuthService)=>{

    return new class MobileReportController extends BaseController{
        configure(app) {
            super.configure(app);
            let isAuth = AuthService.isAuthenticated;
            app.get('/api/reports/getTestAppMain', isAuth(), ReportService.getTestAppMain.bind(this));
            app.get('/api/reports/getAllHotels', isAuth(), ReportService.getAllHotels.bind(this));
            app.get('/api/reports/getHotelsByUser', isAuth(), ReportService.getHotelsByUser.bind(this));
            app.get('/api/reports/filterForUser', isAuth(), ReportService.filterForUser.bind(this));
            app.get('/api/reports/getAllRooms', isAuth(), ReportService.getAllRooms.bind(this));
            app.get('/api/reports/hotelWithFilledStatus', isAuth(), ReportService.hotelWithFilledStatus.bind(this));
            app.get('/api/reports/incomeReports', isAuth(), ReportService.incomeReports.bind(this));
            app.get('/api/reports/taxReports', isAuth(), ReportService.taxReports.bind(this));
        }
    }

}