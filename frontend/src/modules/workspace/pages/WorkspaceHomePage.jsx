import React from 'react';
import WorkspaceSummaryCard from '../components/dashboard/WorkspaceSummaryCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import ProjectSummary from '../components/dashboard/ProjectSummary';
import TenderSummary from '../components/dashboard/TenderSummary';
import NotificationWidget from '../components/dashboard/NotificationWidget';
import AIWidget from '../components/dashboard/AIWidget';

export default function WorkspaceHomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Row: Summary & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WorkspaceSummaryCard />
        </div>
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>

      {/* Middle Row: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TenderSummary />
        <ProjectSummary />
      </div>

      {/* Bottom Row: Activity, Notifications & AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <NotificationWidget />
        </div>
        <div className="lg:col-span-1">
          <AIWidget />
        </div>
      </div>
    </div>
  );
}
