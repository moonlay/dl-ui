import { inject, bindable } from "aurelia-framework";
const ExpenditureGoodLoader = require("../../../../loader/garment-expenditure-good-loader");
const ExpenditureGoodSampleLoader = require("../../../../loader/garment-expenditure-good-sample-loader");
const LeftOverFinishedGoodsLoader = require("../../../../loader/garment-leftover-warehouse-expenditure-finished-goods-loader");
const UomLoader = require("../../../../loader/uom-loader");
import { Service } from "../service";

@inject(Service)
export class Detail {
  @bindable selectedBon;
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.items = context.context.items;
    this.error = context.error;
    this.options = context.options;

    if (this.data.bonNo) {
      this.selectedBon = this.data.bonNo;
    }
  }

  get expenditureGoodLoader() {
    return ExpenditureGoodLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get productFilter() {
    return {
      ProductTypeId: this.context.context.options.transactionTypeId,
    };
  }

  get bonLoader() {
    return async (keyword) => {
      var info = {
        keyword: keyword,
        filterProduction: {
          ExpenditureType: "LAIN-LAIN",
          // IsLocalSalesNote: false,
        },
        filterSample: {
          IsReceived: false,
          ExpenditureType: "PENGIRIMAN LOKAL",
          // IsLocalSalesNote: false,
        },
        filterLeftOver: {
          ExpenditureTo: "JUAL LOKAL",
          IsLocalSalesNote: false,
        },
      };

      var noList = [];

      //Get data from Production
      ExpenditureGoodLoader(keyword, info.filterProduction).then((result) => {
        for (var a of result) {
          var dup = noList.find(
            (d) => d.ExpenditureGoodNo == a.ExpenditureGoodNo
          );
          if (!dup) {
            var selected = this.items.find(
              (x) => x.data.bonNo == a.ExpenditureGoodNo
            );

            if (!selected) {
              a.bonNo = a.ExpenditureGoodNo;
              a.quantity = a.TotalQuantity;
              a.uom = {
                id: 43,
                unit: "PCS",
              };
              a.bonFrom = "PRODUKSI";
              noList.push(a);
            }
          }
        }
      });

      //Get data from Sample
      ExpenditureGoodSampleLoader(keyword, info.filterSample).then((result) => {
        for (var a of result) {
          var dup = noList.find(
            (d) => d.ExpenditureGoodNo == a.ExpenditureGoodNo
          );
          if (!dup) {
            var selected = this.items.find(
              (x) => x.data.bonNo == a.ExpenditureGoodNo
            );

            if (!selected) {
              a.bonNo = a.ExpenditureGoodNo;
              a.quantity = a.TotalQuantity;
              a.uom = {
                id: 43,
                unit: "PCS",
              };
              a.bonFrom = "SAMPLE";
              noList.push(a);
            }
          }
        }
      });

      //get data from Leftover
      LeftOverFinishedGoodsLoader(keyword, info.filterLeftOver).then(
        (result) => {
          for (var a of result) {
            var dup = noList.find(
              (d) => d.FinishedGoodExpenditureNo == a.FinishedGoodExpenditureNo
            );
            if (!dup) {
              var selected = this.items.find(
                (x) => x.data.bonNo == a.FinishedGoodExpenditureNo
              );

              if (!selected) {
                a.bonNo = a.FinishedGoodExpenditureNo;
                a.quantity = parseFloat(a.Description);
                a.uom = {
                  id: 43,
                  unit: "PCS",
                };
                a.bonFrom = "SISA";
                noList.push(a);
              }
            }
          }
        }
      );

      return noList;
    };
  }

  get total() {
    this.data.amount = this.data.quantity * this.data.price;

    return this.data.amount;
  }

  selectedBonChanged(newValue) {
    if (newValue) {
      this.data.bonNo = newValue.bonNo;
      this.data.quantity = newValue.quantity;
      this.data.uom = newValue.uom;
      this.data.bonFrom = newValue.bonFrom;
    } else {
      this.data.bonNo = null;
      this.data.quantity = 0;
      this.data.uom = null;
      this.data.bonFrom = null;
    }
  }
}
