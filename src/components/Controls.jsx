// Importiamo i moduli useEffect e useRef da React 
import { useEffect, useRef } from 'react';  // useEffect per gli effetti collaterali, useRef per riferimenti persistenti

function Controls({ 
   timeLeft,  // Il tempo rimanente in secondi
   setTimeLeft,  // Funzione per aggiornare il tempo rimanente
   isRunning,  // Stato che indica se il timer è in esecuzione
   setIsRunning,  // Funzione per aggiornare lo stato del timer
   isBreak,  // Stato che indica se il timer è in modalità pausa
   setIsBreak,  // Funzione per aggiornare lo stato della pausa
}) {

   const intervalRef = useRef(null);  // Crea un riferimento per l'intervallo del timer che persiste tra i re-rendering

   useEffect(() => {  // Esegue effetti collaterali quando le dipendenze cambiano
       if (isRunning && timeLeft > 0) {  // Se il timer è attivo e c'è tempo rimanente
           intervalRef.current = setInterval(() => {  // Crea un intervallo che decrementa il tempo
               setTimeLeft((prevTime) => prevTime - 1);  // Decrementa il tempo di 1 secondo
           }, 1000);  // Eseguito ogni 1000 ms (1 secondo)
       } else if (timeLeft === 0) {  // Se il tempo è scaduto
           clearInterval(intervalRef.current);  // Ferma il timer
           setIsBreak((prevIsBreak) => !prevIsBreak);  // Alterna tra modalità lavoro e pausa
           setTimeLeft(isBreak ? 25*60 : 5*60);  // Imposta il tempo per la prossima sessione: 25 min (lavoro) o 5 min (pausa)
       }

       return () => clearInterval(intervalRef.current);  // Pulizia: ferma l'intervallo quando il componente si smonta
   }, [isRunning, timeLeft, isBreak, setTimeLeft, setIsBreak]);  // Dipendenze dell'effect

   const handleReset = () => {  // Funzione per resettare il timer
       clearInterval(intervalRef.current);  // Ferma l'intervallo corrente
       setIsRunning(false);  // Ferma il timer
       setTimeLeft(isBreak ? 5*60 : 25*60);  // Ripristina il tempo in base alla modalità attuale
   }

   const handleSwitchToBreak = () => {  // Funzione per passare direttamente alla modalità pausa
       clearInterval(intervalRef.current);  // Ferma l'intervallo corrente
       setIsRunning(false);  // Ferma il timer
       setIsBreak(true);  // Imposta la modalità a pausa
       setTimeLeft(5*60);  // Imposta il tempo a 5 minuti (pausa)
   }

   const handleSwitchToPomodoro = () => {  // Funzione per passare direttamente alla modalità pomodoro
       clearInterval(intervalRef.current);  // Ferma l'intervallo corrente
       setIsRunning(false);  // Ferma il timer
       setIsBreak(false);  // Imposta la modalità a lavoro (pomodoro)
       setTimeLeft(25*60);  // Imposta il tempo a 25 minuti (pomodoro)
   }

   return (
       <div className="controls">
           <button onClick={() => setIsRunning(!isRunning)}>  {/* Pulsante per avviare/fermare il timer */}
               {isRunning ? 'Pausa' : 'Avvia'}  {/* Testo condizionale in base allo stato */}
           </button>
           <button onClick={handleReset}>  {/* Pulsante per resettare il timer */}
               Ricomincia
           </button>
           <button onClick={handleSwitchToBreak}>  {/* Pulsante per passare alla modalità pausa */}
               Fai pausa
           </button>
           <button onClick={handleSwitchToPomodoro}>  {/* Pulsante per passare alla modalità pomodoro */}
               Nuovo pomodoro
           </button>
       </div>
   );
}

export default Controls;  // Esporta il componente Controls