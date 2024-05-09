interface IButton {
  title: string;
  onClick: () => void;
}
const Button: React.FC<IButton> = ({ title, onClick }) => {
  return (
    <button
      className="bg-black text-white w-[150px] h-[40px] rounded-[6px] hover:scale-90 hover:bg-slate-800 transition-all"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
