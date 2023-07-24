import styled from "styled-components";
import { mobile } from "../responsive";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/apiCalls";
import { resetRegister } from "../redux/userRedux";
import { useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { REQUEST_STATE } from "../configs";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  margin: 20px 10px 0px 0px;
  padding: 10px;
  width: calc(100% - 30px);
`;

const InputWrapper = styled.div`
 width: 50%;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
    font-size: 13px;
    color: red;
    margin-top: 4px;
`;

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const registerUserState = useSelector(state => state.user);

  function onRegister(data) {
    registerUser(dispatch, data)
  }


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (registerUserState.isRegister === REQUEST_STATE.FAILURE) {
      NotificationManager.error('Một lỗi đã xảy ra khi đăng ký tài khoản', 'Thất bại');
      dispatch(resetRegister());
    }
    if (registerUserState.isRegister === REQUEST_STATE.SUCCESS) {
      NotificationManager.success('Bạn đã đăng ký tài khoản thành công', 'Thành công');
      setTimeout(() => {
        history.push('/login');
      }, 500)
      dispatch(resetRegister());
    }
  }, [registerUserState.isRegister])

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit((data) => onRegister(data))}>
          <InputWrapper >
            <Input placeholder="name" {...register('name')} />
          </InputWrapper>
          <InputWrapper >
            <Input placeholder="last name" {...register('lastName')} />
          </InputWrapper>
          <InputWrapper style={{
            width: '40%'
          }}>
            <Input placeholder="username" {...register('username', { required: true })} />
            {errors.username && <ErrorMessage>Username is required</ErrorMessage>}
          </InputWrapper>
          <InputWrapper style={{
            width: '60%'
          }}>
            <Input placeholder="email" {...register('email', { required: true })} />
            {errors.email && <ErrorMessage>Email is required</ErrorMessage>}
          </InputWrapper>
          <InputWrapper >
            <Input placeholder="password" {...register('password', { required: true })} />
            {errors.password && <ErrorMessage>Password is required</ErrorMessage>}
          </InputWrapper>
          <InputWrapper >
            <Input placeholder="confirm password" {...register('confirmPassword', {
              required: true, validate: (val) => {
                if (watch('password') !== val) {
                  return "Your passwords do no match";
                }
              },
            })} />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
          </InputWrapper>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}>
            <Button type="submit">{registerUserState?.isRegister === REQUEST_STATE.REQUEST ? 'Đợi chút...' : 'Đăng ký'}</Button>
          </div>
        </Form>
      </Wrapper>
      <NotificationContainer />
    </Container>
  );
};

export default Register;
