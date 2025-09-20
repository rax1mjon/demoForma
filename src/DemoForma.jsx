import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  theme,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { logo } from "./assets";
import { GithubFilled, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { requies } from "./server";
const { Text, Title } = Typography;

const DemoForma = () => {
  const { token } = theme.useToken();

  const [form] = Form.useForm();

  const [questions, setQuestions] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [uuid, setUuid] = useState(null);
  const [username, SetUsername] = useState(null);
  const [roleId, SetRoleId] = useState(null);

  const getAllForms = async () => {
    try {
      let { data } = await requies("/school/forms/", {
        params: {
          school_id: username,
          role_id: roleId,
        },
      });
      setUuid();

      const demoQuestion = data.find((el) => el.uuid == uuid).questions;
      setQuestions(demoQuestion);
    } catch (error) {
      messageApi.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Xatolik yuz berdi ! +998 94 196-14-08 murojat qiling"
      );
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setUuid(params.get("uuid"));
    SetUsername(params.get("username"));
    SetRoleId(params.get("roleId"));
  }, []);

  useEffect(() => {
    if (uuid) {
      getAllForms();
    }
  }, [uuid]);

  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        padding: "50px 20px 27px",
      }}
    >
      {contextHolder}
      <div>
        <Card style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
          {/* {file ? (
                  <div
                    style={{
                      width: 157,
                      height: 157,
                      display: "flex",
                      justifyContent: "center",
                      margin: "0 auto",
                      border: 8,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={file}
                      alt="preview"
                      style={{ width: "100%", height: "100%", border: 8 }}
                    />
                  </div>
>>>>>>> 9da262718fd1a921cde1afb127e7f2419e23fdb9
                ) : (
                  <Title
                    level={2}
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      gap: 24,
                      margin: "0 auto 24px",
                    }}
                  >
                    <img src={logo} alt="site logotive ?" />
                  </Title>
                )} */}
          <Form form={form} id="myForm" onFinish={onFinish} layout="vertical">
            <Title
              level={2}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: 24,
                margin: "0 auto 24px",
              }}
            >
              <img src={logo} alt="site logotive ?" />
            </Title>

            <Text
              style={{
                display: "block",
                textAlign: "center",
                margin: "24px 0",
              }}
            >
              Ushbu ma’lumotlarni batafsil to’ldiring. Operatorlarimiz siz bilan
              bog’lanadi
            </Text>

            {/* Ism kiritish */}
            <Form.Item
              name="name"
              label="Ismingizni kiriting..."
              rules={[
                {
                  required: true,
                  message: "Iltimos, ismingizni kiriting!",
                },
              ]}
            >
              <Input
                placeholder="Ismingiz"
                prefix={<UserOutlined style={{ color: token.colorPrimary }} />}
              />
            </Form.Item>

            {/* Telefon raqami */}
            <Form.Item
              name="phone"
              label="Telefon raqamingizni kiriting..."
              rules={[
                {
                  required: true,
                  message: "Iltimos, telefon raqamingizni kiriting!",
                },
              ]}
            >
              <Input
                placeholder="Telefon raqam"
                prefix={<PhoneOutlined style={{ color: token.colorPrimary }} />}
              />
            </Form.Item>

            {questions.map((question, qIndex) => (
              <Form.Item
                key={qIndex}
                name={`question_${qIndex}_`}
                label={<Text strong>{question.text}</Text>}
                rules={[
                  {
                    required: true,
                    message: "Iltimos, malumotingizni kiriting!",
                  },
                ]}
              >
                {question.question_type === "text" && (
                  <Input placeholder="Javob yozing..." />
                )}

                {question.question_type === "radio" && (
                  <Radio.Group>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {question.options.map((option, oIndex) => (
                        <Radio value={option.text} key={oIndex}>
                          {option.text}
                        </Radio>
                      ))}
                    </div>
                  </Radio.Group>
                )}

                {question.question_type === "checkbox" && (
                  <Checkbox.Group>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {question.options.map((option, oIndex) => (
                        <Checkbox value={option.text} key={oIndex}>
                          {option.text}
                        </Checkbox>
                      ))}
                    </div>
                  </Checkbox.Group>
                )}
              </Form.Item>
            ))}

            <Button
              type="primary"
              size="large"
              style={{ width: "100%", marginTop: 16 }}
              onClick={() => form.submit()}
            >
              Ro'yxatdan o'tish
            </Button>
          </Form>
        </Card>
      </div>
      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontWeight: 400,
            color: "#000000D9",
            fontSize: "14px",
            lineHeight: "22px",
            display: "flex",
            gap: "6px",
            justifyContent: "space-between",
            maxWidth: 270,
            width: "100%",
          }}
        >
          <span>COUT Company</span>
          <GithubFilled />
          <span>Aqlli maktab</span>
        </div>
        <p
          style={{
            fontWeight: 400,
            color: "#000000D9",
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          Copyright ©2025 Maxsulot COUT MCHJ tomonidan ishlab chiqarilgan
        </p>
      </footer>
    </div>
  );
};

export default DemoForma;
