import client from '../lib/sanity'
import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'
import About from '../components/about'
import Contact from '../components/contact'
import PostList from '../components/PostList/postList'

export default function Home({posts}) {
  return (
    <Layout>
      <Head>
        <title>Dan Wilson - builder of internet things</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 90 65%22><text y=%22.9em%22 font-size=%2290%22>🥬</text></svg>" />
      </Head>

      <About />
      <Header title="Dan Wilson" sub="crypto, climbing, skateboards, web3" showImage />
      <Contact />
      <PostList posts={posts} />
    </Layout>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {title, slug, publishedAt}'
  const data = await client.fetch(query)

  return {
    props: {
      'posts': data
    }
  }
}
