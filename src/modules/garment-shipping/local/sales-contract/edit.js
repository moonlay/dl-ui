import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit = true;
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // this.edit.items = [];
        //     this.edit.items.push({
        //         comodityName : this.edit.comodityName,
        //         quantity : this.edit.quantity,
        //         remainingQuantity : this.edit.remainingQuantity,
        //         uom : this.edit.uom,
        //         price : this.edit.price,
        //         remark : this.edit.remark
        //     });
        // this.data = this.edit;

        this.data.items = [];
            this.data.items.push({
                comodityName : this.data.comodityName,
                quantity : this.data.quantity,
                remainingQuantity : this.data.remainingQuantity,
                uom : this.data.uom,
                price : this.data.price,
                remark : this.data.remark
            });

        // console.log(this.edit);

        this.error = {};
        this.selectedTransactionType = this.data.transactionType;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    saveCallback(event) {

        for(var item of this.data.items) {
            //item.remainingQuantity=item.quantity;
            this.data.uom = item.uom;
            this.data.quantity = item.quantity;
            this.data.remainingQuantity = item.remainingQuantity;
            this.data.comodityName = item.comodityName;
            this.data.price = item.price;
            this.data.remark = item.remark;
        }

        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(e => {
                this.error = e;

                this.error.items = [];
                this.error.items.push({
                    comodity : this.error.comodity,
                    quantity : this.error.quantity,
                    uom : this.error.uom,
                    price : this.error.price,
                });
            })
    }
}
