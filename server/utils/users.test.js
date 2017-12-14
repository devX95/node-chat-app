const expect = require('expect');
const {Users} = require('./users');


var user = [{
        id: '/asdjgsjhad',
        name: 'Gibran',
        room: 'Home'
    }];

describe('Users', () => {
    var users;
    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Gibran',
            room: 'Home'
        }, {
            id: '2',
            name: 'Ruqia',
            room: 'React'
        }, {
            id: '3',
            name: 'Ali',
            room: 'Home'
        }];
    });

    it('should add users', ()=>{
        users = new Users();
        var user = {
            id: '123',
            name: 'Gibran',
            room: 'Home'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for home', ()=> {
        var userList = users.getUserList('Home');
        expect(userList).toEqual(['Gibran', 'Ali']);
    });

    it('should return names for React', ()=> {
        var userList = users.getUserList('React');
        expect(userList).toEqual(['Ruqia']);
    });

    it('should remove a user', () => {
        var id = '1';
        var resUser = users.removeUser(id);
        expect(users.users).toEqual(users.users.filter((user) => user.id !== id));
    });

    it('should not remove a user', () => {
        var id = '2234';
        var resUser = users.removeUser(id);
        expect(resUser).toEqual();
    });

    it('should return a user', () => {
        var id = '1';
        expect(users.getUser(id)).toEqual(users.users[0]);
    });

    it('should not return a user', () => {
        var id = '1dsff';
        expect(users.getUser(id)).toEqual(undefined);
    });
});