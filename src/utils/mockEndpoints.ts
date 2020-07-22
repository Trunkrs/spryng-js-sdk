// eslint-disable-next-line import/no-extraneous-dependencies
import Axios from 'axios'
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(Axios)

mock.onGet('/messages').reply(200, {
  total: 1,
  per_page: 15,
  current_page: 1,
  last_page: 1,
  next_page_url: '',
  prev_page_url: '',
  from: 1,
  to: 1,
  data: [
    {
      id: '8cfc0ddb-75ba-46d4-9c5c-7bd0208be402',
      encoding: 'auto',
      originator: 'DocsTest',
      body: 'This is a test message.',
      reference: '',
      credits: 1.2,
      scheduled_at: '2019-02-14T11:58:41+01:00',
      created_at: '2019-02-14T11:58:41+01:00',
      updated_at: '2019-02-14T11:58:45+01:00',
      links: {
        self:
          'https://rest.spryngsms.com/v1/messages/8cfc0ddb-75ba-46d4-9c5c-7bd0208be402',
      },
      recipients: [
        {
          number: '31612345678',
          status: 'delivered',
          sent_at: '2019-02-14T11:59:30+01:00',
        },
      ],
    },
  ],
})

mock.onGet('/messages/8c6da478-8721-469d-8bbd-db4bbcdefa04').reply(200, {
  id: '8c6da478-8721-469d-8bbd-db4bbcdefa04',
  status: 'scheduled',
  encoding: 'auto',
  originator: 'DocsTest',
  body: 'This is a test message.',
  reference: '',
  credits: 1.2,
  scheduled_at: '2019-01-01T15:00:00+00:00',
  created_at: '2018-12-05T15:56:26+00:00',
  updated_at: '2018-12-05T15:56:26+00:00',
})

mock.onGet('/messages/8481af9a-0110-4b3e-b3d1-3bf8b3eeb32f').reply(404, {
  status: 404,
  message: 'Message not found',
})

mock.onPost('/messages').reply(200, {
  id: '8c6da478-8721-469d-8bbd-db4bbcdefa04',
  status: 'scheduled',
  encoding: 'auto',
  originator: 'DocsTest',
  body: 'This is a test message.',
  reference: '',
  credits: 1.2,
  scheduled_at: '2019-01-01T15:00:00+00:00',
  created_at: '2018-12-05T15:56:26+00:00',
  updated_at: '2018-12-05T15:56:26+00:00',
})

mock.onPost('/messages/8c6da478-8721-469d-8bbd-db4bbcdefa04/cancel').reply(200)

mock.onGet('/balance').reply(200, {
  amount: 10.5,
})

export default mock
