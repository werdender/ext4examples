    /**
     * store
     */
    Ext.create('Ext.data.Store', {
        storeId:'someStore',
        fields:['name', 'is_active'],
        data:{'items':[
            { 'name': 'Lisa',  'is_active': true },
            { 'name': 'Bart',  'is_active': false },
        ]},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    });


    /**
     * grid
     */
    Ext.define('App.view.Somegrid', {
        extend: 'Ext.grid.Panel',
        title: 'Grid with actioncolumn - click on icon',
        itemId: 'mygrid',
        height: 150,
        width: 500,

        initComponent: function() {
            Ext.apply(this, {
                columns: [{
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1
                },{
                    text: 'Is active',
                    xtype: 'actioncolumn',
                    align: 'center',
                    dataIndex: 'is_active',
                    width: 70,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        if (value == null || value == true) {
                            return '<img action="disable" src="/images/cross.png" alt="Is Default" title="Some title" class="grid-icon" />';
                        } else {
                            return '<img action="enable" src="/images/add.png" alt="Is Default" title="Some title" class="grid-icon" />';
                        }
                    }
                }],
                store: Ext.data.StoreManager.lookup('someStore'),
                renderTo: 'grid'
            })
            this.callParent(arguments);
        }
    });


    /**
     * controller
     */
    Ext.define('App.controller.AppController', {
        extend:'Ext.app.Controller',

        init:function(){
            this.control({
                'panel[itemId=mygrid] actioncolumn': {
                    click: function(grid, cell, row, col, e) {
                        var record = grid.getStore().getAt(row),
                            action = e.getTarget('.grid-icon', 3, true).getAttribute('action'),
                            message;

                        if(action == 'enable') {
                            message = 'Clicked "enable" for '+record.get('name');
                        }else if(action == 'disable') {
                            message = 'Clicked "disable" for '+record.get('name');
                        }
                        alert(message);
                    }
                }
            });

            this.application.on({
                launch: function() {

                }
            });
        }
    });

    Ext.onReady(function() {

        Ext.Loader.setConfig({
            enabled: false,
            disableCaching: false
        });

        Ext.application({
            name: 'App',
            autoCreateViewport: false,

            controllers:[
                'AppController'
            ],
            views: [
                'Somegrid'
            ],

            launch:function(){
                Ext.create('App.view.Somegrid');
            }
        });

    });
