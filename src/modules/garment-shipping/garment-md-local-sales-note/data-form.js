import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service, CoreService } from "./service";

const TransactionTypeLoader = require("../../../loader/garment-transaction-type-loader");
const BuyerLoader = require("../../../loader/garment-leftover-warehouse-buyer-loader");
const SalesContractLoader = require("../../../loader/garment-md-local-sales-contract-loader");
var VatTaxLoader = require("../../../loader/vat-tax-loader");
import AccountBankLoader from "../../../loader/account-banks-loader";

@inject(Service, CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable selectedAccountBank;
  @bindable selectedTransactionType;
  @bindable selectedSalesContract;
  @bindable selectedPaymentType;
  @bindable selectedVatTax;
  @bindable options = { useVat: false };

  constructor(service, coreService) {
    this.service = service;
    this.coreService = coreService;
  }

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  bankFilter = {
    DivisionName: "G",
  };

  filterSC = {
    "(RemainingQuantity>0)": true,
    IsLocalSalesDOCreated: true,
  };

  paymentTypeOptions = ["TUNAI", "TEMPO"];
  bcTypeOptions = ["BC 27", "BC 25", "BC 41"];
  items = {
    columns: [
      "Komoditi Barang",
      "Quantity",
      "Satuan",
      "Harga",
      "Total",
      "Keterangan",
    ],
    onAdd: function () {
      this.data.items.push({});
    }.bind(this),
    options: {
      transactionTypeId: 0,
    },
  };

  get salesContractLoader() {
    return SalesContractLoader;
  }

  get transactionTypeLoader() {
    return TransactionTypeLoader;
  }

  get buyerLoader() {
    return BuyerLoader;
  }

  transactionTypeView = (data) => {
    return `${data.Code || data.code} - ${data.Name || data.name}`;
  };

  buyerView = (data) => {
    return `${data.Code || data.code} - ${data.Name || data.name}`;
  };

  buyerNPWPView = (data) => {
    return data.NPWP || data.npwp;
  };

  buyerNIKView = (data) => {
    return data.NIK || data.nik;
  };

  buyerKaberView = (data) => {
    return data.KaberType || data.kaberType;
  };

  get vatTaxLoader() {
    return VatTaxLoader;
  }

  vatTaxView = (vatTax) => {
    return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
  };

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    if (this.data && this.data.transactionType) {
      this.items.options.transactionTypeId = this.data.transactionType.id;
    }

    if (this.data.id) {
      if (this.data.bank.id) {
        this.coreService
          .getBankAccountById(this.data.bank.id)
          .then((result) => {
            this.selectedAccountBank = {
              Id: this.data.bank.id,
              BankName: result.BankName,
              AccountNumber: result.AccountNumber,
              Currency: {
                Code: result.Currency.Code,
              },
            };

            this.data.bank = result.BankName;
          });
      }

      this.data.bank.id = this.data.bank.id;

      this.selectedSalesContract = {
        salesContractNo: this.data.salesContractNo,
        id: this.data.localSalesContractId,
      };
      if (this.data.paymentType) {
        this.selectedPaymentType = this.data.paymentType;
      }
      var sc = await this.service.getSCById(this.data.localSalesContractId);
      for (var item of this.data.items) {
        if (sc) {
          item.remQty = sc.remainingQuantity + item.quantity;
        }
      }
    }

    this.selectedVatTax = this.data.vat || false;

    if (this.data.useVat) {
      this.options.useVat = true;
    }
  }

  get dueDate() {
    if (!this.data.date) {
      return null;
    }

    this.data.dueDate = new Date(this.data.date || new Date());
    this.data.dueDate.setDate(this.data.dueDate.getDate() + this.data.tempo);

    return this.data.dueDate;
  }

  selectedTransactionTypeChanged(newValue, oldValue) {
    if (newValue) {
      this.data.transactionType = newValue;
      this.items.options.transactionTypeId = newValue.Id;

      if (oldValue && newValue.Id != oldValue.Id) {
        this.data.items.splice(0);
      }
    } else {
      this.data.transactionType = null;
      this.data.items.splice(0);
    }
  }

  async selectedSalesContractChanged(newValue, oldValue) {
    if (!this.data.id) this.data.items.splice(0);
    if (newValue) {
      if (newValue.id != this.data.localSalesContractId) {
        this.data.localSalesContractId = newValue.id;
        this.data.salesContractNo = newValue.salesContractNo;
        this.data.transactionType = newValue.transactionType;
        this.data.buyer = newValue.buyer;
        this.data.useVat = newValue.isUseVat;

        this.data.vat = {
          id: newValue.vat.Id || newValue.vat.id,
          rate: newValue.vat.Rate || newValue.vat.rate,
        };

        //mapping items from SC
        var item = {};
        item.localSalesContractId = newValue.id;
        item.comodityName = newValue.comodityName;
        item.quantity = newValue.remainingQuantity;
        item.uom = newValue.uom;
        item.price = newValue.price;
        item.remark = newValue.remark;
        item.remQty = newValue.remainingQuantity;
        item.details = [{}];
        this.data.items.push(item);
      }
    } else {
      this.data.transactionType = null;
      this.data.items.splice(0);
      this.data.buyer = null;
      this.data.useVat = false;
      this.data.salesContractNo = "";
      this.data.localSalesContractId = 0;
    }
  }

  selectedPaymentTypeChanged(newValue) {
    this.data.paymentType = newValue;
    if (this.data.paymentType == "TUNAI") {
      this.data.tempo = 0;
    }
  }

  selectedVatTaxChanged(newValue) {
    var _selectedVatTax = newValue;
    if (_selectedVatTax) {
      this.data.vat = {
        id: _selectedVatTax.Id || _selectedVatTax.id,
        rate: _selectedVatTax.Rate || _selectedVatTax.rate,
      };
    } else {
      this.data.vat = {};
    }
  }

  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.bank = newValue;
    }
  }

  get subtotal() {
    this.data.subTotal = (this.data.items || []).reduce(
      (acc, cum) => acc + cum.amount,
      0
    );

    return this.data.subTotal;
  }

  @computedFrom("data.vat.rate", "data.subTotal")
  get ppn() {
    var ppn = 0;
    if (this.data.subTotal && this.data.useVat) {
      ppn = this.data.subTotal * (this.data.vat.rate / 100);
    }

    return ppn;
  }

  @computedFrom("data.vat.rate", "data.subTotal")
  get total() {
    var total = 0;
    if (this.data.subTotal) {
      if (this.data.useVat)
        total =
          this.data.subTotal * (this.data.vat.rate / 100) + this.data.subTotal;
      else total = this.data.subTotal;
    }
    return total;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  accountBankView = (acc) => {
    return `${acc.BankName} - ${acc.Currency.Code}`;
  };
}
