import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // @ts-ignore
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        // @ts-ignore
        if (this.state.error?.message) {
          // @ts-ignore
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error) {
            errorMessage = `Firestore Error: ${parsed.error} (${parsed.operationType} at ${parsed.path})`;
          }
        }
      } catch (e) {
        // @ts-ignore
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="rounded-2xl bg-red-50 p-8 shadow-sm border border-red-100 max-w-md">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Oops!</h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-red-600 px-6 py-2 text-white font-semibold hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
