# Spryng SDK Javascript

this SDK is written in TypeScript and resembles the official [Spryng PHP SDK](https://github.com/Spryng/rest-api-php).

## Installation

*1. install via your favorite package manager*

`npm install @trunkrs/spryng-sdk --save`

`yarn add @trunkrs/spryng-sdk`

*2. add a http client*

this project has no hard outside dependencies. However it will need a Http client. The easiest way is just to install Axios:

`yarn add axios`

Axios will work with the SDK out of the box. If you would rather write your own implementation, use the interface described in [http/HttpClientInterface.ts](https://github.com/Trunkrs/spryng-js-sdk/blob/master/src/http/HttpClientInterface.ts).

*3. import into your project*

```typescript
import Spryng from '@trunkrs/spryng-sdk'
const spryng = new Spryng('YOUR_API_KEY')
```

If you are using a custom Http client (not axios) please provide this as the second parameter on initializing Spryng:

```typescript
import Spryng from '@trunkrs/spryng-sdk'
const spryng = new Spryng('YOUR_API_KEY', httpClient)
```

## Sending messages

To send a message create a new Message and run create on the message client

```typescript
import Spryng, {Message, Recipient} from '@trunkrs/spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')
const message = new Message()
message.body = 'My message'
message.recipients = [
    new Recipient('31612344567'),
    new Recipient('31698765432')
]
message.originator = 'My Company'

const response = await spryng.message.create(message)
return message.id
```

## Getting info about a message

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.message.show('MESSAGE_UUID')
return `the body of the message is ${response.body}`
```

## List messages

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.message.list()
response.data.forEach(message => {
 console.log(message.body)
})
```

## Get your balance

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.balance.get()
return `your balance is ${response.amount}`
```
