import { useCallback, useEffect, useState } from "react";

type TimerProps = {
  onTimeUp: () => void;
};
export default function Timer({ onTimeUp }: TimerProps) 
{
  const [time, setTime] = useState(15);

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    if (time === 0) {
      handleTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, handleTimeUp]);

  return (
    <div className="text-lg font-bold text-red-500">
      Time Left: {time}s
    </div>
  );
}
