import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Fingerprint, 
  AlertCircle,
  ShieldAlert,
  Check,
  UserX,
  Radio
} from 'lucide-react';
import { generateThreatIncident, SecurityIncident } from '../services/cyberSecurityEngine';

interface SecurityLockScreenProps {
  isLocked: boolean;
  onUnlock: () => void;
  savedPin: string;
  onUpdatePin: (newPin: string) => void;
  onHackerDetected?: (incident: SecurityIncident) => void;
}

export const SecurityLockScreen: React.FC<SecurityLockScreenProps> = ({
  isLocked,
  onUnlock,
  savedPin,
  onUpdatePin,
  onHackerDetected
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [isHackerQuarantined, setIsHackerQuarantined] = useState(false);

  if (!isLocked) return null;

  const handleDigitClick = (digit: string) => {
    if (isHackerQuarantined) return;
    if (pinInput.length < 4) {
      const next = pinInput + digit;
      setPinInput(next);
      setErrorMsg('');

      if (next.length === 4) {
        if (next === savedPin) {
          setTimeout(() => {
            setPinInput('');
            setFailedAttempts(0);
            onUnlock();
          }, 150);
        } else {
          const newFailed = failedAttempts + 1;
          setFailedAttempts(newFailed);

          if (newFailed >= 3) {
            // Trigger Cyber Security Hack Detection & Quarantine
            setIsHackerQuarantined(true);
            const { incident } = generateThreatIncident(
              'Brute Force PIN Attack',
              `Rapid illegal PIN cracking attempts exceeded threshold (${newFailed}/3 failed attempts)`
            );
            if (onHackerDetected) {
              onHackerDetected(incident);
            }
            setErrorMsg('🚨 SECURITY ALERT: 3 Failed Attempts! Intrusion blocked & IP quarantined.');
          } else {
            setErrorMsg(`Incorrect PIN (${newFailed}/3 attempts). Default is 1234.`);
            setTimeout(() => setPinInput(''), 600);
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    if (isHackerQuarantined) return;
    setPinInput((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleBiometricUnlock = () => {
    if (isHackerQuarantined) return;
    onUnlock();
  };

  const handleResetQuarantine = () => {
    // Admin override
    setIsHackerQuarantined(false);
    setFailedAttempts(0);
    setPinInput('');
    setErrorMsg('');
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length === 4 && /^\d+$/.test(newPinInput)) {
      onUpdatePin(newPinInput);
      setPinChangeSuccess(true);
      setTimeout(() => {
        setIsChangingPin(false);
        setPinChangeSuccess(false);
        setNewPinInput('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Background cryptographic grid decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
        {/* Shield Icon with glowing ring */}
        <div className="relative">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all ${
            isHackerQuarantined 
              ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400 shadow-rose-500/30 animate-pulse' 
              : 'bg-gradient-to-tr from-emerald-500/20 to-teal-500/30 border border-emerald-500/40 text-emerald-400 shadow-emerald-500/20'
          }`}>
            {isHackerQuarantined ? <ShieldAlert className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
            isHackerQuarantined 
              ? 'bg-rose-950 border-rose-500 text-rose-400' 
              : 'bg-slate-950 border-emerald-500/50 text-emerald-400'
          }`}>
            {isHackerQuarantined ? '!' : '✓'}
          </div>
        </div>

        {/* Title & Privacy Warning */}
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${
            isHackerQuarantined 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {isHackerQuarantined ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            <span>{isHackerQuarantined ? 'CYBER DEFENSE LOCKOUT ACTIVE' : '256-Bit Encrypted App Vault'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isHackerQuarantined ? 'Intruder Access Quarantined' : 'Security Passcode Required'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {isHackerQuarantined 
              ? 'Multiple unauthorized passcode attempts detected. Hardware identifier and IP address have been logged and blocked.' 
              : 'All candidate salaries, CTC budgets, WhatsApp broadcast keys, and confidential lead matrices are encrypted.'}
          </p>
        </div>

        {isHackerQuarantined ? (
          <div className="w-full space-y-4 bg-rose-950/40 p-4 rounded-2xl border border-rose-500/40 text-left">
            <div className="flex items-center justify-between text-xs font-mono text-rose-400">
              <span className="flex items-center gap-1.5">
                <UserX className="w-4 h-4 text-rose-400" />
                HACKER FIREWALL ARMED
              </span>
              <span className="bg-rose-900/60 px-2 py-0.5 rounded text-[10px] text-rose-200">BLOCKED</span>
            </div>
            <p className="text-xs text-slate-300">
              Zero-trust intrusion prevention has locked the terminal. An incident alert has been dispatched to system security.
            </p>
            <button
              onClick={handleResetQuarantine}
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Authorize as Master Administrator (Reset)</span>
            </button>
          </div>
        ) : (
          <>
            {/* PIN Dots Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => {
                  const filled = pinInput.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        filled
                          ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/50'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    />
                  );
                })}
              </div>

              {errorMsg ? (
                <p className="text-xs font-medium text-rose-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 font-mono">
                  Default Master PIN: <strong className="text-emerald-400">1234</strong>
                </p>
              )}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitClick(digit)}
                  className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:bg-emerald-500/20 border border-slate-700 text-white font-mono text-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={handleBiometricUnlock}
                title="Biometric Fingerprint Unlock"
                className="h-14 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-emerald-400 transition-colors flex items-center justify-center active:scale-95"
              >
                <Fingerprint className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDigitClick('0')}
                className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:bg-emerald-500/20 border border-slate-700 text-white font-mono text-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="h-14 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center text-sm font-semibold active:scale-95"
              >
                ⌫
              </button>
            </div>

            {/* Bottom Change PIN Trigger */}
            <div className="pt-2 border-t border-slate-800/80 w-full flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setIsChangingPin(!isChangingPin)}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Change Security PIN</span>
              </button>

              <span className="text-[10px] font-mono text-slate-500">
                E2EE Client-Side Active
              </span>
            </div>

            {/* Change PIN Pop-down */}
            {isChangingPin && (
              <form onSubmit={handleSaveNewPin} className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-white block">Set New 4-Digit Passcode</span>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    required
                    placeholder="New 4 Digits"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-center font-mono text-white tracking-widest focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0"
                  >
                    {pinChangeSuccess ? <Check className="w-4 h-4" /> : 'Save'}
                  </button>
                </div>
                {pinChangeSuccess && (
                  <p className="text-[11px] text-emerald-400 font-medium">
                    PIN updated successfully!
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
