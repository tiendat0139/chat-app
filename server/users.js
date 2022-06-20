const users = [];
//users is all user from all room

//add user to room
//every user connect, will has a id

const addUsers = ({id,name,room}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if(!name || !room) return {error: 'Username and room required. '}
    const existtingUser = users.find((user) =>  user.name === name && user.room === room)
    if(existtingUser) return {error: 'User is taken'}
    
    const user = {id, name, room};
    users.push(user)
    console.log(users)
    return { user }
}

//remove user from room
const removeUsers = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index){
        //remove user and return this user
        return users.splice(index,1)[0];
    }
}

//find user in id
const getUser = (id) => users.find((user) => user.id === id);


//get user is in one room
const getUserInRoom = (room) => users.filter((user) => user.room === room) 

module.exports = {users, addUsers, getUser, removeUsers, getUserInRoom}