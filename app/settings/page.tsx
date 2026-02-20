'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800">⚙️ Settings</h1>

      {/* Supabase Settings */}
      <Card>
        <h2 className="font-semibold text-slate-700 mb-4">Supabase Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Project URL</label>
            <input
              type="text"
              value="https://smfcnhvoixumthluacwq.supabase.co"
              disabled
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Anon Key</label>
            <input
              type="password"
              value="••••••••••••••••••••••••••••••••"
              disabled
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500"
            />
          </div>
        </div>
      </Card>

      {/* Dashboard Settings */}
      <Card>
        <h2 className="font-semibold text-slate-700 mb-4">Dashboard Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Monthly Token Budget</label>
            <input
              type="number"
              defaultValue={200}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Activity Feed Limit</label>
            <input
              type="number"
              defaultValue={100}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </Card>

      {/* Agent Configuration */}
      <Card>
        <h2 className="font-semibold text-slate-700 mb-4">Agent Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-slate-700">Auto-update status</p>
              <p className="text-xs text-slate-500">Agents update their status automatically</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-slate-700">Realtime updates</p>
              <p className="text-xs text-slate-500">Enable real-time data sync</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
