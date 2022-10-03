import json
import boto3

def lambda_handler(event, context):
    function_list = []
    client = boto3.client('lambda')
    functions = client.list_functions()
    for function in functions["Functions"]:
        function_list.append(function["FunctionName"])
    return json.dumps(function_list)
