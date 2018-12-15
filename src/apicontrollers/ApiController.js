module.exports = (BaseController, ApiService) => {

    return new class ApiController extends BaseController{

        configure(app){
            super.configure(app)
            app.get('/api/apicontroller/getIncome', ApiService.getIncome.bind(this));
            app.get('/api/apicontroller/appmains', ApiService.appmains.bind(this));
            app.get('/api/apicontroller/arrivals', ApiService.arrivals.bind(this));
            app.get('/api/apicontroller/floors', ApiService.floors.bind(this));
            app.get('/api/apicontroller/hotels', ApiService.hotels.bind(this));
            app.get('/api/apicontroller/lookupproofs', ApiService.lookupproofs.bind(this));
            app.get('/api/apicontroller/lookuproomtypes', ApiService.lookuproomtypes.bind(this));
            app.get('/api/apicontroller/lookupstatus', ApiService.lookupstatus.bind(this));
            app.get('/api/apicontroller/modesofpayments', ApiService.modesofpayments.bind(this));
            app.get('/api/apicontroller/rooms', ApiService.rooms.bind(this));
            app.get('/api/apicontroller/shifts', ApiService.shifts.bind(this));
            app.get('/api/apicontroller/users', ApiService.users.bind(this));

            
        }
    }

}