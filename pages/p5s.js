import Head from 'next/head'
import Layout from '../components/layout'
import Flowfield from '../components/sketch/flowfield'

export default function Art({posts}) {
  return (
    <Layout>
      <Head>
        <title>Dan Wilson - art</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 90 65%22><text y=%22.9em%22 font-size=%2290%22>🥬</text></svg>" />
      </Head>

      <span className="text-2xl font-extrabold mb-4 block" >p5js renders</span>
      <Flowfield />
    </Layout>
  )
}
