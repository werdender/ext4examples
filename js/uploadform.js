/**
* xtype
*/
    Ext.define('fileupload',{
        extend: 'Ext.form.field.Text'
        ,alias: 'widget.fileupload'
        ,inputType: 'file'
        ,listeners: {
            render: function (me, eOpts) {
                var el = Ext.get(me.id).down('input'); //<-- 4.0.7
                el.set({
                    size: me.inputSize || 1
                });
                if(me.multiple) {
                    el.set({
                        multiple: 'multiple'
                    });
                }
            }
        }
    });

    /**
* vtype
*/
    Ext.apply(Ext.form.field.VTypes, {
        file: function(val, field) {
            var input, files, file
            ,acceptSize = field.acceptSize || 4096 // default max size
            ,acceptMimes = field.acceptMimes || ['rtf', 'pdf', 'doc', 'xls', 'xlsx', 'zip', 'rar']; // default types

            input = Ext.get(field.id).down('input'); //<-- 4.0.7
            files = input.getAttribute('files');
            if ( ! files || ! window.FileReader) {
                return true;
            }
            for(var i = 0, l = files.length; i < l; i++) {
                file = files[i];
                if(file.size > acceptSize * 1024) {
                    this.fileText = (file.size / 1048576).toFixed(1) + ' MB: invalid file size ('+(acceptSize / 1024).toFixed(1)+' MB max)';
                    return false;
                }
                var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
                if(Ext.Array.indexOf(acceptMimes, ext) === -1) {
                    this.fileText = 'Invalid file type ('+ext+')';
                    return false;
                }
            }
            return true;
        }
    });

/**
* form
*/
    Ext.create('Ext.form.Panel', {
        renderTo: 'upload-form'
        ,width: 500
        ,height: 150
        ,fileUpload: true
        ,frame: true
        ,url: '/upload/url'
        ,title: 'File Upload Form'
        ,bodyPadding: '10 10 0'

        ,defaults: {
            anchor: '100%'
            ,allowBlank: false
            ,labelAlign: 'top'
        }

        ,items: [{
            xtype: 'fileupload'
            ,vtype: 'file'
            ,multiple: true // multiupload (multiple attr)
            ,acceptMimes: ['doc', 'xls', 'xlsx', 'pdf', 'zip', 'rar'] // file types
            ,acceptSize: 2048
            ,fieldLabel: 'File <span class="gray">(doc, xls, xlsx, pdf, zip, rar; 2 MB max)</span>'
            ,inputSize: 76 // size attr
            ,msgTarget: 'under'
            ,name: 'filesToUpload[]'
        }]

        ,buttons: [{
            text: 'Upload'
            ,formBind: true
            ,handler: function(){
                var form = this.up('form');
                form.setLoading(true);
                setTimeout(function(){
                    form.setLoading(false);
                    Ext.Msg.alert('Done', 'Your fake data was uploaded!');
                    form.getForm().reset();
                }, 5000);
            }
        },{
            text: 'Reset'
            ,handler: function() {
                this.up('form').getForm().reset();
            }
        }]
    });
