import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((store) => store.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  if (!notification.text) return null;

  return (
    <Alert variant={notification.type} className="my-4">
      {notification.text}
    </Alert>
  );
};

export default Notification;
