import React from 'react';
import { Clock } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    { id: 1, text: 'Tender document updated: SPK-001-A', time: '10 mins ago' },
    { id: 2, text: 'New personnel added: Budi Santoso', time: '2 hours ago' },
    { id: 3, text: 'Equipment maintenance scheduled: EXC-002', time: '5 hours ago' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-0.5">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-400"></div>
            </div>
            <div>
              <p className="text-sm text-slate-700 font-medium">{activity.text}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                <Clock size={12} />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
