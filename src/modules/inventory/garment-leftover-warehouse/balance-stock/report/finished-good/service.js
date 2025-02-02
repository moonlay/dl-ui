import { buildQueryString } from "aurelia-path";
import { RestService } from "../../../../../../utils/rest-service";

const serviceUri = "garment/leftover-warehouse-stocks/report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "inventory-azure");
  }

  search(info) {
    let endpoint = `${serviceUri}/finishedgood`;
    console.log(endpoint, info);
    return super.list(endpoint, info);
  }

  xls(info) {
    var endpoint = this._getEndPoint(info);
    console.log(endpoint, info);
    return super.getXls(endpoint);
  }

  _getEndPoint(info) {
    var endpoint = `${serviceUri}/download-finishedgood`;
    var query = "";

    if (info.dateFrom)
      if (query === "") query = `dateFrom=${info.dateFrom}`;
      else query = `${query}&dateFrom=${info.dateFrom}`;

    if (info.dateTo) {
      if (query === "") query = `dateTo=${info.dateTo}`;
      else query = `${query}&dateTo=${info.dateTo}`;
    }
    if (info.unit && info.unit !== "") {
      if (query === "") query = `unit=${info.unit}`;
      else query = `${query}&unit=${info.unit}`;
    }
    if (info.ro && info.ro !== "") {
      if (query === "") query = `ro=${info.ro}`;
      else query = `${query}&ro=${info.ro}`;
    }
    if (info.comodityCode && info.comodityCode !== "") {
      if (query === "") query = `comodityCode=${info.comodityCode}`;
      else query = `${query}&comodityCode=${info.comodityCode}`;
    }
    if (query !== "") endpoint = `${serviceUri}/download-finishedgood?${query}`;

    return endpoint;
  }
}
