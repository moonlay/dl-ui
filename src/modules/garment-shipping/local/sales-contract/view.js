import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    isView = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        if (this.data) {

            this.selectedTransactionType = this.data.transactionType;

            this.data.items = [];
            this.data.items.push({
                comodityName : this.data.comodityName,
                quantity : this.data.quantity,
                remainingQuantity : this.data.remainingQuantity,
                uom : this.data.uom,
                price : this.data.price,
                remark : this.data.remark
            });

            if (this.data.isLocalSalesDOCreated) {
                this.deleteCallback=null;
                this.editCallback=null;
            }

            // for(var item of this.data.items){
            //     if (item.remainingQuantity != item.quantity){
            //         this.deleteCallback=null;
            //         this.editCallback=null;
            //         break;
            //     }

            //     if(item.comodityName == null){
            //         item.comodityName == "-";
            //     }
            // }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

}
