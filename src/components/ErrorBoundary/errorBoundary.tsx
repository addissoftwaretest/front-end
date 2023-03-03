import {Typography} from '@mui/material';
import React from 'react';
import {Container} from './styles';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Typography variant="h5" color={'red'}>
            Something went wrong: {this.state.error?.message}
          </Typography>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
