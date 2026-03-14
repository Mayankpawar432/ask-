import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  sessionId: string;
  message: any;
  ip: string;
}

export function AdminModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/logs');
      const data = await res.json();
      setLogs(data.reverse()); // Newest first
    } catch (e) {
      console.error("Failed to fetch logs", e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-rose-500/30 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl shadow-rose-900/20">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-rose-400 font-premium tracking-widest">ARCHIVE OVERSEER (ADMIN)</h2>
          <div className="flex items-center gap-4">
            <button onClick={fetchLogs} className="text-xs text-slate-400 hover:text-white">Refresh</button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-slate-500 text-center py-10">Decrypting archives...</p>
          ) : logs.length === 0 ? (
            <p className="text-slate-500 text-center py-10">No logs found.</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-lg border border-white/5 text-sm">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <span className="font-mono">{log.sessionId.slice(0, 8)}... | IP: {log.ip}</span>
                </div>
                <div className="text-slate-300">
                  <span className={log.message.sender === 'user' ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold'}>
                    {log.message.sender.toUpperCase()}:
                  </span>{' '}
                  {log.message.text.length > 200 ? log.message.text.slice(0, 200) + '...' : log.message.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
