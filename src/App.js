import { useState } from 'react';  // Importa il hook useState da React per gestire lo stato
import Timer from './components/Timer';  // Importa il componente Timer
import Controls from './components/Controls';  // Importa il componente Controls
import './App.css';  // Importa il file CSS per lo stile

function App() {
  // Stato per il tempo rimanente inizializzato a 25 minuti in secondi (25*60=1500 secondi)
  const [timeLeft, setTimeLeft] = useState(0.1*60);
  // Stato per tracciare se il timer è attivo (false = fermo)
  const [isRunning, setIsRunning] = useState(false);
  // Stato per tracciare se siamo in modalità pausa (false = modalità lavoro)
  const [isBreak, setIsBreak] = useState(false);


  return (
    <div className="App">  {/* Contenitore principale dell'app */}
      <h1>Pomodoro Timer</h1>
      <Timer timeLeft={timeLeft}/>  {/* Componente che mostra il tempo formattato */}
      <Controls  // Componente che gestisce i controlli del timer
        timeLeft={timeLeft}  // Passa il tempo rimanente
        setTimeLeft={setTimeLeft}  // Passa la funzione per modificare il tempo
        isRunning={isRunning}  // Passa lo stato di attività del timer
        setIsRunning={setIsRunning}  // Passa la funzione per modificare lo stato di attività
        isBreak={isBreak}  // Passa lo stato della modalità (lavoro/pausa)
        setIsBreak={setIsBreak}  // Passa la funzione per cambiare la modalità
      />
    </div>
  );
}

export default App;  // Esporta il componente App