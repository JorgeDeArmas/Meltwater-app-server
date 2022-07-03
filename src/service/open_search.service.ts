import { Client, Connection } from "@opensearch-project/opensearch";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Credentials } from "@aws-sdk/types";
import { ClientRequestArgs } from "http";
import aws4 from "aws4";

var host =
  "https://search-meltwater-qmo6r2b6zmjg2mms57qy2f7y6a.us-east-1.es.amazonaws.com/"; // e.g. https://my-domain.region.es.amazonaws.com

export interface IRequest extends ClientRequestArgs {
  service: string;
  region: string;
  //headers: any;
}

const createAwsConnector = (credentials: Credentials, region: string) => {
  class AmazonConnection extends Connection {
    buildRequestObject(params: any) {
      const request = super.buildRequestObject(params) as IRequest;
      request.service = "es";
      request.region = region;
      request.headers = request.headers || {};
      request.headers["host"] = request.hostname || undefined;

      const awsFour = aws4.sign(JSON.stringify(request), credentials);

      return awsFour;
    }
  }
  return {
    Connection: AmazonConnection,
  };
};

const getClient = async () => {
  const credentials = await defaultProvider()();

  const connector = createAwsConnector(credentials, "us-east-1");

  try {
    return new Client({
      ...connector,
      node: host,
    });
  } catch (err) {
    console.log("Client error");
  }
  return null;
};

async function search() {
  // Initialize the client.
  var client = await getClient();

  // Create an index.
  var index_name = "test-index";
  var response = await client?.indices.create({
    index: index_name,
  });
  console.log("Creating index:");
  console.log(response?.body);
  // Add a document to the index.
  //   var document = {
  //     title: "Moneyball",
  //     director: "Bennett Miller",
  //     year: "2011",
  //   };
  //   var response = await client?.index({
  //     index: index_name,
  //     body: document,
  //   });
  //   console.log(response?.body);
}

search().catch();
