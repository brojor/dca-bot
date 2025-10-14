import process from 'node:process'
import cron from 'node-cron'
import { makeOrder } from './job'
import '@dotenvx/dotenvx/config'

const CRON_EXPR = process.env.CRON_EXPR ?? '0 12 * * 2'
const TIMEZONE = process.env.TZ ?? 'Europe/Prague'

console.log(`[INIT] Scheduling job with CRON="${CRON_EXPR}" TZ="${TIMEZONE}"`)

if (!cron.validate(CRON_EXPR)) {
  throw new Error(`Invalid CRON expression: ${CRON_EXPR}`)
}

cron.schedule(CRON_EXPR, async () => {
  console.log('[JOB] Triggered at', new Date().toISOString())
  await makeOrder()
}, { timezone: TIMEZONE })

process.on('SIGTERM', () => {
  console.log('[SHUTDOWN] SIGTERM received, exiting...')
  process.exit(0)
})
process.on('SIGINT', () => {
  console.log('[SHUTDOWN] SIGINT received, exiting...')
  process.exit(0)
})
