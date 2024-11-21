import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

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
        
        var localSalesContract = await this.service.salesContractGetById(this.data.localSalesContractId);
        if (localSalesContract.remainingQuantity != localSalesContract.quantity)
        {
            this.editCallback=null;
            this.deleteCallback=null;
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
