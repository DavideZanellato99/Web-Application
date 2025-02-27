import { jsPDF } from "jspdf";

// Funzione per salvare i risultati del quiz in un file PDF
export const saveResultsToPDF = (age, sex, code, state, getSexName) => {
    const doc = new jsPDF(); // Crea un nuovo documento PDF
    
    // Imposta dimensioni e margini
    const pageHeight = doc.internal.pageSize.height; // Altezza della pagina
    const pageWidth = doc.internal.pageSize.width; // Larghezza della pagina
    const margin = 10; // Margine 
    const maxWidth = pageWidth - margin * 2; // Larghezza massima per il testo
    let y = 12; // Posizione verticale iniziale

    // Aggiunge l'immagine (sinistra)
    const imageWidth = 40; // Larghezza dell'immagine
    const imageHeight = 40; // Altezza dell'immagine
    doc.addImage("/images/Logo MISTRA.jpg", "PNG", margin, y, imageWidth, imageHeight);

    // Imposta il titolo del PDF
    doc.setFontSize(16); // Imposta la dimensione del font
    doc.setFont("helvetica", "bold"); // Imposta il font a Helvetica e grassetto
    const title = "Risultati del Quiz";
    const titleX = (pageWidth - doc.getTextWidth(title)) / 2; // Centra il titolo orizzontalmente
    doc.text(title, titleX, y); // Aggiunge il titolo al documento
    y += 10; // Sposta la posizione verticale per il prossimo contenuto
    
    // Imposta il font per il contenuto del PDF
    doc.setFontSize(12); // Imposta la dimensione del font per il testo normale
    doc.setFont("helvetica", "normal"); // Imposta il font a Helvetica e normale
    
    // Funzione per centrare il testo
    const centerText = (text) => {
        const textX = (pageWidth - doc.getTextWidth(text)) / 2; // Calcola la posizione centrata orizzontalmente
        doc.text(text, textX, y); // Aggiunge il testo centrato al documento
        y += 10; // Sposta la posizione verticale per il prossimo testo
    };

    // Aggiungi i dati dell'utente
    centerText(`Età: ${age}`);
    const namesex = getSexName(sex);
    centerText(`Sesso: ${namesex}`);
    centerText(`Codice del Test: ${code}`);
    centerText(`Punteggio: ${state.score} / ${state.questions.length}`);
    y += 7; // Aggiunge uno spazio tra il punteggio e le domande
    
    // Loop per iterare su tutte le domande del quiz
    state.questions.forEach((question, index) => {
        const questionText = `Domanda ${index + 1}:`; // Testo per la domanda
        const questionContent = question.text; // Contenuto della domanda
        const answerLabel = `Risposta data:`; // Etichetta per la risposta
        const answerContent = state.answers[index]?.answer || "Nessuna risposta"; // Risposta data dall'utente
        const correctionLabel = `Correzione:`; // Etichetta per la correzione
        const correctionContent = state.answers[index]?.correction; // Correzione se presente
        
        doc.setFont("helvetica", "bold"); // Imposta il font grassetto per la domanda
        doc.text(questionText, margin, y); // Aggiunge la domanda
        y += 6; // Aggiunge spazio dopo la domanda
        
        doc.setFont("helvetica", "normal"); // Imposta il font normale per il contenuto della domanda
        const questionLines = doc.splitTextToSize(questionContent, maxWidth); // Suddivide la domanda in più righe se è troppo lunga
        questionLines.forEach((line) => {
            // Aggiunge una nuova pagina se il contenuto non entra nella pagina corrente
            if (y + 10 > pageHeight - margin) {
                doc.addPage();
                y = margin; // Ripristina la posizione verticale all'inizio della pagina
            }
            doc.text(line, margin, y); // Aggiunge la riga della domanda al documento
            y += 7; // Sposta verso il basso per la riga successiva
        });
        
        doc.setFont("helvetica", "bold"); // Imposta il font grassetto per l'etichetta della risposta
        doc.text(answerLabel, margin, y); // Aggiunge l'etichetta "Risposta data"
        y += 6; // Sposta verso il basso per la risposta
        
        doc.setFont("helvetica", "normal"); // Imposta il font normale per la risposta
        const answerLines = doc.splitTextToSize(answerContent, maxWidth); // Suddivide la risposta in più righe se necessario
        answerLines.forEach((line) => {
            if (y + 10 > pageHeight - margin) { // Aggiunge una nuova pagina se necessario
                doc.addPage();
                y = margin; // Ripristina la posizione verticale all'inizio della pagina
            }
            doc.text(line, margin, y); // Aggiunge la risposta al documento
            y += 7; // Sposta verso il basso per la riga successiva
        });
        
        // Se è presente la correzione, aggiungila al PDF
        if (correctionContent) {
            doc.setFont("helvetica", "bold"); // Imposta il font grassetto per l'etichetta della correzione
            doc.text(correctionLabel, margin, y); // Aggiunge l'etichetta "Correzione"
            y += 6; // Sposta verso il basso per la correzione
            
            doc.setFont("helvetica", "normal"); // Imposta il font normale per la correzione
            const correctionLines = doc.splitTextToSize(correctionContent, maxWidth); // Suddivide la correzione in più righe se necessario
            correctionLines.forEach((line) => {
                if (y + 10 > pageHeight - margin) { // Aggiunge una nuova pagina se necessario
                    doc.addPage();
                    y = margin; // Ripristina la posizione verticale all'inizio della pagina
                }
                doc.text(line, margin, y); // Aggiunge la correzione al documento
                y += 7; // Sposta verso il basso per la riga successiva
            });
        }

        // Aggiungi una linea di separazione tra le domande, se non è l'ultima domanda
        if (index < state.questions.length - 1) {
            if (y + 5 > pageHeight - margin) { // Aggiunge una nuova pagina se necessario
                doc.addPage();
                y = margin; // Ripristina la posizione verticale all'inizio della pagina
            }
            doc.setDrawColor(0); // Imposta il colore della linea (nero)
            doc.setLineWidth(0.5); // Imposta lo spessore della linea
            doc.line(margin, y, pageWidth - margin, y); // Disegna la linea orizzontale
            y += 10; // Spazio dopo la linea
        }
    });
    
    // Salva il documento PDF con il nome "risultati_quiz.pdf"
    doc.save("risultati_quiz.pdf");
};