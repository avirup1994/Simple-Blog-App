let myconfig={}
myconfig.port=3600;
myconfig.allowedcrossorigin='*';
myconfig.apiversion='/api/v1';
myconfig.db={
    uri:'mongodb://127.0.0.1:27017/config'
}
myconfig.env='dev';

module.exports={
    port:myconfig.port,
    apiversion:myconfig.apiversion,
    allowedcrossorigin:myconfig.allowedcrossorigin,
    url:myconfig.db,
    enviroment:myconfig.env
}