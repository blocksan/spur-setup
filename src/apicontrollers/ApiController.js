module.exports = (BaseController, ApiService, AuthService) => {

    return new class ApiController extends BaseController{

        configure(app){
            super.configure(app)
            let isAuth = AuthService.isAuthenticated;
            app.get('/api/apicontroller/appmains', isAuth(), ApiService.appmains.bind(this));
            app.get('/api/apicontroller/arrivals', isAuth(), ApiService.arrivals.bind(this));
            app.get('/api/apicontroller/floors', isAuth(), ApiService.floors.bind(this));
            app.get('/api/apicontroller/hotels', isAuth(), ApiService.hotels.bind(this));
            app.get('/api/apicontroller/lookupproofs', isAuth(), ApiService.lookupproofs.bind(this));
            app.get('/api/apicontroller/lookuproomtypes', isAuth(), ApiService.lookuproomtypes.bind(this));
            app.get('/api/apicontroller/lookupstatus', isAuth(), ApiService.lookupstatus.bind(this));
            app.get('/api/apicontroller/modesofpayments', isAuth(), ApiService.modesofpayments.bind(this));
            app.get('/api/apicontroller/rooms', isAuth(), ApiService.rooms.bind(this));
            app.get('/api/apicontroller/shifts', isAuth(), ApiService.shifts.bind(this));
            app.get('/api/apicontroller/users',isAuth(), ApiService.users.bind(this));

            
        }
    }

}