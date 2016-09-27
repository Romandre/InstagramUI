angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Roman Kuch',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Accounts', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var accounts = [{
        id: 0,
        name: 'roman.kucherenko',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'somedude',
        face: 'img/max.png'    
    }];

    return {
        all: function() {
            return accounts;
        },
        get: function(accountId) {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].id === parseInt(accountId)) {
                    return accounts[i];
                }
            }
            return null;
        }
    };
});
