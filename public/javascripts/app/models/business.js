senchamvc.models.Business = new Ext.regModel('Business', {

  fields: [
    {name: 'id' , type: 'int'},
    {name: 'name', type: 'string'},
    {name: 'description', type: 'string'}
  ]
});

senchamvc.stores.remoteBusinesses = new Ext.data.Store({
  id: 'remoteBusinesses',
  model: 'Business',
  proxy: {
    type: 'rest',
    url: 'http://digitalfood.me/api/products',
    reader: {
      type: 'rest',
      root: 'products',
      record: 'business'
    },
    writer: {
      type: 'rest',
      record: 'business'
    }
  }
});

senchamvc.stores.localBusinesses = new Ext.data.Store({
  id: 'localBusinesses',
  model: 'Business',
  proxy: {
    type: 'localstorage',
    id: 'businessses'
  }
});

senchamvc.stores.remoteBusinesses.addListener('load', function () {
  var store = Ext.getStore('localBusinesses');
  store.getProxy().clear();
  store.data.clear();
  store.sync();
  this.each(function (record) {
    var business = senchamvc.stores.localBusinesses.add(record.data)[0];
  });
  senchamvc.stores.localBusinesses.sync();
});
