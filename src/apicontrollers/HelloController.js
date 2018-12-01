module.exports = function (BaseController, HelloService) {
    class HelloController extends BaseController {
   
      configure(app) {
        super.configure(app);
   
        // app.get('/', this.getRoot.bind(this));
        app.get('/', HelloService.renderHello.bind(this));
      }
   
      // getRoot(req, res) {
      //   res.status(200).send('This is the root page defined in HelloController.js.');
      // }
    }
   
    return new HelloController();
  };