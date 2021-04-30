function PostItem({ title }) {
  return (
    <li>
      { title }
    </li>
  )
}

export default function PostList({posts}) {

  const postListing = posts.map((post, index) => {
    return (
      <PostItem title={ post.title } key={ index } />
    )
  })

  return (
    <ul>
      { postListing }
    </ul>
  )
}

