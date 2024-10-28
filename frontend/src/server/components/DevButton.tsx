import { AllHTMLAttributes, useState } from "react";

type DevButtonProps = {
  onToggle: () => void;
  className: AllHTMLAttributes<HTMLButtonElement>["className"];
};

export function DevButton({ onToggle, className }: DevButtonProps) {
  const [showDevTools, setShowDevTools] = useState(false);

  const handleClick = () => {
    setShowDevTools(prev => !prev);
    onToggle();
  };

  const show = showDevTools ? (
    "Hide DevTools"
  ) : (
    <p className="text-white">Show DevTools</p>
  );

  const styles = `fixed bottom-20 right-4 p-2 ${showDevTools ? "bg-[#cfe2a2]" : "bg-blue-500"} rounded-lg ${className}`;

  return (
    <button onClick={handleClick} className={styles}>
      <div className="flex items-center gap-2">
        <img src="/tanstack.webp" className="w-6 rounded-full" alt="" />
        {show}
      </div>
    </button>
  );
}
