import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const SalesContractLoader = require('../../../../loader/garment-md-local-sales-contract-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedSalesContract;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    filter = {
        IsLocalSalesDOCreated: false
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Komoditas Barang" },
        { header: "Description" },
        { header: "Quantity " },
        { header: "Satuan" },
        { header: "Jumlah Kemasan" },
        { header: "Satuan Kemasan" },
        { header: "Gross Weight" },
        { header: "Nett Weight" },
    ];

    get salesContractLoader() {
        return SalesContractLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit = this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if (this.data.id) {
            this.selectedSalesContract = {
                salesContractNo: this.data.localSalesContractNo
            };
        }
    }

    selectedSalesContractChanged(newValue) {
        if (this.data.id) return;

        this.data.localSalesContractNo = null;
        this.data.localSalesContractId = 0;
        this.data.buyer = null;
        this.data.items.splice(0);

        if (newValue) {
            this.data.localSalesContractNo = newValue.salesContractNo;
            this.data.localSalesContractId = newValue.id;
            this.data.buyer = newValue.buyer;
            this.service.salesContractGetById(this.data.localSalesContractId)
                .then(salesContract => {
                    let doItem = {};
                    doItem.comodityName = salesContract.comodityName;
                    doItem.quantity = salesContract.quantity;
                    doItem.uom = salesContract.uom;
                    // doItem.packQuantity = 0;
                    // doItem.packUom = null;
                    this.data.items.push(doItem);
                });
        }
    }
}
