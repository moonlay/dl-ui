import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
const UomLoader = require('../../../../../loader/uom-loader');
import { Service } from '../service';

@inject(Service)
export class Item {

    comodityOptions = [
        'BARANG JADI',
        'SISA FABRIC',
        'SISA PENOLONG',
        'AVAL',
        'MESIN',
        'JASA'
    ]

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.buyerType =  this.context.context.options.buyerType;

        // if (this.data) {
        //     this.selectedComodity = this.data.comodityName;
        // }
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (data) => {
        return `${data.Unit || data.unit}`;
    }

    get total() {
        this.data.amount = this.data.quantity * this.data.price;
        return this.data.amount;
    }

    selectedComodityChanged(newValue, oldValue){
        this.data.comodityName = newValue;
    }
}