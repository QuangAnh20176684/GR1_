import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

import { useHistory } from "react-router-dom";
import { REQUEST_STATE } from "../configs";
import { resetLogin } from "../redux/userRedux";
import { NotificationManager } from "react-notifications";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isRequestLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (isRequestLogin === REQUEST_STATE.SUCCESS) {
      NotificationManager.success(
        "Đăng nhập thành công",
        "Thành công"
      );
      history.push("/");

      dispatch(resetLogin());
    }
    if (isRequestLogin === REQUEST_STATE.FAILURE) {
      NotificationManager.error(
        "Tên tài khoán hoặc mật khẩu không chính xác",
        "Thất bại"
      );
      dispatch(resetLogin());
    }
  }, [isRequestLogin]);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Đăng nhập</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleClick}
            disabled={isRequestLogin === REQUEST_STATE.REQUEST}
          >
            {isRequestLogin === REQUEST_STATE.REQUEST
              ? "Đang đăng nhập"
              : "Đăng nhập"}
          </Button>
          <Link href="http://localhost:3000/register">Tạo 1 tài khoản mới</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
