import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';

import { ToastMessage } from '../../hooks/Toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const transitionMessages = useTransition(messages, message => message.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {transitionMessages.map(({ item: message, key, props }) => (
        <Toast key={key} style={props} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
