import os
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, __version__
import logging

container_name = 'free-tier-generated'
file_name = 'test1.jpeg'
connect_str = os.environ["ConnectionStrings:AZURE_STORAGE_CONNECTION_STRING"]

# Create the BlobServiceClient object which will be used to create a container client
blob_service_client = BlobServiceClient.from_connection_string(connect_str)

blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)


def testHihi():
  try:
      print("Azure Blob Storage v" + __version__ + " - Python quickstart sample")

      # Quick start code goes here

  except Exception as ex:
      print('Exception:')
      print(ex)
  return

def uploadFile(data):
    try:
        res = blob_client.upload_blob(data, overwrite=True)
    except Exception as e:
        logging.exception(e)
    return 'hihi'
