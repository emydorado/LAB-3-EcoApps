document.getElementById('results-button').addEventListener('click', fetchData);

document.getElementById('timer-button').addEventListener('click', startTimer);

function startTimer() {
	fetch('http://localhost:5050/start-timer').then(() => {
		updateTimer();
		setInterval(updateTimer, 1000);
	});
}

function updateTimer() {
	fetch('http://localhost:5050/get-timer')
		.then((response) => response.json())
		.then((data) => {
			const containerTimer = document.getElementById('timer-container');
			containerTimer.innerHTML = `Quedan ${data.timeLeft} segundos`;

			if (data.timeLeft <= 0) {
				clearInterval();
				containerTimer.innerHTML = 'Tiempo terminado';
				winner();
			}
		});
}

async function fetchData() {
	renderLoadingState();
	try {
		const response = await fetch('http://localhost:5050/users');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
	} catch (error) {
		console.error(error);
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	if (data.players.length > 0) {
		data.players.forEach((item) => {
			const div = document.createElement('div');
			div.className = 'item';
			div.innerHTML = `<p id="username">${item.name}</p> <p id="move">${item.move}</p>`;
			container.appendChild(div);
		});

		if (data.players.length == 2) {
			const [player1, player2] = data.players;
			const result = winner(player1, player2);
			console.log(result);

			const Ganador = document.createElement('p');
			Ganador.className = 'ganador';
			Ganador.innerText = `Ganó ${result.name}`;
			container.appendChild(Ganador);
		}
	}
}

function winner(player1, player2) {
	if (player1.move === player2.move) {
		return { name: 'Ninguno', move: 'Empate' };
	} else if (
		(player1.move === 'piedra' && player2.move === 'tijera') ||
		(player1.move === 'papel' && player2.move === 'piedra') ||
		(player1.move === 'tijera' && player2.move === 'papel')
	) {
		return player1;
	} else {
		return player2;
	}
}
