import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'
import About from '../components/about'
import Contact from '../components/contact'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Dan Wilson - builder of internet things</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 90 65%22><text y=%22.9em%22 font-size=%2290%22>🥬</text></svg>" />
      </Head>

      <About />
      <Header title="Dan Wilson" sub="web3, python, crypto" showImage />
      <Contact />
    </Layout>
  )
}
