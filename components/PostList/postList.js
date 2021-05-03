import moment from 'moment'

function PostItem({ title, date }) {
  const momentDate = moment(date).format('MMMM Do YYYY')

  return (
    <li className="">
      <span className="text-lg leading-8 block">{ title }</span>
      <span className="text-xs block">published: { momentDate }</span>
    </li>
  )
}

export default function PostList({posts}) {
  const postListing = posts.map((post, index) => {
    return (
      <PostItem title={ post.title } date={ post.publishedAt } key={ index } />
    )
  })

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <ul>
        { postListing }
      </ul>
    </>
  )
}

