import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((store) => store.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  if (!notification.text) return null;

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
