from azure.cosmos import CosmosClient, PartitionKey
import os

# Initialize the Cosmos client with connection string
client = CosmosClient.from_connection_string(
    os.environ["AzureCosmosDBConnectionString"])

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
