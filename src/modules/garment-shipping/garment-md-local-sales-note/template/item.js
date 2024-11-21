import { inject } from "aurelia-framework";
const ProductLoader = require("../../../../loader/garment-leftover-warehouse-product-loader");
const UomLoader = require("../../../../loader/uom-loader");
import { Service } from "../service";

@inject(Service)
export class Item {
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  details = {
    columns: [
      "No Bon Keluar",
      "Quantity",
      "Satuan",
      "Asal",
      //   "Harga",
      //   "Jumlah",
      //   "Total",
    ],
    onAdd: function () {
      this.data.details.push({});
    }.bind(this),
    onRemove: function () {}.bind(this),
  };

  toggle() {
    this.isShowing = !this.isShowing;
  }

  get total() {
    this.data.amount = this.data.quantity * this.data.price;

    return this.data.amount;
  }
}
