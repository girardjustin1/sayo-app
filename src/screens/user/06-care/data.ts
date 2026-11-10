/**
 * SAMPLE DATA ONLY for Find Care. Every service, address and phone number is fictional.
 * Extends the shared SERVICES fixtures with detail-page fields.
 */
import { SERVICES } from '../../../data/fixtures'
import type { Service, ServiceCategory } from '../../../data/types'

export interface CareService extends Service {
  /** Landmark-style directions, as people give them in Accra. */
  landmark: string
  offers: string[]
  /** What the service says about privacy. Shown verbatim as the service's own statement. */
  confidentiality: string
  walkIn: boolean
  /** Phone/referral-only services have no directions button. */
  phoneOnly?: boolean
  verifiedOn: string
  /** Sample "open now" line. Real app: computed from hours. */
  openNow: string
  isOpen: boolean
}

const DETAIL: Record<string, Omit<CareService, keyof Service>> = {
  s1: {
    openNow: 'Open now · closes 6 pm',
    isOpen: true,
    landmark: 'Behind the Osu market lorry station, blue gate (sample)',
    offers: ['STI testing and treatment', 'HIV testing, PrEP and PEP', 'Contraception, including implants', 'Pregnancy testing', 'Counselling'],
    confidentiality: 'Youth-friendly and confidential. You do not need a parent, partner or referral.',
    walkIn: true,
    verifiedOn: 'October 2026',
  },
  s2: {
    openNow: 'Open 24 hours',
    isOpen: true,
    landmark: 'Ridge roundabout, next to the fire station (sample)',
    offers: ['Emergency department, 24 hours', 'HIV PEP', 'Emergency contraception', 'Sexual-assault care', 'General outpatient clinic'],
    confidentiality: 'Ask at the front desk for a private room. Staff are trained in sexual-assault care.',
    walkIn: true,
    verifiedOn: 'September 2026',
  },
  s3: {
    openNow: 'Closed now · opens 9 am Mon',
    isOpen: false,
    landmark: 'East Legon, off Lagos Avenue, 2nd floor (sample)',
    offers: ['One-to-one counselling', 'Support for low mood and anxiety', 'Alcohol and drug support', 'Sliding-scale fees'],
    confidentiality: 'Sessions are private. Your details are not shared without your consent.',
    walkIn: false,
    verifiedOn: 'October 2026',
  },
  s4: {
    openNow: 'Open 24 hours',
    isOpen: true,
    landmark: 'Phone line and referral service (sample)',
    offers: ['Someone to talk to, any time', 'Help finding urgent care after sexual assault', 'Safety planning', 'Referral to legal and shelter support'],
    confidentiality: 'You do not have to give your name. Calls are confidential.',
    walkIn: false,
    phoneOnly: true,
    verifiedOn: 'October 2026',
  },
  s5: {
    openNow: 'Open now · closes 4 pm',
    isOpen: true,
    landmark: 'Kaneshie, near the First Light junction (sample)',
    offers: ['Family planning', 'General clinic'],
    confidentiality: 'Not yet confirmed.',
    walkIn: true,
    verifiedOn: '—',
  },
}

const EXTRA: CareService[] = [
  {
    id: 's6', openNow: 'Open now · closes 5 pm', isOpen: true, name: 'Labone Women’s Health Point', type: 'Sexual & reproductive health clinic', categories: ['sexual_health', 'hiv'],
    area: 'Labone (sample)', distanceKm: 3.2, hours: 'Mon–Fri, 9 am–5 pm', phone: '+233 20 000 0606', verified: true, youthFriendly: true,
    landmark: 'Labone, opposite the junction pharmacy (sample)',
    offers: ['STI testing and treatment', 'Contraception', 'Cervical screening'],
    confidentiality: 'Confidential. Women-only waiting area.',
    walkIn: true, verifiedOn: 'August 2026',
  },
  {
    id: 's7', openNow: 'Closed now · opens Tue 5 pm', isOpen: false, name: 'New Dawn Recovery Group', type: 'Substance-use support', categories: ['substance'],
    area: 'Adabraka (sample)', distanceKm: 5.0, hours: 'Tue & Thu, 5 pm–7 pm', phone: '+233 24 000 0707', verified: true,
    landmark: 'Adabraka, community hall behind the clinic (sample)',
    offers: ['Peer support group', 'One-to-one support', 'Family sessions'],
    confidentiality: 'First names only in group. Nothing is shared outside.',
    walkIn: true, verifiedOn: 'September 2026',
  },
]

/** Verified Find Care services, nearest first. Unverified services are not listed. */
export const CARE_SERVICES: CareService[] = [
  ...SERVICES.map((s) => ({ ...s, ...DETAIL[s.id] })),
  ...EXTRA,
]
  .filter((s) => s.verified)
  .sort((a, b) => a.distanceKm - b.distanceKm)

export const careService = (id: string) => CARE_SERVICES.find((s) => s.id === id)!

/** Chip labels for the category filter (short versions of SERVICE_CATEGORY_LABEL). */
export const CATEGORY_CHIPS: { id: ServiceCategory; label: string }[] = [
  { id: 'sexual_health', label: 'Sexual health' },
  { id: 'hiv', label: 'HIV / PrEP / PEP' },
  { id: 'general', label: 'Clinic / hospital' },
  { id: 'mental_health', label: 'Mental health' },
  { id: 'substance', label: 'Substance use' },
  { id: 'gbv', label: 'GBV support' },
]

/** Services matching a category. `urgent` puts places open now (24 h) first. */
export function servicesFor(category: ServiceCategory, urgent = false): CareService[] {
  const list = CARE_SERVICES.filter((s) => s.categories.includes(category))
  if (!urgent) return list
  return [...list].sort((a, b) => Number(b.hours.includes('24')) - Number(a.hours.includes('24')))
}

export const AREAS = ['Osu', 'Labone', 'Ridge', 'Adabraka', 'East Legon', 'Kaneshie', 'Madina', 'Tema']
