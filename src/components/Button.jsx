export const Button = ({ children, onClick, type = "primary", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  
  const typeStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
    >
      {children}
    </button>
  );
};