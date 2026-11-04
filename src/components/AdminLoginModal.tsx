import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { X, Lock, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { setIsAdmin, setCurrentView } = useAgency();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'vanguard2026' || passcode.toLowerCase() === 'admin') {
      setIsAdmin(true);
      setCurrentView('admin');
      onClose();
      setError(false);
      setPasscode('');
    } else {
      setError(true);
    }
  };

  const handleInstantDemoUnlock = () => {
    setIsAdmin(true);
    setCurrentView('admin');
    onClose();
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-neutral-400" />
            <h3 className="text-base font-bold text-white">Studio Command Access</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-neutral-400 leading-relaxed">
            Enter the studio administrative passcode to manage inquiries, edit proposals, configure projects, and review client pipelines.
          </p>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Studio Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Passcode: vanguard2026"
                className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 pl-9 font-mono"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5">
                Incorrect passcode. (Hint: use <code className="bg-neutral-800 px-1 py-0.5 rounded">vanguard2026</code>)
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2 bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Authenticate & Enter
            </button>

            <button
              type="button"
              onClick={handleInstantDemoUnlock}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs rounded transition-colors cursor-pointer"
            >
              1-Click Demo Studio Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
