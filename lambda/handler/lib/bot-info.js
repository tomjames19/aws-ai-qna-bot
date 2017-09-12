/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
var Promise=require('bluebird')
var download=require('./export.js')
var aws=require('./aws')
var lex=new aws.LexModelBuildingService()
var axios=require("axios")
var jszip=require('jszip')


module.exports=function(params,es){
    var Alexa=lex.getBotVersions({
        name:process.env.LEX_BOT
    }).promise()
    .then(function(data){
        var versions=data.bots.map(x=>x.version)
            .filter(x=>x.match(/[0-9]+/))
            .map(parseInt)

        return Math.max.apply(null,versions)
    })
    .then(function(data){
        return lex.getExport({
            exportType: "ALEXA_SKILLS_KIT", 
            name:process.env.LEX_BOT, 
            resourceType: "BOT", 
            version:data.toString() 
        }).promise()
    })
    .then(function(data){
        if(data.exportStatus!=="READY"){
            console.log("export status",data.exportStatus)
            return Promise.reject("Export not ready")
        }
        return axios.get(data.url,{
            responseType: 'arraybuffer'
        })      
    })
    .then(data=>jszip.loadAsync(data.data))
    .then(function(zip){
        var file=Object.keys(zip.files)[0]
        return zip.file(file).async("text")
    })
    .then(JSON.parse)
    .tap(function(schema){
        schema.intents=schema.intents.concat([
			{
			  "name": "AMAZON.CancelIntent",
			  "samples": []
			},
			{
			  "name": "AMAZON.HelpIntent",
			  "samples": []
			},
			{
			  "name": "AMAZON.StopIntent",
			  "samples": []
			}
        ])
    })
    .then(JSON.stringify)

    return Promise.join(
        download(params,es),
        Alexa)
    .spread(function(dump,alexa){
        var tmp=dump.qa.map(qa=>qa.q)
        var tmp=[].concat.apply([],tmp)
        tmp=tmp.concat(require('./default-utterances.js'))
        return {
            utterances:tmp.filter(
                (val,index)=>tmp.indexOf(val)===index 
            ),
            botname:params.botname,
            lambdaArn:params.lambdaArn,
            alexa
        }
    })
}

