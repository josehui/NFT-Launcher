import json
import logging

import azure.functions as func


def main(event: func.EventGridEvent, doc: func.Out[func.Document]):

    # TO-DO: Add image generation code
     
    # Output result to cosmos db
    event_data = event.get_json()
    # event logger
    result = json.dumps({
        'id': event_data['clientRequestId'],
        'data': event_data,
        'subject': event.subject,
    })
    doc.set(func.Document.from_json(result))


    logging.info('Python EventGrid trigger processed an event: %s', result)
