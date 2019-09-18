var lexConfig=require('./lex/config')
module.exports={
    "ESProxyCodeVersion":{
        "Type": "Custom::S3Version",
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["CFNLambda", "Arn"] },
            "Bucket": {"Ref":"BootstrapBucket"},
            "Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "BuildDate":(new Date()).toISOString()
        }
    },
    "UtteranceLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            ES_INDEX:{"Fn::GetAtt":["Var","index"]},
            ES_ADDRESS:{"Fn::GetAtt":["ESVar","ESAddress"]},
            UTTERANCE_BUCKET:{"Ref":"AssetBucket"},
            UTTERANCE_KEY:"default-utterances.json",
          }
        },
        "Handler": "index.utterances",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESProxyLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Service"
        }]
      }
    },
    "ESQidLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            ES_INDEX:{"Fn::GetAtt":["Var","index"]},
            ES_ADDRESS:{"Fn::GetAtt":["ESVar","ESAddress"]}
          }
        },
        "Handler": "index.qid",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESProxyLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Service"
        }]
      }
    },
    "ESCleaningLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            ES_INDEX:{"Fn::GetAtt":["Var","index"]},
            ES_ADDRESS:{"Fn::GetAtt":["ESVar","ESAddress"]},
            FEEDBACK_DELETE_RANGE_MINUTES:43200,
            METRICS_DELETE_RANGE_MINUTES:43200,
          }
        },
        "Handler": "index.cleanmetrics",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESProxyLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Service"
        }]
      }
    },
    "ScheduledESCleaning": {
      "Type": "AWS::Events::Rule",
      "Properties": {
        "Description": "",
        "ScheduleExpression": "rate(1 day)",
        "State": "ENABLED",
        "Targets": [{
          "Arn": { "Fn::GetAtt": ["ESCleaningLambda", "Arn"] },
          "Id": "ES_Cleaning_Function"
        }]
      }
    },
    "PermissionForEventsToInvokeLambda": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "FunctionName": { "Ref": "ESCleaningLambda" },
        "Action": "lambda:InvokeFunction",
        "Principal": "events.amazonaws.com",
        "SourceArn": { "Fn::GetAtt": ["ScheduledESCleaning", "Arn"] }
      }
    },
    "ESLoggingLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            "FIREHOSE_NAME":{"Ref":"GeneralFirehose"},
          }
        },
        "Handler": "index.logging",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESLoggingLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Logging"
        }]
      }
    },
    "ESQueryLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            ERRORMESSAGE:lexConfig.ErrorMessage,
            EMPTYMESSAGE:lexConfig.EmptyMessage,
            ES_NO_HITS_QUESTION:"no_hits",
            ES_USE_KEYWORD_FILTERS:"true",
<<<<<<< HEAD
            ES_KEYWORD_SYNTAX_TYPES:"NOUN,PROPN,INTJ",
=======
            ES_KEYWORD_SYNTAX_TYPES:"NOUN,PROPN,VERB,INTJ",
>>>>>>> 6a92eb607996d58c63f65acfc8ad03243c66d940
            ES_SYNTAX_CONFIDENCE_LIMIT:".20",
            ES_STOPWORDS:"a,an,and,are,as,at,be,but,by,for,if,in,into,is,it,not,of,on,or,such,that,the,their,then,there,these,they,this,to,was,will,with",
            ES_MINIMUM_SHOULD_MATCH:"2<75%"
          }
        },
        "Handler": "index.query",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESProxyLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Query"
        }]
      }
    },
    "ESProxyLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "S3Bucket": {"Ref":"BootstrapBucket"},
            "S3Key": {"Fn::Sub":"${BootstrapPrefix}/lambda/proxy-es.zip"},
            "S3ObjectVersion":{"Ref":"ESProxyCodeVersion"}
        },
        "Environment": {
          "Variables": {
            ES_TYPE:{"Fn::GetAtt":["Var","QnAType"]},
            ES_INDEX:{"Fn::GetAtt":["Var","index"]},
            ES_ADDRESS:{"Fn::GetAtt":["ESVar","ESAddress"]},
            ES_USE_KEYWORD_FILTERS:"true",
            ES_KEYWORD_SYNTAX_TYPES:"NOUN,PROPN,VERB,ADJ,INTJ",
            ES_SYNTAX_CONFIDENCE_LIMIT:".20",
            ES_STOPWORDS:"a,an,and,are,as,at,be,but,by,for,if,in,into,is,it,not,of,on,or,such,that,the,their,then,there,these,they,this,to,was,will,with",
            ES_KEYWORDS_MINIMUM_SHOULD_MATCH:"2<75%"
          }
        },
        "Handler": "index.handler",
        "MemorySize": "1408",
        "Role": {"Fn::GetAtt": ["ESProxyLambdaRole","Arn"]},
        "Runtime": "nodejs8.10",
        "Timeout": 300,
        "Tags":[{
            Key:"Type",
            Value:"Service"
        }]
      }
    },
    "ESProxyLambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          {"Ref":"EsPolicy"},
          "arn:aws:iam::aws:policy/AmazonLexFullAccess"
        ]
      }
    },
    "ESLoggingLambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "Policies":[{ 
          "PolicyName" : "LambdaGeneralFirehoseQNALambda",
          "PolicyDocument" : {
          "Version": "2012-10-17",
            "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "lambda:InvokeFunction"
                  ],
                  "Resource": [
                    {"Fn::Join": ["",["arn:aws:lambda:",{ "Ref" : "AWS::Region" },":",{ "Ref" : "AWS::AccountId" },":function:qna-*"]]},
                    {"Fn::Join": ["",["arn:aws:lambda:",{ "Ref" : "AWS::Region" },":",{ "Ref" : "AWS::AccountId" },":function:QNA-*"]]},
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "firehose:PutRecord",
                    "firehose:PutRecordBatch"
                  ],
                  "Resource": [
                    {"Fn::GetAtt" : ["GeneralFirehose", "Arn"]}
                  ]
                }
            ]
          }
        }],
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ]
      }
    },
    "EsPolicy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "es:*"
              ],
              "Resource":["*"]
            },
            {
                "Effect": "Allow",
                "Action": ["s3:Get*"],
                "Resource":[
                    {"Fn::Sub":"arn:aws:s3:::${AssetBucket}*"}
                ]
            },
            {
              "Effect": "Allow",
              "Action": ["comprehend:DetectSyntax"],
              "Resource":["*"]
            }
          ]
        }
      }
    }
}

