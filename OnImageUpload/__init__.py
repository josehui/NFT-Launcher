import json
import logging

import azure.functions as func
from . import image_generator as IG


def main(event: func.EventGridEvent, doc: func.Out[func.Document]):

    # TO-DO: Add image generation code
    IG.testHihi()
    img = IG.process_images()
    logging.info(type(img))

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
