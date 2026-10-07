import { useState } from "react" // Importerar useState-hooken från React, för att hantera state i komponenter 
import "./App.css"; // Importerar CSS-filen, se till att tweaka den för lämplig design snarare än standard (om hinner)

export default function App() { // Exporterar App-komponenten som default, så den kan importeras i index.js
	const [inputText, setInputText] = useState(""); // Skapar state för inmatningsfältet, med initialt värde som en tom sträng
	
	const [tasks, setTasks] = useState([]); // Skapar state för tasks, med initialt värde som en tom array. Här lagras uppg. användaren lägger till.
  	
	function addTask(event) { // funktion som körs när användaren klickar på "Lägg till"-knappen
		event.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas in
		
		const text = inputText.trim(); // Tar bort whitespace i början o slutet av inmatad text så inte går mata in tomt
		
		if (text === "") {// Om användaren försöker lägga till en tom uppgift, gör inget
			return;
		}
		
		setTasks((currentTasks) => [ // Uppdaterar tasks med tilllagd uppgift.
			...currentTasks,// Tar med alla tidigare uppgifter
			{
				id: crypto.randomUUID(), // Skapar ett unikt id för varje uppgift
				text, // Sätter texten till det användaren skrev in
				completed: false, // Sätter completed till false som default
			},
		]);
		
		setInputText(""); // Rensar inmatningsfältet effter tillagd uppgift
	}

  function toggleTask(taskId) { // Funktion som körs när användaren klickar på checkboxen för en uppgift
		setTasks((currentTasks) => // Uppdaterar tasks med slutförd-status för den uppgift som matchar taskId
			currentTasks.map((task) => // Loopar igenom alla uppgifter
				task.id == taskId // Om uppgiftens id matchar taskId, ändra slutfröd-statusen till motsatt värde
					? { ...task, completed: !task.completed } // Skapar en ny uppgift med samma egenskaper som den gamla, men med ändrad slutförd-status
					: task, // Om uppgiftens id inte matchar taskId, returnera uppgiften som den är
			),
		);
	}
	
	function deleteTask(taskId) {// Funktion som körs när användaren klickar på "Ta bort"-knappen för en uppgift
		setTasks((currentTasks) => // Uppdaterar tasks med alla uppgifter som inte matchar taskId
			currentTasks.filter((task) => task.id !== taskId), // Loopar igenom alla uppgifter och returnerar endast de som inte matchar taskId
		);
	}
}	 // Stänger funktionen App för strunden - men den skall eg. stängas i slutet, efter att all kod  är skriven - GLÖM INTE ÄNDRA!