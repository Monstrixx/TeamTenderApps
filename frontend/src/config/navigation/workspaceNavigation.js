import {
  Home, Building2, Users, Wrench, Truck, 
  FileSignature, FolderOpen, PieChart, Brain, Settings
} from 'lucide-react';
import { WORKSPACE_ROUTES } from '../routes/workspaceRoutes';

export const WORKSPACE_NAVIGATION = [
  {
    id: 'home',
    title: 'Home',
    icon: Home,
    route: WORKSPACE_ROUTES.HOME,
    permission: 'workspace:view',
    featureFlag: 'feat_workspace_home'
  },
  {
    id: 'company',
    title: 'Company',
    icon: Building2,
    route: WORKSPACE_ROUTES.COMPANY,
    permission: 'company:view',
    featureFlag: 'feat_company_module'
  },
  {
    id: 'personnel',
    title: 'Personnel',
    icon: Users,
    route: WORKSPACE_ROUTES.PERSONNEL,
    permission: 'personnel:view',
    featureFlag: 'feat_personnel_module'
  },
  {
    id: 'equipment',
    title: 'Equipment',
    icon: Wrench,
    route: WORKSPACE_ROUTES.EQUIPMENT,
    permission: 'equipment:view',
    featureFlag: 'feat_equipment_module'
  },
  {
    id: 'supplier',
    title: 'Supplier',
    icon: Truck,
    route: WORKSPACE_ROUTES.SUPPLIER,
    permission: 'supplier:view',
    featureFlag: 'feat_supplier_module'
  },
  {
    id: 'tender',
    title: 'Tender',
    icon: FileSignature,
    route: WORKSPACE_ROUTES.TENDER,
    permission: 'tender:view',
    featureFlag: 'feat_tender_module'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FolderOpen,
    route: WORKSPACE_ROUTES.DOCUMENTS,
    permission: 'documents:view',
    featureFlag: 'feat_documents_module'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: PieChart,
    route: WORKSPACE_ROUTES.ANALYTICS,
    permission: 'analytics:view',
    featureFlag: 'feat_analytics_module'
  },
  {
    id: 'ai_center',
    title: 'AI Center',
    icon: Brain,
    route: WORKSPACE_ROUTES.AI_CENTER,
    permission: 'ai:view',
    featureFlag: 'feat_ai_module'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    route: WORKSPACE_ROUTES.SETTINGS,
    permission: 'workspace:manage',
    featureFlag: 'feat_settings_module'
  }
];
