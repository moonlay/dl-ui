export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:year/:month/:orderType?', moduleId: './view', name: 'view', nav: false, title: 'View:Detail' },
            { route: 'view-kanban/:orderNo', moduleId: './view-kanban', name: 'kanban', nav: false, title: 'View:Detail Kanban' }
        ]);

        this.router = router;
    }
}