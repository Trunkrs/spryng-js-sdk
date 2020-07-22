import mock from './utils/mockEndpoints'
import Spryng from './index'
import Message from './Models/Message'
import MessageCollection from './Models/MessageCollection'

describe('Spryng', () => {
  beforeEach(() => {
    mock.resetHistory()
  })
  afterAll(() => {
    mock.restore()
  })
  describe('messages', () => {
    it('should fetch a specific message', async () => {
      expect.assertions(3)
      const spryng = new Spryng('abc')
      const message = await spryng
        .message()
        .show('8c6da478-8721-469d-8bbd-db4bbcdefa04')
      expect(message instanceof Message).toBeTruthy()
      expect(message.id).toBe('8c6da478-8721-469d-8bbd-db4bbcdefa04')
      expect(mock.history.get[0].headers.Authorization).toBe('abc')
    })
    it('should fetch a list of messages', async () => {
      expect.assertions(3)
      const spryng = new Spryng('abc')
      const messages = await spryng.message().list()
      expect(messages instanceof MessageCollection).toBeTruthy()
      expect(messages.total).toBe(1)
      expect(messages.data[0] instanceof Message).toBeTruthy()
    })
    it('should create a new message', async () => {
      expect.assertions(1)
      const spryng = new Spryng('abc')
      const message = new Message()
      message.body = 'this is my message to the world'
      message.recipients = ['31612344567', '31698765432']
      message.originator = 'Trunkrs'
      const response = await spryng.message().create(message)
      expect(response.id).toEqual('8c6da478-8721-469d-8bbd-db4bbcdefa04')
    })
    it('should cancel a message', async () => {
      expect.assertions(1)
      const spryng = new Spryng('abc')
      await spryng.message().cancel('8c6da478-8721-469d-8bbd-db4bbcdefa04')
      expect(mock.history.post.length).toBe(1)
    })
    it('should throw an error if message is not found', async () => {
      expect.assertions(1)
      const spryng = new Spryng('abc')
      const fetchNonExistingMessage = () =>
        spryng.message().show('8481af9a-0110-4b3e-b3d1-3bf8b3eeb32f')
      await expect(fetchNonExistingMessage).rejects.toThrow()
    })
  })
  describe('balance', () => {
    it('should return the current balance', async () => {
      expect.assertions(1)
      const spryng = new Spryng('abc')
      const balance = await spryng.balance().get()
      expect(balance.amount).toEqual(10.5)
    })
  })
})
