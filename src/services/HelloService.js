'use strict'
module.exports = () => {

    return new class HelloService {

        renderHello(req, res){
            const model = {
                user: req.query.user || 'John Doe'
              };
         
              res.render('index', model);
        }
    }

}