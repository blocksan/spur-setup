module.exports = (BaseController, AuthService, AttendanceService)=>{

    return new class AttendanceController extends BaseController{
        configure(app) {
            super.configure(app);
            let isAuth = AuthService.isAuthenticated;
            app.post('/api/attendance/checkIn',isAuth(), AttendanceService.checkIn.bind(this));
            app.post('/api/attendance/checkOut',isAuth(), AttendanceService.checkOut.bind(this));
            app.get('/api/attendance/checkInStatus',isAuth(), AttendanceService.checkInStatus.bind(this));
            app.get('/api/attendance/attendanceList',isAuth(), AttendanceService.getAttendanceList.bind(this))
            app.get('/api/attendance/attendanceHistoryDetail',isAuth(), AttendanceService.attendanceHistoryDetail.bind(this));
        }
    }

}