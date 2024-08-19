const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = {
	players: [],
};

let timer = 10; // tiempo restante
let interval = null; // maneja el intervalo

app.get('/users', (request, response) => {
	response.send(db);
});

app.post('/user', (request, response) => {
	const { body } = request;
	db.players.push(body);
	response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
});

// iniciar el temporizador
app.get('/start-timer', (request, response) => {
	if (!interval) {
		timer = 10; // Reiniciar el temporizador a 10 segundos
		interval = setInterval(() => {
			if (timer > 0) {
				timer--;
			} else {
				clearInterval(interval);
				interval = null;
			}
		}, 1000);
	}
	response.json({ success: true, timeLeft: timer });
});

// obtener el tiempo restante
app.get('/get-timer', (request, response) => {
	response.json({ timeLeft: timer });
});

app.listen(5050, () => {
	console.log(`Server is running on http://localhost:5050`);
});
