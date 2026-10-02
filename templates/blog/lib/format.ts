import { site } from '@/lib/site'

const formatter = new Intl.DateTimeFormat(site.locale, {
  dateStyle: 'long',
  timeZone: 'UTC'
})

export const formatDate = (iso: string) => formatter.format(new Date(iso))
