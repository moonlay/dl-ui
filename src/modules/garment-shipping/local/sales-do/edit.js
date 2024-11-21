import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};

        if (this.data) {
            this.data.items = [];

            this.data.items.push({
                comodityName : this.data.comodityName,
                description : this.data.description,
                quantity : this.data.quantity,
                packQuantity : this.data.packQuantity,
                uom : this.data.uom,
                packUom : this.data.packUom,
                nettWeight : this.data.nettWeight,
                grossWeight : this.data.grossWeight
            });
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    saveCallback(event) {

        for(var item of this.data.items) {
            this.data.comodityName = item.comodityName;
            this.data.description = item.description;
            this.data.uom = item.uom;
            this.data.quantity = item.quantity;

            this.data.packUom = item.packUom;
            this.data.packQuantity = item.packQuantity;
            this.data.nettWeight = item.nettWeight;
            this.data.grossWeight = item.grossWeight;
        }

        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(e => {
                this.error = e;

                this.error.items = [];
                this.error.items.push({
                    quantity : this.error.quantity,
                    packUom : this.error.packUom,
                    nettWeight : this.error.nettWeight,
                    grossWeight : this.error.grossWeight,
                });
            })
    }
}
