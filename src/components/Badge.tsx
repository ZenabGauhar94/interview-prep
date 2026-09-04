type BadgeType = 'category' | 'difficulty' | 'status';

const CATEGORY_STYLES: Record<string, string> = {
  'Data Structures & Algorithms': 'text-badge-dsa bg-badge-dsa-bg',
  'System Design': 'text-badge-sysdesign bg-badge-sysdesign-bg',
  'Behavioral': 'text-badge-behavioral bg-badge-behavioral-bg',
  'ML Fundamentals': 'text-badge-ml bg-badge-ml-bg',
  'Product Sense': 'text-badge-ml bg-badge-ml-bg',
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'text-easy bg-easy-bg',
  Medium: 'text-medium bg-medium-bg',
  Hard: 'text-hard bg-hard-bg',
};

const STATUS_STYLES: Record<string, string> = {
  mastered: 'text-mastered bg-mastered-bg',
  needs_work: 'text-needswork bg-needswork-bg',
  not_started: 'text-notstarted bg-notstarted-bg',
};

const STATUS_LABELS: Record<string, string> = {
  mastered: 'Mastered',
  needs_work: 'Needs Work',
  not_started: 'Not Started',
};

export function Badge({ type, value }: { type: BadgeType; value: string }) {
  const styles =
    type === 'category' ? CATEGORY_STYLES[value] :
    type === 'difficulty' ? DIFFICULTY_STYLES[value] :
    STATUS_STYLES[value];

  const label = type === 'status' ? STATUS_LABELS[value] : value;

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles || 'text-neutral-700 bg-neutral-300/30'}`}>
      {label}
    </span>
  );
}