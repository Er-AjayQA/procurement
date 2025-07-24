export const ButtonLoader = ({ text }) => {
  return (
    <button
      className="w-full bg-primary px-4 py-3 flex justify-center items-center gap-2 text-white rounded-md cursor-wait transition-opacity"
      disabled
      aria-busy="true"
      aria-label="Loading"
    >
      <span className="font-medium">{text}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="loader_button_dot"
            style={{
              animationDelay: `${i * 0.1}s`,
              backgroundColor: `hsl(${i * 72}, 100%, 50%)`,
            }}
          />
        ))}
      </div>
    </button>
  );
};
