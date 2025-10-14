import process from 'node:process'
import { CoinbaseAdvTradeClient, CoinbaseAdvTradeCredentials, OrdersService } from 'coinbase-advanced-sdk/dist'
import { OrderSide } from 'coinbase-advanced-sdk/dist/model/enums/OrderSide'

const KEY_NAME = process.env.KEY_NAME
const PRIVATE_KEY = process.env.PRIVATE_KEY

if (!KEY_NAME || !PRIVATE_KEY) {
  throw new Error('Missing KEY_NAME or PRIVATE_KEY env variables.')
}

export async function makeOrder(): Promise<void> {
  const credentials = new CoinbaseAdvTradeCredentials(KEY_NAME, PRIVATE_KEY)
  const client = new CoinbaseAdvTradeClient(credentials)
  const orderService = new OrdersService(client)

  try {
    const result = await orderService.createOrder({
      clientOrderId: crypto.randomUUID(),
      productId: 'BTC-EUR',
      side: OrderSide.Buy,
      orderConfiguration: {
        marketMarketIoc: {
          quoteSize: '10',
        },
      },
    })

    console.log('[OK] Order placed:', JSON.stringify(result))
  }
  catch (err: any) {
    console.error('[ERR] Order failed:', err?.message || err)
  }
}
