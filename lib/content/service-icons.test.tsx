import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  StrategicConsultingIcon,
  SoftwareDevelopmentIcon,
  CloudDevOpsIcon,
  DataAnalyticsIcon,
} from './service-icons';

describe('Service Icons', () => {
  it('renders StrategicConsultingIcon without errors', () => {
    const { container } = render(<StrategicConsultingIcon />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('.w-6.h-6.text-primary')).toBeTruthy();
  });

  it('renders SoftwareDevelopmentIcon without errors', () => {
    const { container } = render(<SoftwareDevelopmentIcon />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('.w-6.h-6.text-primary')).toBeTruthy();
  });

  it('renders CloudDevOpsIcon without errors', () => {
    const { container } = render(<CloudDevOpsIcon />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('.w-6.h-6.text-primary')).toBeTruthy();
  });

  it('renders DataAnalyticsIcon without errors', () => {
    const { container } = render(<DataAnalyticsIcon />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('.w-6.h-6.text-primary')).toBeTruthy();
  });
});
