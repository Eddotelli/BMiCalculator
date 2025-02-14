// Hämta referenser till inmatningsfälten och knapparna
let length = document.getElementById('length-input');
let weight = document.getElementById('weight-input');
let submit = document.getElementById('submit-btn');
let result = document.getElementById('bmi-value');
let savedValuesList = document.getElementById('saved-values');
let toggleUnitsBtn = document.getElementById('toggle-units');
let u1 = document.getElementById('unit-1');
let u2 = document.getElementById('unit-2');

let isMetric = true; // Håll koll på vilket enhetssystem som används

// Lägg till en eventlyssnare på knappen för att växla mellan enhetssystem
toggleUnitsBtn.addEventListener('click', () => {
    isMetric = !isMetric;
    if (isMetric) {
        toggleUnitsBtn.textContent = 'Switch to Imperial';
        u1.textContent = 'cm';
        u2.textContent = 'kg';
    } else {
        toggleUnitsBtn.textContent = 'Switch to Metric';
        u1.textContent = 'inches';
        u2.textContent = 'lbs';
    }
});

// Lägg till en eventlyssnare på submit-knappen
submit.addEventListener('click', (event) => {
    // Förhindra standardbeteendet för formulärskickning
    event.preventDefault();

    try {
        // Kontrollera att båda fälten är ifyllda
        if (!length.value || !weight.value) {
            throw new Error('Both fields must be filled out');
        }

        let bmi;
        if (isMetric) {
            // Beräkna BMI för metriska enheter
            bmi = weight.value / (length.value / 100 * length.value / 100);
        } else {
            // Beräkna BMI för imperiala enheter
            bmi = (weight.value / (length.value * length.value)) * 703;
        }
        
        // Visa det beräknade BMI-värdet
        result.textContent = bmi.toFixed(2);

        // Hämta aktuellt datum och tid
        let now = new Date();
        let dateTime = now.toLocaleString(); // Formatera datum och tid som en sträng

        // Lägg till värdet i listan med tid och datum
        let value = `Length: ${length.value} ${isMetric ? 'cm' : 'inches'}, Weight: ${weight.value} ${isMetric ? 'kg' : 'lbs'} || BMI: ${bmi.toFixed(2)} || Date: ${dateTime}`;
        let li = document.createElement('li');
        li.textContent = value;

        // Skapa en knapp med en "x"-symbol för att ta bort listobjektet
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => {
            savedValuesList.removeChild(li);
        });

        // Lägg till knappen till listobjektet
        li.appendChild(removeBtn);

        // Lägg till listobjektet till listan
        savedValuesList.appendChild(li);
    } catch (error) {
        alert(error.message); // Visa ett felmeddelande om något fält är tomt
    }
});