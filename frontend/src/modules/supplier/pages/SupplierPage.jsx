import React from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { Truck } from 'lucide-react';

export default function SupplierPage() {
  return (
    <ModulePlaceholder 
      title="Supplier Module" 
      description="Vendor hub and subcontractor management."
      icon={Truck}
      status="Coming from Supplier Module"
    />
  );
}
