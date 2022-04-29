import type { User } from './users'

interface Worker {
  ipAddress: string
  port: number
  providerLocation: Object
  currency: string
  paymentRecurrency: string
  ipInsight: any
  bigCloud: any
  status: string
  price: number
  username: string
  password: string
  lastSeenAt: string
  longitude: string
  latitude: string
}

export type { Worker }
