import "./SingleDate.css";

const SingleDate = ({ data, selectedDate, setSelectedDate }) => {
  const { date, month, day, dateObject } = data;
  return (
    <button
      className={`SingleDateContainer  ${
        selectedDate && data.id === selectedDate.id && "active"
      }`}
      onClick={() => setSelectedDate(data)}
    >
      <h4 className="m-0">
        {month} {date}
      </h4>
      <span>
        {data.isToday ? "Today" : data.isTomorrow ? "Tomorrow" : day}{" "}
      </span>
    </button>
  );
};

export default SingleDate;
