const injector = require('./injector');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// IMPORTANT: The callback needs to be a function call vs. using a fat-arrow block. Fat-arrow is not supported yet.
injector().inject(async function (Promise, Mongoose, UncaughtHandler, WebServer, Logger, nodeProcess, config, configLoader) {
    UncaughtHandler.listen();

    Logger.info(`NODE_ENV: ${nodeProcess.env.NODE_ENV}`);
    Logger.info(`PORT: ${config.Port}`);
    Logger.info(`CONFIG: ${configLoader.configName}`);

    Mongoose.Promise = Promise;

    try {
        let isMongoConnected = await Mongoose.connect(config.mongo.uri, config.mongo.options, () => {})
        if (isMongoConnected) {
            let webServer;
            switch (process.env.MODE) {
                case 'production':
                    webServer = ProductionServer;
                    break;
                default:
                    webServer = WebServer;
            }
            let isWebServerStarted = await webServer.start();
            if (isWebServerStarted) {
                console.log('Server started in', process.env.MODE ? process.env.MODE : 'development', 'mode.');
            }
        }
    } catch (err) {
        console.error('Error while connecting to mongo', err.stack || err)
    }
    process.on('uncaughtException', function (err) {
        console.log('Uncaught exception on ************************* ', err, err.stackTrace, err.stack);
    });
});