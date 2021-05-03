import moment from 'moment'

function PostItem({ title, date, slug }) {
  const momentDate = moment(date).format('MMMM Do YYYY')

  return (
    <li className="">
      <a href={`/posts/${slug}`} className="p-link">
        <span className="text-2xl font-semibold leading-8 block">{ title }</span>
        <span className="text-xs block">published: { momentDate }</span>
      </a>
    </li>
  )
}

export default function PostList({posts}) {
  const postListing = posts.map((post, index) => {
    return (
      <PostItem
        title={ post.title }
        date={ post.publishedAt }
        slug={ post.slug.current }
        key={ index } />
    )
  })

  return (
    <div className="pt-4 border-t-2">
      <h2 className="text-lg leading-8 font-light border-black-50">latest posts</h2>
      <ul>
        { postListing }
      </ul>
    </div>
  )
}

