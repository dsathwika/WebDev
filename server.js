const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.static("Frontend"));

app.listen(port, function() {
    console.log("app is running on http://localhost:" + port);
});

var users = [
    {
        "id": 1,
        "name": "Silje Olsen",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        "id": 2,
        "name": "Anita Rose",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/37.jpg"
    },
    {
        "id": 3,
        "name": "Lucas Wilson",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/28.jpg"
    },
    {
        "id": 4,
        "name": "Juan Taylor",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/50.jpg"
    },
    {
        "id": 5,
        "name": "Fátima Torres",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/13.jpg"
    },
    {
        "id": 6,
        "name": "Jesse Hawkins",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/96.jpg"
    },
    {
        "id": 7,
        "name": "Décio Almeida",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/91.jpg"
    },
    {
        "id": 8,
        "name": "Friedac Renaud",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        "id": 9,
        "name": "Lenni Kivela",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/21.jpg"
    },
    {
        "id": 10,
        "name": "Arlene Carrol",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/73.jpg"
    }
];

var nextId = 11;

function findIndex(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i;
        }
    }
    return -1;
}

app.get("/api/users", function(req, res) {
    return res.json(users);
});


app.get("/api/users/random-user", function(req, res) {
    if (users.length === 0) {
        return res.status(404).json({
            "message": "No user found"
        });
    }

    var randomId = Math.floor(Math.random() * users.length);

    return res.json(users[randomId]);
});


app.get("/api/users/:id", function(req, res) {
    var id = Number(req.params.id);
    var index = findIndex(id);

    if (index === -1) {
        return res.status(404).json({
            "message": "User not found with id " + id
        });
    }

    return res.json(users[index]);
});


app.post("/api/users", function(req, res) {
    if (!req.body.name || !req.body.gender) {
        return res.status(200).json({
            "message": "name and gender are mandatory"
        });
    }

    var newUser = {
        "id": nextId,
        "name": req.body.name,
        "gender": req.body.gender,
        "image": req.body.image || "default.png"
    };

    nextId = nextId + 1;

    users.push(newUser);

    return res.status(201).json(newUser);
});


app.put("/api/users/:id", function(req, res) {
    var id = Number(req.params.id);
    var index = findIndex(id);

    if (index === -1) {
        return res.status(404).json({
            "message": "User not found with id : " + id
        });
    }

    if (req.body.name) {
        users[index].name = req.body.name;
    }

    if (req.body.gender) {
        users[index].gender = req.body.gender;
    }

    if (req.body.image) {
        users[index].image = req.body.image;
    }

    return res.json(users[index]);
});


app.delete("/api/users/:id", function(req, res) {
    var id = Number(req.params.id);
    var index = findIndex(id);

    if (index === -1) {
        return res.status(404).json({
            "message": "User not found with id : " + id
        });
    }

    var user = users[index];

    users.splice(index, 1);

    return res.json({
        "message": "User deleted successfully",
        "user": user
    });
});