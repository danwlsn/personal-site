export default {
  name: 'now',
  title: 'Now',
  type: 'document',
  fields: [
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
  ]
}
