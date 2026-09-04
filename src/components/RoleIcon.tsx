import { Code2, Brain, TrendingUp, PieChart, Layers, Bug, Briefcase } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  'Associate Software Engineer': Code2,
  'Software Engineer': Code2,
  'AI/ML Engineer': Brain,
  'Product Manager': TrendingUp,
  'Data Analyst': PieChart,
  'MERN Stack Developer': Layers,
  'QA Engineer': Bug,
};

export function RoleIcon({ roleName, className }: { roleName: string; className?: string }) {
  const Icon = ICON_MAP[roleName] || Briefcase;
  return <Icon className={className} />;
}