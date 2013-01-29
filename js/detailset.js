    /**
     * plugin
     */
    Ext.define('App.plugin.detailset', {
        alias: 'plugin.detailset',
        init: function(combo) {
            combo.on({
                'select': function(el, rec, e) {
                    var de = el.up('form').query('field[itemId='+el.detailEl+']'),
                        r = rec[0],
                        fs = de[0].forceSelection,
                        rv = false;
                    if(de[0] && r && el.detailField) {
                        rv = r.get(el.detailField);
                    }
                    if(rv) {
                        if(de[0].queryMode == 'remote' && de[0].forceSelection) {
                            var s = de.store.sorters;
                            de[0].store.load({
                                params: {
                                    query: rv
                                },
                                callback: function() {
                                    de[0].setValue(rv);
                                }
                            })
                        }else{
                            de[0].setValue(rv);
                        }
                    }
                }
            })
        }
    });


    /**
     * stores
     */
    Ext.create('Ext.data.Store', {
        storeId:'masterStore',
        fields:['id', 'display'],
        data: [
            { 'id': 1,  'display': 'One' },
            { 'id': 2,  'display': 'Two' },
            { 'id': 3,  'display': 'Three' }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    Ext.create('Ext.data.Store', {
        storeId:'detailStore',
        fields:['id', 'display'],
        data: [
            { 'id': 1,  'display': 'Detail One' },
            { 'id': 2,  'display': 'Detail Two' },
            { 'id': 3,  'display': 'Detail Three' }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    /**
     * form
     */
    Ext.onReady(function() {
        Ext.create('Ext.form.Panel', {
            renderTo: 'form',
            width: 500,
            height: 170,
            title: 'Select a combos value',
            bodyPadding: '10 10 0',
            frame: true,

            defaults: {
                anchor: '100%',
                allowBlank: false,
                labelAlign: 'top'
            },

            items: [{
                xtype:'combo',
                plugins: [
                    'detailset'
                ],
                fieldLabel: 'Master combo',
                itemId: 'master-combo',
                detailEl: 'detail-combo', // <--- itemId of detail combo
                detailField: 'id', // <--- The "foreign key" for store of detail combo
                name: 'name',
                displayField: 'display',
                valueField: 'id',
                queryMode: 'local',
                typeAhead: true,
                selectOnFocus: true,
                triggerAction: 'all',
                store: Ext.getStore('masterStore')
            },{
                xtype:'combo',
                plugins: [
                    'detailset'
                ],
                fieldLabel: 'Detail combo',
                itemId: 'detail-combo',
                detailEl: 'master-combo', // <--- itemId of master combo (if you need it)
                detailField: 'id', // <--- The "foreign key" for store of master combo
                name: 'name2',
                displayField: 'display',
                valueField: 'id',
                queryMode: 'local',
                typeAhead: true,
                selectOnFocus: true,
                triggerAction: 'all',
                store: Ext.getStore('detailStore')
            }],

            buttons: [{
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }]
        });
    });