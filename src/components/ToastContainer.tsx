import React from 'react';
import { useCrm } from '../context/CrmContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCrm();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 shadow-2xl glass-panel-elevated animate-in slide-in-from-bottom-5 duration-200"
        >
          <span className="material-symbols-outlined text-xl text-primary shrink-0">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'warning' ? 'warning' : 'auto_awesome'}
          </span>
          <p className="text-xs text-on-surface leading-snug font-medium flex-1">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-outline hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};

