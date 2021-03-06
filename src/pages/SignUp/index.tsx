import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import { Container, Content, Background, AnimatedContainter } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'Mínimo 6 carácteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);
        addToast({
          type: 'sucess',
          title: 'Cadastro realizado com sucesso!',
        });
        history.push({ pathname: '/' });
      } catch (err) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <AnimatedContainter>
        <Content>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Faça seu cadastro</h2>
            <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
            <Input icon={FiMail} name="email" type="text" placeholder="Email" />
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </Content>
      </AnimatedContainter>
    </Container>
  );
};

export default Profile;
