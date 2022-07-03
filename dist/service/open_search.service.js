"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opensearch_1 = require("@opensearch-project/opensearch");
const credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
const aws4_1 = __importDefault(require("aws4"));
var host = "https://search-meltwater-qmo6r2b6zmjg2mms57qy2f7y6a.us-east-1.es.amazonaws.com/";
const createAwsConnector = (credentials, region) => {
    class AmazonConnection extends opensearch_1.Connection {
        buildRequestObject(params) {
            const request = super.buildRequestObject(params);
            request.service = "es";
            request.region = region;
            request.headers = request.headers || {};
            request.headers["host"] = request.hostname || undefined;
            const awsFour = aws4_1.default.sign(JSON.stringify(request), credentials);
            return awsFour;
        }
    }
    return {
        Connection: AmazonConnection,
    };
};
const getClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield (0, credential_provider_node_1.defaultProvider)()();
    const connector = createAwsConnector(credentials, "us-east-1");
    try {
        return new opensearch_1.Client(Object.assign(Object.assign({}, connector), { node: host }));
    }
    catch (err) {
        console.log("Client error");
    }
    return null;
});
function search() {
    return __awaiter(this, void 0, void 0, function* () {
        var client = yield getClient();
        var index_name = "test-index";
        var response = yield (client === null || client === void 0 ? void 0 : client.indices.create({
            index: index_name,
        }));
        console.log("Creating index:");
        console.log(response === null || response === void 0 ? void 0 : response.body);
    });
}
search().catch();
//# sourceMappingURL=open_search.service.js.map