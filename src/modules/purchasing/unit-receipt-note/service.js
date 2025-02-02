import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'unit-receipt-notes/by-user';
const EPOserviceUri ='external-purchase-orders';
const PRserviceUri = 'purchase-requests/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getStorageById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/storages/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getEPOById(id) {
        var endpoint = `${EPOserviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPRById(id) {
        var endpoint = `${PRserviceUri}/${id}`;
        return super.get(endpoint);
    }
}
