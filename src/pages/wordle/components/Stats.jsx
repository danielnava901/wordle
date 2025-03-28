import { useSelector } from "react-redux";

const Stats = () => {
  const { streak, total, completed } = useSelector((state) => state.wordle);

  return (
    <div className="text-white">
      <span>{total}</span>
      <span>{completed.length}</span>
      <span>{Math.floor(completed.length / total) * 100}%</span>
      <span>{streak}</span>
    </div>
  );
};

export default Stats;
