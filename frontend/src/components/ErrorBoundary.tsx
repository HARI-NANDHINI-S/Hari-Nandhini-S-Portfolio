import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 my-4 mx-auto max-w-xl rounded-2xl glass-panel border border-red-500/30 bg-cyber-card/90 text-cyber-text text-center font-mono">
          <p className="text-sm font-semibold text-red-400 mb-2">Something went wrong in this section.</p>
          <p className="text-xs text-cyber-muted mb-4">{this.state.error?.message || 'Unexpected application error.'}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-xl bg-cyber-blue text-white text-xs font-semibold hover:bg-cyber-blue/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
