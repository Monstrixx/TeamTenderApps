import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { Users } from 'lucide-react';

export default function PersonnelPage() {
  return (
    <ModulePlaceholder 
      title="Personnel Module" 
      description="Manage the employee directory, certifications, and Role-Based Access Controls."
      icon={Users}
      status="Coming from Personnel Module"
    />
  );
}
