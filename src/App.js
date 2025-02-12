import { useState, useEffect } from "react";

export default function TimerApp() {
  const [minutes, setMinutes] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && remainingMinutes > 0) {
      const timer = setInterval(() => {
        setRemainingMinutes((prev) => prev - 1);
      }, 60000);

      return () => clearInterval(timer);
    } else if (remainingMinutes === 0 && isRunning) {
      alert("O tempo acabou!");
      setIsRunning(false);
    }
  }, [isRunning, remainingMinutes]);

  const startTimer = () => {
    if (minutes > 0) {
      setRemainingMinutes(minutes);
      setIsRunning(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Contador de Minutos</h2>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
        disabled={isRunning}
        placeholder="Digite os minutos"
      />
      <button onClick={startTimer} disabled={isRunning || minutes <= 0}>
        Iniciar
      </button>
      <h3>Tempo restante: {remainingMinutes} minuto(s)</h3>
    </div>
  );
}
