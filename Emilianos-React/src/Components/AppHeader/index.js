import { BellFilled, MailOutlined, UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography, Avatar } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  return (
    <div className="AppHeader">
      {/* Título del sistema */}
      <Typography.Title level={5} style={{ color: "white", margin: 0 }}>
        Emiliano's/Admin
      </Typography.Title>

      {/* Nombre del usuario y los íconos */}
      <Space size="large">
        {/* Nombre del usuario */}
        <Space>
          <Typography.Text style={{ color: "white" }}>
            Micael Coimbra Serrudo
          </Typography.Text>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: "white", color: "#cf611c" }} />
        </Space>

        {/* Íconos de notificaciones y mensajes */}
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24, color: "white" }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24, color: "white" }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>

        {/* Botón de logout */}
        <PoweroffOutlined
          style={{ fontSize: 24, color: "white", cursor: "pointer" }}
          onClick={() => {
            console.log("Logout");
          }}
        />
      </Space>

      {/* Drawer para comentarios */}
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>

      {/* Drawer para notificaciones */}
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}

export default AppHeader;
