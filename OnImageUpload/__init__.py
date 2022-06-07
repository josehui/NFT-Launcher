import json
import logging

import azure.functions as func
from . import image_generator as IG


def main(event: func.EventGridEvent, doc: func.Out[func.Document]):

    event_data = event.get_json()
    imgURL = event_data['url']
    # Check if need pixelate
    isPixel = ('P-' in imgURL)
    # Image generation func
    previewImages, bundleUrl = IG.process_images(imgURL, isPixel)

    # event logger
    event_data['previewImages'] = previewImages
    event_data['bundleUrl'] = bundleUrl
    result = json.dumps({
        'id': event_data['clientRequestId'],
        'data': event_data,
        'subject': event.subject,
    })
    doc.set(func.Document.from_json(result))

    logging.info('Python EventGrid trigger processed an event: %s', result)
