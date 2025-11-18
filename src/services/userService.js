const {readUsers, writeUsers} = require('../models/storage');

function slugify(password){
    return password
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '');
            
}

async function getAllUsers(){
    return await readUsers();
}

async function getUserBySlug(slug){
    const users = await readUsers();
    return users.find(user => user.slug === slug);
}

async function createUser({username, name, age}){
    const users = await readUsers();
    const slug = slugify(username);

    let uniqueSlug = slug;
    let suffix = 1;
    while (users.some(user => user.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${suffix++}`;
    }

    const newUser = {
        username,
        name, 
        age,
        password,
        slug: uniqueSlug,
    };
    users.unshift(newUser);
    await writeUsers(users);
    return newUser;
}

module.exports = {getAllUsers, getUserBySlug, createUser};