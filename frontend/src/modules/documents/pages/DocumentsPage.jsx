import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { FolderOpen } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <ModulePlaceholder 
      title="Documents Module" 
      description="Centralized document storage and compliance tracking."
      icon={FolderOpen}
      status="Coming from Documents Module"
    />
  );
}
