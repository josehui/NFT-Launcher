import os
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, ContentSettings, __version__
import logging

Container_name = 'free-tier-generated'
Connect_str = os.environ["ConnectionStrings:AZURE_STORAGE_CONNECTION_STRING"]

# Create the BlobServiceClient object which will be used to create a container client
Blob_service_client = BlobServiceClient.from_connection_string(Connect_str)


def testHihi():
    try:
        print("Azure Blob Storage v" + __version__ +
              " - Python quickstart sample")

        # Quick start code goes here

    except Exception as ex:
        print('Exception:')
        print(ex)
    return


def uploadFile(data, file_name='test.jpeg', file_type='application/octet-stream'):
    try:
        blob_client = Blob_service_client.get_blob_client(
            container=Container_name, blob=file_name)
        cnt_settings = ContentSettings(content_type=file_type)
        blob_client.upload_blob(
            data, content_settings=cnt_settings, overwrite=True)
        return blob_client.url
    except Exception as e:
        logging.exception(e)
    return 'Error in upload'


def listFile(container_name=Container_name):
    try:
        container_client = Blob_service_client.get_container_client(
            container_name)
        return container_client.list_blobs()
    except Exception as e:
        logging.exception(e)
    return 'Error to list file'
