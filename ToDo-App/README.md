# Frågor om koden

## Hur håller din app reda på vilka uppgifter som finns och om de är klara? Vad händer med gränssnittet när datan uppdateras?

Den använder state, via useState. När datan uppdateras så uppdateras state, komponenten renderas om, gränssnittet uppdateras.

## Varför får man inte ändra en beffintlig array direkt med t.ex .push i React? Hur gör du istället när du lägger till eller tar bort en uppgift?

Man ska undvika att ändra en befintlig array direkt med exempelvis .push() eftersom React använder referenser för att upptäcka förändringar i state. Om man ändrar arrayen direkt behåller den samma referens, vilket kan göra att React inte upptäcker förändringen och inte renderar om komponenten som förväntat.

I stället skapar man en ny array när man lägger till eller tar bort en uppgift med hjälp av ... (spridningsoperator).

# Kodgranskning

## Förklara vad som är felaktigt med koden nedan i ett React-sammanhang och hur du skulle skriva om den för att den ska bli korrekt

```javascript
function addTodo(todos, text) {
  todos.push(text);
  return todos;
}
```

Den här koden muterar originalarrayen istället för att skapa en ny array, vilket bör undvikas när man jobbar med Reacts state (se fråga ovan). Den returnerar också samma array, vilket ställer till bekymmer vid referensjämförelser för att avgöra om state har ändrats, och i såfall rendera React inte om komponeneten ifråga.

```javascript
function addTodo(todos, text) {
  return [...todos, text];
}
```

Den här varianten av koden skapar istället en ny array, lägger till den nya uppgiften sist och behåller de ursprungliga uppgifterna.

# Problemlösning & Reflektion

## Hur gjorde du när du körde fast eller stötte på ett problem? Om du använde verktyg som AI, Google eller React-dokumentationen: ge ett konkret exempel på hur du tog hjälp för att förstå och lösa problemet själv

Jag körde framförallt fast på att trimma bort whitespace/förbjuda tom inmatning när det kom till javascript-koden, men svaret på det var en enkel sökmotorfråga (Startpage i mitt fall) bort. I css-koden så lyckades jag inte komma ihåg hur jag skulle få den att anpassa sig till små skärmar, men då bad jag Copilot om hjälp, och bad då också om att jag skulle få förklarande kommentarer liknande dem jag själv skrev, så att jag skulle förstå och inte bara få koden "serverad".
