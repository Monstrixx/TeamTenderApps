import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ModulePlaceholder 
      title="Workspace Settings" 
      description="Manage workspace preferences, billing, and global settings."
      icon={Settings}
      status="Coming from Settings Module"
    />
  );
}
