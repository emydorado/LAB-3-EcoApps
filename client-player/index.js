document.getElementById('fetch-button').addEventListener('click', createUser);

let move = '';

document.getElementById('piedra').addEventListener('click', () => {
	move = 'piedra';
	console.log(move);
});

document.getElementById('papel').addEventListener('click', () => {
	move = 'papel';
	console.log(move);
});

document.getElementById('tijera').addEventListener('click', () => {
	move = 'tijera';
	console.log(move);
});

document.addEventListener('DOMContentLoaded', () => {
	setInterval(updateTimer, 1000);
});

function updateTimer() {
	fetch('http://localhost:5050/get-timer')
		.then((response) => response.json())
		.then((data) => {
			const containerTimer = document.getElementById('timer-container');
			containerTimer.innerHTML = `Tiempo restante: ${data.timeLeft} segundos`;

			if (data.timeLeft <= 0) {
				containerTimer.innerHTML = 'Tiempo terminado';
			}
		});
}

async function createUser() {
	renderLoadingState();
	try {
		const username = document.getElementById('username_input').value;

		const player = {
			name: username,
			profilePicture: 'https://avatar.iran.liara.run/public/13', // URL de imagen de perfil
			move: move,
		};

		console.log(username);
		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
			},
			body: JSON.stringify(player), // Convierte los datos a una cadena JSON
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		renderData();
	} catch (error) {
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpia los datos anteriores
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpia los datos anteriores
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpia los datos anteriores
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = 'Player created';
	container.appendChild(div);
}
