import { BrainCog, Code2, CloudCog, LineChart } from 'lucide-react';
import React from 'react';

export const StrategicConsultingIcon = (): React.ReactElement => (
  <BrainCog className="w-6 h-6 text-primary" />
);

export const SoftwareDevelopmentIcon = (): React.ReactElement => (
  <Code2 className="w-6 h-6 text-primary" />
);

export const CloudDevOpsIcon = (): React.ReactElement => (
  <CloudCog className="w-6 h-6 text-primary" />
);

export const DataAnalyticsIcon = (): React.ReactElement => (
  <LineChart className="w-6 h-6 text-primary" />
);
