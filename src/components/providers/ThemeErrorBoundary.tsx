
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ThemeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Theme error caught:', error, errorInfo);
    
    // Log the error to an error reporting service
    // logErrorToService(error, errorInfo);
    
    // Show error toast to user
    toast({
      title: 'Theme Error',
      description: 'There was an issue with the theme. Default styles applied.',
      variant: 'destructive',
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-4 border border-destructive rounded-md m-4 bg-destructive/10 text-destructive">
          <h2 className="text-lg font-semibold mb-2">Theme Error</h2>
          <p className="mb-4">The application encountered an error while applying the theme.</p>
          <p className="text-sm opacity-70 mb-4">{this.state.error?.message}</p>
          <button 
            onClick={this.resetError}
            className="px-4 py-2 bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Reset Theme
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ThemeErrorBoundary;
