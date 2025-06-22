import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenContext";
import { ENDPOINT } from "../util/values";

const Notifications = ({ onClose }) => {
  const { token } = useContext(TokenContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotifications(res.data);
      });
  }, [token]);

  const markAllAsRead = () => {
    axios
      .put(
        `${ENDPOINT}/notifications/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
      });
  };

  return (
    <div className="notifications-dropdown">
      <div className="notifications-header">
        <strong>Notificaciones</strong>
        <button onClick={markAllAsRead}>Marcar todas como leídas</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
      <ul className="notifications-list">
        {notifications.map((n, i) => (
          <li key={i} style={{ fontWeight: n.seen ? "normal" : "bold" }}>
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
