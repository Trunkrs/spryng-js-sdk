# Spryng SDK Javascript

this SDK is written in TypeScript and resembles the official [Spryng PHP SDK](https://github.com/Spryng/rest-api-php).

## installation

*1. install via your favorite package manager*

`npm install spryng-sdk`

`yarn add spryng-sdk`

*2. import into your project*

```typescript
import Spryng from 'spryng-sdk'
const spryng = new Spryng('YOUR_API_KEY')
```

## Sending messages

To send a message create a new Message and run create on the message client

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')
const message = new Message()
message.body = 'My message'
message.recipients = ['31612344567', '31698765432']
message.originator = 'My Company'

const response = await spryng.message().create(message)
return message.id
```

## Getting info about a message

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.message().show('MESSAGE_UUID')
return `the body of the message is ${response.body}`
```

## List messages

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.message().list()
response.data.forEach(message => {
 console.log(message.body)
})
```

## Get your balance

```typescript
import Spryng, {Message} from 'spryng-sdk'

const spryng = new Spryng('YOUR_API_KEY')

const response = await spryng.balance().get()
return `your balance is ${response.amount}`
```
