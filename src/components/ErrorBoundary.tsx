import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-6 text-slate-800 font-['Prompt',sans-serif]">
          <div className="max-w-md w-full bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-900">เกิดข้อผิดพลาดในการแสดงผล</h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                ระบบตรวจพบข้อผิดพลาดชั่วคราว ข้อมูลของคุณยังปลอดภัยอยู่ในระบบ สามารถกดปุ่มรีโหลดเพื่อเปิดใหม่อีกครั้ง
              </p>
              {this.state.error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200/70 rounded-xl text-[11px] font-mono text-red-700 text-left overflow-x-auto max-h-32">
                  {this.state.error.message || 'Unknown render error'}
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>รีโหลดหน้าเว็บ</span>
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>กลับหน้าหลัก</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
