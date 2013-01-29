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
                            de[0].store.filters.removeAtKey(el.detailField);
                            de[0].store.filters.add(el.detailField, new Ext.util.Filter({
                                    property: el.detailField,
                                    value: rv
                                }
                            ));
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
                            de[0].store.clearFilter();
                            de[0].store.filter(el.detailField, rv);
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
        fields:['id', 'master_id', 'display'],
        data: [
            { 'id': 1, 'master_id': 1, 'display': 'One' },
            { 'id': 2, 'master_id': 2, 'display': 'Two' },
            { 'id': 3, 'master_id': 3, 'display': 'Three' }
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
        fields:['id', 'master_id', 'display'],
        data: [
            { 'id': 1, 'master_id': 1, 'display': 'Detail One (master id  = 1)' },
            { 'id': 2, 'master_id': 1, 'display': 'Detail Two (master id = 1)' },
            { 'id': 3, 'master_id': 1, 'display': 'Detail Three (master id = 1)' },

            { 'id': 4, 'master_id': 2, 'display': 'Detail One (master id  = 2)' },
            { 'id': 5, 'master_id': 2, 'display': 'Detail Two (master id = 2)' },
            { 'id': 6, 'master_id': 2, 'display': 'Detail Three (master id = 2)' },

            { 'id': 7, 'master_id': 3, 'display': 'Detail One (master id  = 3)' },
            { 'id': 8, 'master_id': 3, 'display': 'Detail Two (master id = 3)' },
            { 'id': 9, 'master_id': 3, 'display': 'Detail Three (master id = 3)' }
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
                detailField: 'master_id', // <--- The "foreign key" for store of detail combo
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
                fieldLabel: 'Detail combo',
                itemId: 'detail-combo',
                name: 'name2',
                displayField: 'display',
                valueField: 'master_id',
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