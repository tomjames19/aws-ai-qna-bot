var Promise=require('bluebird')
var axios=require('axios')
var query=require('query-string')
var jwt=require('jsonwebtoken')
var _=require('lodash')

module.exports=function(aws){
    var lex=new aws.LexRuntime()
    var postText=lex.postText
    lex.postText=function(){
        var params=arguments[0]
        return postText.apply(lex,arguments)
    }
    
    return lex
}

function wrap(value){
    return {
        getPromise:()=>new Promise(function(res,rej){
            return {promise:new Promise(function(res,rej){
                res(value)
            })}
        }),
        promise:()=>new Promise(function(res,rej){
            res(value)
        })
    }
}
