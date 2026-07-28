import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { Wrench } from 'lucide-react';

export default function EquipmentPage() {
  return (
    <ModulePlaceholder 
      title="Equipment Module" 
      description="Asset registry, maintenance logs, and project assignments."
      icon={Wrench}
      status="Coming from Equipment Module"
    />
  );
}
