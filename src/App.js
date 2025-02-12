import { useState, useEffect } from "react";
import './App.css'

export default function TimerApp() {
  const [minutes, setMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      const timer = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingSeconds === 0 && isRunning) {
      alert("O tempo acabou!");
      setIsRunning(false);
    }
  }, [isRunning, remainingSeconds]);

  const startTimer = () => {
    if (minutes > 0) {
      setRemainingSeconds(minutes * 60);
      setIsRunning(true);
    }
  };

  const displayMinutes = Math.floor(remainingSeconds / 60);
  const displaySeconds = remainingSeconds % 60;

  return (
    <div className="container">
      <h2 className="h2">Contador de Minutos</h2>
      <input className="input"
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
        disabled={isRunning}
        placeholder="Digite os minutos"
      />
      <button className="button" onClick={startTimer} disabled={isRunning || minutes <= 0}>
        Iniciar
      </button>
      <h3 className="h3">Tempo restante: {displayMinutes} min, {displaySeconds} seg</h3>
    </div>
  );
}
