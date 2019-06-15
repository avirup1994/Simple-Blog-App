let express=require('express');
const controlFile=require('./../controlFolder/control')
const configFile=require('./../configFolder/config');
const auth=require('./../Middleware/auth');


let setRouter=(app)=>{
let baseurl=configFile.apiversion;

    app.get(baseurl+'/route/:firstname',controlFile.RouteParameter);
    app.get(baseurl+'/query',controlFile.queryparameter);
    app.post(baseurl+'/body',controlFile.bodyparameter);
    app.get(baseurl+'/getalldata',auth.Authenctication,controlFile.getalldata);
       	/**
	 * @api {get} /api/v1/getalldata Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All data fetched successfully",
	    "status": 200,
	    "data": [
					{
						userId: "string",
						firstName: "string",
						lastName: "string",
						password: "string",
                        createdOn: "date",
                        view:"number"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No data found",
	    "status": 300,
	    "data": null
	   }
	 */
    app.get(baseurl+'/getbyuserid/:userId',controlFile.getdatabyuserid);
    app.put(baseurl+'/edit/:userId',controlFile.editData);
    app.post(baseurl+'/delete/:userId',controlFile.deletefile);
    app.post(baseurl+'/create',controlFile.createData);
    app.get(baseurl+'/increaseview/:userId',controlFile.increaseview);
    app.post(baseurl+'/signup',controlFile.signupFunction);
   app.post(baseurl+'/login',controlFile.Loginfunction);
   app.get(baseurl+'/getalldetails',auth.Authenctication,controlFile.getalldetails);
}
module.exports={
    setRouter:setRouter
}