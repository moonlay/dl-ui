import {Aurelia, inject} from 'aurelia-framework';
import {AuthenticateStep} from 'aurelia-authentication'; 
 
export class App {  
  configureRouter(config, router) {
    config.title = '';
    config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes

    var routes = [ 
      { route: 'login',                                                                     name: 'login',                                    moduleId: './login',                                                                                  nav: true, title: 'login' },
      { route: ['', 'Welcome'],                                                             name: 'welcome',                                  moduleId: './welcome',                                                                                nav: false, title: 'Home',                                            auth:true}, 
      { route: 'buyers',                                                                    name: 'buyers',                                   moduleId: './modules/master/buyer/index',                                                             nav: true,  title: 'Buyer',                                           auth:true,  settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'suppliers',                                                                 name: 'suppliers',                                moduleId: './modules/master/supplier/index',                                                          nav: true,  title: 'Supplier',                                        auth:true,  settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'uoms',                                                                      name: 'uoms',                                     moduleId: './modules/master/uom/index',                                                               nav: true,  title: 'Satuan',                                          auth:true,  settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'products',                                                                  name: 'products',                                 moduleId: './modules/master/product/index',                                                           nav: true,  title: 'Barang',                                          auth:true,  settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'pr',                                                                        name: 'purchase-request',                         moduleId: './modules/purchasing/purchase-request/index',                                              nav: true,  title: 'Purchase Request',                                auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'pr/monitoring',                                                             name: 'purchase-request-monitoring',              moduleId: './modules/purchasing/monitoring-purchase-request/index',                                   nav: true,  title: 'Monitoring Purchase Request',                     auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po',                                                                        name: 'purchase-order',                           moduleId: './modules/purchasing/purchase-order/index',                                                nav: true,  title: 'Purchase Order',                                  auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po-external',                                                               name: 'purchase-order-external',                  moduleId: './modules/purchasing/purchase-order-external/index',                                       nav: true,  title: 'Purchase Order External',                         auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/monitoring',                                                             name: 'purchase-order-monitoring',                moduleId: './modules/purchasing/monitoring-purchase-order/index',                                     nav: true,  title: 'Monitoring Purchase',                             auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/reports/periode/unit',                                                   name: 'purchase-order-reports-periode-unit',      moduleId: './modules/purchasing/reports/purchase-order-report/unit-report/index',                     nav: true,  title: 'Laporan Total Pembelian per Unit',                auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/reports/periode/category',                                               name: 'purchase-order-reports-periode-category',  moduleId: './modules/purchasing/reports/purchase-order-report/category-report/index',                 nav: true,  title: 'Laporan Total Pembelian per Kategori',            auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/reports/periode/unit-category',                                          name: 'purchase-order-reports-periode-unit-category',      moduleId: './modules/purchasing/reports/purchase-order-report/unit-category-report/index',     nav: true,  title: 'Laporan Total Pembelian per Unit per Kategori',    settings: { group:"purchasing", roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'do',                                                                        name: 'delivery-order',                           moduleId: './modules/purchasing/delivery-order/index',                                                nav: true,  title: 'Surat Jalan',                                     auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'do/monitoring',                                                             name: 'delivery-order-monitoring',                moduleId: './modules/purchasing/monitoring-delivery-order/index',                                     nav: true,  title: 'Monitoring Surat Jalan',                          auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'receipt-note/unit',                                                         name: 'receipt-note-unit',                        moduleId: './modules/purchasing/unit-receipt-note/index',                                             nav: true,  title: 'Bon Terima Unit',                                 auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'receipt-note/unit/monitoring',                                              name: 'receipt-note-unit-monitoring',             moduleId: './modules/purchasing/unit-receipt-note-monitoring/index',                                  nav: true,  title: 'Monitoring Bon Terima Unit',                      auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'unit-payment-order',                                                        name: 'unit-payment-order',                       moduleId: './modules/purchasing/unit-payment-order/index',                                            nav: true,  title: 'Surat Perintah Bayar',                            auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'unit-payment-note/price-correction',                                        name: 'unit-payment-price-correction-note',       moduleId: './modules/purchasing/unit-payment-price-correction-note/index',                            nav: true,  title: 'Koreksi Harga Pembelian',                         auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'unit-payment-note/quantity-correction',                                     name: 'unit-payment-quantity-correction-note',    moduleId: './modules/purchasing/unit-payment-quantity-correction-note/index',                         nav: true,  title: 'Koreksi Jumlah Pembelian',                        auth:true,  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/winding-quality-sampling',                      name: 'winding-quality-sampling',                 moduleId: './modules/production/spinning/winding/winding-quality-sampling/index',                     nav: true, title: 'Quality Hasil Produksi Spinning',                  auth:true,  settings: { group:"production",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/winding-quality-sampling/report',               name: 'winding-quality-sampling-report',          moduleId: './modules/production/spinning/winding/reports/winding-quality-sampling-report/index',      nav: true, title: 'Laporan Quality Hasil Produksi Spinning',          auth:true,  settings: { group:"production",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/winding-production-output',                     name: 'winding-production-output',                moduleId: './modules/production/spinning/winding/winding-production-output/index',                    nav: true,  title: 'Output Hasil Produksi Spinning',                  auth:true,  settings: { group:"production",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/reports/daily-spinning-production-report',      name: 'daily-spinning-production-report',         moduleId: './modules/production/spinning/winding/reports/daily-spinning-production-report/index',     nav: true,  title: 'Monitoring Output Hasil Produksi Spinning',       auth:true,  settings: { group:"production",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      
      { route: 'power-bi',                                                                  name: 'power-bi',                                 moduleId: './modules/power-bi/index',                                                                 nav: true, title: 'Power BI Reports' ,                                auth:true,  settings: { group:"reports",      roles:["admin"],      iconClass:'fa fa-dashboard' }}
    ]; 

    config.map(routes);
    this.router = router;
  }
}

