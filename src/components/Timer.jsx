import React from 'react';  // Importa React

// Funzione che converte i secondi in formato "mm:ss" (es. "25:00")
function formattableTime(seconds) {
    const minutes = Math.floor(seconds / 60);  // Calcola i minuti dividendo per 60
    const remainingSeconds = seconds % 60;  // Calcola i secondi rimanenti
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;  // Formatta con zero iniziale
}

// Componente Timer che mostra il tempo formattato
function Timer({ timeLeft }) {  // Riceve il tempo rimanente come prop
    return (
        <div className="timer">
            <h2>{formattableTime(timeLeft)}</h2>  {/* Mostra il tempo formattato */}
        </div>
    );
}

export default Timer;  // Esporta il componente Timer
