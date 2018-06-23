class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.users.filter((user) => user.id === id)[0];
    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUsersList(room) {
    var filteredUsers = this.users.filter((user) => user.room === room);
    var namesArray = filteredUsers.map((user) => user.name);
    return namesArray;
  }
  getRoomsList(){
    var rooms = this.users.map((user) => user.room);
    return rooms.filter((r, i, l) => l.indexOf(r) === i);
  }
}

module.exports = {Users};
