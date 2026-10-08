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

  return (
    <main className="todo-app"> {/* Huvudkomponenten för appen */}
      <h1>Att göra-lista</h1>

      {/* Formuläret för att lägga till en ny uppgift. När användaren skickar in formuläret körs addTask-funktionen. */}
      <form className="todo-form" onSubmit={addTask}> {/* Formuläret har en onSubmit-händelse som kör addTask-funktionen när användaren klickar på "Lägg till"-knappen */}
        <input
          id="new-task" // Sätter id på inmatningsfältet, så etiketten kan kopplas till det
          type="text" // Sätter typen på inmatningsfältet till text
          value={inputText} // Sätter värdet på inmatningsfältet till inputText, så det uppdateras när anv. skriver
          onChange={(event) => setInputText(event.target.value)} // När anv. skriver i inmatningsfältet uppdateras inputText med det nya värdet
          placeholder="Att göra..." // Sätter en placeholder i inmatningsfältet, så anv. vet vad som ska skrivas in
        />
        <button type="submit">Lägg till</button> {/*Knappen skickar in formuläret, vilket kör addTask-funktionen*/}
      </form>


      {/* Listan skapas från state och uppdateras automatiskt när state ändras. */}
      <ul className="todo-list"> {/* Listan med alla uppg. Varje uppg. renderas som ett li-element med en checkbox och en raderingsknapp */}
        {tasks.map((task) => ( // Loopar igenom alla uppgifter i tasks och renderar dem som li-element
          <li
            className={`todo-item${task.completed ? " completed" : ""}`} // Om uppgiften är slutförd, lägg till klassen "completed" för att ändra utseendet
            key={task.id} // Sätter ett unikt key-attribut på varje li-element, så React kan hålla reda på dem när de uppdateras
          >
            {/* Checkboxen ändrar status för just denna uppgift. */}
            <label> {/* Label-elementet används för att koppla checkboxen till uppgiftens text, så användaren kan klicka på texten för att markera uppgiften som slutförd */}
              <input
                type="checkbox" // Sätter typen på input-elementet till checkbox
                checked={task.completed} // Sätter checkboxen som markerad om uppgiften är slutförd
                onChange={() => toggleTask(task.id)} // När användaren klickar på checkboxen körs toggleTask-funktionen med uppgiftens id som argum.
              />
              <span>{task.text}</span> {/* Visar uppgiftens text bredvid checkboxen */}
            </label>

            {/* Raderingsknappen använder uppgiftens id, så övriga lämnas orörda. */}
            <button type="button" onClick={() => deleteTask(task.id)}> {/* Knappen kör deleteTask-funktionen med uppgiftens id som argum. när anv. klickar på den */}
              Radera
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
