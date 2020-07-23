import mock from './__mock__/mockEndpoints'
import Spryng from './index'
import Message from './models/Message'
import MessageCollection from './models/MessageCollection'
import Recipient from './models/Recipient'

describe('Spryng', () => {
  beforeEach(() => {
    mock.resetHistory()
  })
  afterAll(() => {
    mock.restore()
  })
  describe('messages', () => {
    describe('show()', () => {
      it('should fetch a specific message', async () => {
        expect.assertions(3)
        const spryng = new Spryng('abc')
        const message = await spryng.message.show(
          '8c6da478-8721-469d-8bbd-db4bbcdefa04',
        )
        expect(message instanceof Message).toBeTruthy()
        expect(message.id).toBe('8c6da478-8721-469d-8bbd-db4bbcdefa04')
        expect(mock.history.get[0].headers.Authorization).toBe('Bearer abc')
      })
      it('should throw an error if message is not found', async () => {
        expect.assertions(1)
        const spryng = new Spryng('abc')
        const fetchNonExistingMessage = () =>
          spryng.message.show('8481af9a-0110-4b3e-b3d1-3bf8b3eeb32f')
        await expect(fetchNonExistingMessage).rejects.toThrow()
      })
    })
    describe('list()', () => {
      it('should fetch a list of messages', async () => {
        expect.assertions(3)
        const spryng = new Spryng('abc')
        const messages = await spryng.message.list()
        expect(messages instanceof MessageCollection).toBeTruthy()
        expect(messages.total).toBe(1)
        expect(messages.data[0] instanceof Message).toBeTruthy()
      })
      it('should append filters as querystring parameters', async () => {
        expect.assertions(1)
        const spryng = new Spryng('abc')
        await spryng.message.list({
          status: 'sent',
          originator: 'Trunkrs',
        })
        expect(mock.history.get[0].params).toEqual({
          status: 'sent',
          originator: 'Trunkrs',
        })
      })
    })
    describe('create()', () => {
      it('should create a new message', async () => {
        expect.assertions(1)
        const spryng = new Spryng('abc')
        const message = new Message()
        message.body = 'this is my message to the world'
        message.recipients = [
          new Recipient('31612344567'),
          new Recipient('31698765432'),
        ]
        message.originator = 'Trunkrs'
        const response = await spryng.message.create(message)
        expect(response.id).toEqual('8c6da478-8721-469d-8bbd-db4bbcdefa04')
      })
    })
    describe('cancel()', () => {
      it('should cancel a message', async () => {
        expect.assertions(1)
        const spryng = new Spryng('abc')
        await spryng.message.cancel('8c6da478-8721-469d-8bbd-db4bbcdefa04')
        expect(mock.history.post.length).toBe(1)
      })
    })
  })
  describe('balance', () => {
    describe('get()', () => {
      it('should return the current balance', async () => {
        expect.assertions(1)
        const spryng = new Spryng('abc')
        const balance = await spryng.balance.get()
        expect(balance.amount).toEqual(10.5)
      })
    })
  })
})
