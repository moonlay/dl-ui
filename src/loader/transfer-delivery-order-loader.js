import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'transfer-delivery-orders';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("int-purchasing");

    var localFilter = filter ? filter.localFilter : null;

    if (filter && filter.localFilter) {
        delete filter.localFilter;
    }

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            if (localFilter) {
                return results.data.filter((data) => data && localFilter.indexOf(data.RequestType) >= 0)
            }
            return results.data;
        });
}