import process from 'node:process'
import { AccountsService, CoinbaseAdvTradeClient, CoinbaseAdvTradeCredentials } from 'coinbase-advanced-sdk/dist'
import '@dotenvx/dotenvx/config'

const KEY_NAME = process.env.KEY_NAME
const PRIVATE_KEY = process.env.PRIVATE_KEY

const credentials = new CoinbaseAdvTradeCredentials(
  KEY_NAME,
  PRIVATE_KEY,
)

const client = new CoinbaseAdvTradeClient(credentials)

const accountService = new AccountsService(client)

accountService
  .listAccounts({})
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error.message)
  })
