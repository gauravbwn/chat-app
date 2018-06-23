var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./../utility/message');
var {Users} = require('./../utility/users');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var text = "a test message";
    var from = "test agent";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = "test agent";
    var lat = 24;
    var lng = 90;
    var message = generateLocationMessage(from, lat, lng);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', `https://www.google.com/maps?q=${lat},${lng}`);
  });
});

describe('Users', () => {
  var users;

  beforeEach(() => {
      users = new Users();
      users.users = [
        {id: '1', name: 'Tam', room: 'r1'},
        {id: '2', name: 'Sam', room: 'r2'},
        {id: '3', name: 'Wam', room: 'r3'},
        {id: '4', name: 'Dam', room: 'r1'},
        {id: '5', name: 'Pam', room: 'r2'},
        {id: '6', name: 'Jam', room: 'r3'},
      ];
  });

  it('should add a new user', ()=> {
    var users = new Users();
    var user = {
      id: '987987',
      name: 'test user',
      room: 'lobby'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it('should return of list of rooms', () => {
    var roomsList = users.getRoomsList();
    expect(roomsList).toEqual(['r1', 'r2', 'r3']);
  });
  it('should return list of names of users in each room', () => {
    var roomsList = users.getRoomsList();
    roomsList.forEach((room) => {
      var namesList = users.getUsersList(room);
      filteredUsers = users.users.filter((user) => user.room === room);
      expect(namesList).toEqual(filteredUsers.map((user) =>  user.name));
    });
  });
  it('should remove an existing user from users array', () => {
    var userId = '4';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(5);
  });
  it('should keep users array unchanged on trying to remove a non-existing user', () => {
    var userId = '40';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(6);
  });
  it('should get an existing user from users array', () => {
    var userId = '4';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should return undef for non existing user', () => {
    var userId = '40';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
})
