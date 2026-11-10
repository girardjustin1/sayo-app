const IDS: Record<string, string> = {
  synthesis: 'research-00-synthesis--docs',
  'onboarding-privacy': 'research-01-onboarding-privacy--docs',
  'ai-intake': 'research-02-ai-intake--docs',
  'async-review': 'research-03-async-review--docs',
  'find-care': 'research-04-find-care--docs',
  'circle-community': 'research-05-circle--docs',
  'safety-gbv': 'research-06-safety-gbv--docs',
  'pro-admin': 'research-07-professional-admin--docs',
}
/** Rewrite links between the research markdown files to their Storybook pages. */
export const fixLinks = (md: string) => md.replace(/\]\(([a-z-]+)\.md\)/g, (_, f: string) => `](./?path=/docs/${IDS[f] ?? IDS.synthesis})`)
