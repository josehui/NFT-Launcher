import logging
import json
import azure.functions as func
from . import cosmos_client


def main(req: func.HttpRequest) -> func.HttpResponse:

    logging.info('New request for generated images..')
    ItemId = req.params.get('id')
    if ItemId:
        try:
            record = cosmos_client.read_item(ItemId)
        except:
            return func.HttpResponse(
                "No record found",
                status_code=404
            )
    else:
        return func.HttpResponse(
            "No id found in request",
            status_code=400
        )
    record['data']['previewImages'] = [
        {'img': record['data']['url']} for i in range(5)]
    res = json.dumps(record)
    headers = {'Content-Type': 'application/json'}
    return func.HttpResponse(res, headers=headers)
