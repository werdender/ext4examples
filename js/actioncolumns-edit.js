
Ext.onReady(function() {
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [ 'name', 'class', 'view', 'edit', 'delete']
    });
    var userStore = Ext.create('Ext.data.Store', {
        model: 'User',
        data: [
            { name: 'Sri Vidhya', 'class': '6 A'},
            { name: 'Rafla', 'class': '9 C'},
            { name: 'Fabin', 'class': '10 B'},
            { name: 'Jayanthi', 'class': '8 C'},
            { name: 'Sri Vidhya', 'class': '6 A'},
            { name: 'Rafla', 'class': '9 C'},
            { name: 'Fabin', 'class': '10 B'},
            { name: 'Jayanthi', 'class': '8 C'},
            { name: 'Sri Vidhya', 'class': '6 A'},
            { name: 'Rafla', 'class': '9 C'},
            { name: 'Fabin', 'class': '10 B'},
            { name: 'Jayanthi', 'class': '8 C'}
        ]
    });
    Ext.create('Ext.grid.Panel', {
        cls: 'custom-grid',
        renderTo: 'grid',
        store: userStore,
        width: 500,
        height: 200,
        title: 'Student Details',
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                initEditTriggers: function() {
                    return !1; // if you do not want start editing by clicks
                }
            })
        ],
        columns: [
            {
                text: 'Student Name',
                cls: 'studentName',
                width: 100,
                sortable: true,
                hideable: false,
                dataIndex: 'name',
                editor: 'textfield'
            },
            {
                text: 'Student Class',
                cls: 'studentClass',
                width: 150,
                sortable : true,
                dataIndex: 'class',
                editor: 'textfield'
            },
            {
                xtype:'actioncolumn',
                tdCls:'view',
                flex: 1,
                items: [{
                    icon: 'https://raw.github.com/werdender/ext4examples/master/images/zoom.png',
                    tooltip: 'View',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex),
                            tpl = new Ext.XTemplate(
                                '<div style="padding: 10px;">',
                                    '<div>Student name: {name}</div>',
                                    '<div>Student class: {class}</div>',
                                '</div>');
                        Ext.create('Ext.window.Window', {
                            title: 'View ' + rec.get('name'),
                            height: 200,
                            modal: true,
                            width: 400,
                            layout: 'fit',
                            tpl: tpl,
                            data: rec.getData()
                        }).show();
                    }
                },{
                    icon: 'https://raw.github.com/werdender/ext4examples/master/images/edit.png',
                    tooltip: 'Edit',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        grid.editingPlugin.startEdit(rec,0);
                        //also you can create a form, load and edit record
                    }
                },{
                    icon: 'https://raw.github.com/werdender/ext4examples/master/images/cross.png',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if( ! confirm("Delete " + rec.get('name') + '?')) return false;
                        grid.getStore().remove(rec);
                    }
                }]
            }]
    });
});

