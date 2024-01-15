import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
 
// Describe the network.
const handlers = [
  http.get('https://acme.com/product/:id', ({ params }) => {
    return HttpResponse.json({
        command: 'SELECT',
        fields: [
          {
            columnID: 3,
            dataTypeID: 23,
            dataTypeModifier: -1,
            dataTypeSize: 4,
            format: 'text',
            name: 'amount',
            tableID: 24605
          },
          {
            columnID: 2,
            dataTypeID: 1043,
            dataTypeModifier: 259,
            dataTypeSize: -1,
            format: 'text',
            name: 'name',
            tableID: 24597
          },
          {
            columnID: 4,
            dataTypeID: 1043,
            dataTypeModifier: 259,
            dataTypeSize: -1,
            format: 'text',
            name: 'image_url',
            tableID: 24597
          },
          {
            columnID: 3,
            dataTypeID: 1043,
            dataTypeModifier: 259,
            dataTypeSize: -1,
            format: 'text',
            name: 'email',
            tableID: 24597
          },
          {
            columnID: 1,
            dataTypeID: 2950,
            dataTypeModifier: -1,
            dataTypeSize: 16,
            format: 'text',
            name: 'id',
            tableID: 24605
          }
        ],
        rowAsArray: false,
        rowCount: 5,
        rows: [
          {
            amount: 700000,
            name: 'Sheansuke',
            image_url: '/customers/delba-de-oliveira.png',
            email: 'delba@oliveira.com',
            id: '601b946e-0523-484f-a8ae-a7ec226b8ae7'
          },
          {
            amount: 8945,
            name: 'Eucliwood',
            image_url: '/customers/delba-de-oliveira.png',
            email: 'delba@oliveira.com',
            id: '605ccd4a-97c7-4aca-a97d-e8938ddf9ef4'
          },
          {
            amount: 44800,
            name: 'Steven Tey',
            image_url: '/customers/steven-tey.png',
            email: 'steven@tey.com',
            id: 'dbbede3a-dc37-48ad-8edf-c5d259a35f19'
          },
          {
            amount: 500,
            name: 'Lee Robinson',
            image_url: '/customers/lee-robinson.png',
            email: 'lee@robinson.com',
            id: '7dba7311-5d2a-4399-b47e-3b62803d45c6'
          },
          {
            amount: 34577,
            name: 'Michael Novotny',
            image_url: '/customers/michael-novotny.png',
            email: 'michael@novotny.com',
            id: '308de172-c87b-4735-8e56-1e06f48d9c52'
          }
        ],
        viaNeonFetch: true
      })
  }),
]
 
// Enable API mocking anywhere.
const worker = setupWorker(...handlers)
worker.start()