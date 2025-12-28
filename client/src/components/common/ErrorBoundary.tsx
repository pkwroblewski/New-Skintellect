import React, { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#FDF2F2] flex items-center justify-center">
              <AlertTriangle className="text-[#A67C7C]" size={32} />
            </div>
            <h2 className="text-3xl font-serif text-slate-900 mb-4 italic">
              Something went wrong
            </h2>
            <p className="text-slate-500 mb-8 font-serif">
              We encountered an unexpected error. Please try again.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
