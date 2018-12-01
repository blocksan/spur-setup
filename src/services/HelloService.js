'use strict'
module.exports = () => {

    return new class HelloService {

        renderHello(req, res){
            const model = {
                user: req.query.user || 'Saneep Ghosh'
              };
         
              res.render('index', model);
        }
    }

}