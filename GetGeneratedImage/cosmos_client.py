from ast import Raise
from azure.cosmos import exceptions, CosmosClient, PartitionKey
import os
from tenacity import *

# Initialize the Cosmos client with connection string
client = CosmosClient.from_connection_string(
    os.environ["ConnectionStrings:AzureCosmosDBConnectionString"])

# </create_database_if_not_exists>
database_name = 'Images'
database = client.create_database_if_not_exists(id=database_name)
# Create a container
# Using a good partition key improves the performance of database operations.
# <create_container_if_not_exists>
container_name = 'Generated'
container = database.create_container_if_not_exists(
    id=container_name,
    partition_key=PartitionKey(path="/id"),
    offer_throughput=400
)


def read_item(id):
    return container.read_item(item=id, partition_key=id)

# NOT USED - changed to do retry on frontend
# @retry(stop=stop_after_attempt(4), wait=wait_fixed(2))
# def try_read_item(id):
#     print ("tryhihi ..")
#     return container.read_item(item=id, partition_key=id)
