const userService = require('../services/userService');

async function index(req, res) {
    const users = await userService.getAllUsers();
    res.render('users/list', {Title: "Lista Użytkowników", users});
}

async function show(req, res){
    const slug = req.params.slug;
    const user = await userService.getUserBySlug(slug);

    if(!user) return res.status(404).render('users/error', {Title: "Nie znaleziono"});

    res.render('users/show', {Title: user.username, user});
}

async function create(req, res) {
    const {username, name, age, password } = req.body;
    const errors = [];

    if(!username || username.trim().length === 0) {
        errors.push("Nazwa użytkownika nie może być pusta.");
    }

    const ageNum = parseInt(age);
    if(!age || isNaN(ageNum)) {
        errors.push("Wiek musi być liczbą.");
    } else if(ageNum < 18) {
        errors.push("Musisz być pełnoletni (min. 18 lat), aby się zarejestrować.");
    }
    
    if(!password || password.trim().length === 0) {
        errors.push("Hasło nie może być puste.");
    } else if(!passwordRegex.test(password)) {
        errors.push("Hasło musi zawierać minimum 8 znaków, w tym: wielką literę, małą literę, cyfrę i znak specjalny (@$!%*?&).");
    }

    if(errors.length > 0){
        return res.status(400).render('users/new', {
            Title: "Nowy użytkownik",
            errors,
            values: req.body,
        });
    } else {
        const user = await userService.createUser({username, name, age: ageNum, password});
        res.redirect(`/users/${user.slug}`);
    }
}

async function newUser(req, res){
    res.render('users/new', 
        {Title: "Nowy użytkownik",
        errors: null,
        values: {}
    });
}

module.exports = {index, show, create, newUser};