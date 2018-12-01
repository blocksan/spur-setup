module.exports = function (BaseWebServer, path, morgan, compression, cookieParser, bodyParser, methodOverride, http, config) {
    class WebServer extends BaseWebServer {
   
      // Add additional changes to the middleware by overriding the method
      registerDefaultMiddleware() {
        super.registerDefaultMiddleware();
        this.registerEjsTemplates();
      }
      //override error middleware adding function of BaseWebServer
      registerErrorMiddleware(){}
   
      registerEjsTemplates() {
        this.logSectionHeader('EJS Template Registration');
   
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));
      }

      

      //override static middleware adding function of BaseWebServer
      registerStaticMiddleware(){

        //setting up the cors
        this.app.use(function(req, res, next) {
            res.header("X-Frame-Options", "DENY");
            const origin = req.headers.origin;
            // res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, WWW-Authenticate, X-CSRF-Token, apiToken");
            res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        // this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(methodOverride());

        this.app.use(morgan('combined'));

      }

      async startHttpServer(){
        this.app.get('*',function (req, res) {
            res.redirect('/');
        });
        this.server = http.createServer(this.app);
        return await this.server.listen(config.Port, config.host, () => {console.log('Express server listening on %d', config.Port); return});
    }

    //trigger point of server.start()
      async startInternal(){
          return await this.startHttpServer();
      }
    }
   
    // Assure there is just one instance
    return new WebServer();
  };