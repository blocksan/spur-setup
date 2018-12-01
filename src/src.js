const injector = require('./injector');
 
// IMPORTANT: The callback needs to be a function call vs. using a fat-arrow block. Fat-arrow is not supported yet.
injector().inject(function (UncaughtHandler, WebServer, Logger, nodeProcess, config, configLoader) {
  UncaughtHandler.listen();
 

  console.log(Logger,'----- Logger info')

  Logger.info(`NODE_ENV: ${nodeProcess.env.NODE_ENV}`);
  Logger.info(`PORT: ${config.Port}`);
  Logger.info(`CONFIG: ${configLoader.configName}`);
 
  WebServer.start()
  .then(() => {
    // Execute other logic after the server has started
  });
});