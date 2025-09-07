export interface CharacterHealthStatus {
  label: string;
  value: string;
}

export const HEALTH_STATES: Record<string, CharacterHealthStatus> = {
  HEALTHY: {
    label: 'Healthy',
    value: 'healthy',
  },
  INJURED: {
    label: 'Injured',
    value: 'injured',
  },
  BLOODIED: {
    label: 'Bloodied',
    value: 'bloodied',
  },
  DEFEATED: {
    label: 'Defeated',
    value: 'defeated',
  },
};
