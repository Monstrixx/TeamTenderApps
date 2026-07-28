import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <ModulePlaceholder 
      title="Analytics Module" 
      description="Win rates, resource utilization, and executive dashboards."
      icon={PieChart}
      status="Coming from Analytics Module"
    />
  );
}
