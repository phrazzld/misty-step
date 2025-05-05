import { BrainCog, Code2, CloudCog, LineChart } from 'lucide-react';
import React from 'react';

export const StrategicConsultingIcon = (): React.JSX.Element => (
  <BrainCog className="w-6 h-6 text-primary" />
);

export const SoftwareDevelopmentIcon = (): React.JSX.Element => (
  <Code2 className="w-6 h-6 text-primary" />
);

export const CloudDevOpsIcon = (): React.JSX.Element => (
  <CloudCog className="w-6 h-6 text-primary" />
);

export const DataAnalyticsIcon = (): React.JSX.Element => (
  <LineChart className="w-6 h-6 text-primary" />
);
