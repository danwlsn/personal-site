import React from 'react'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import Head from 'next/head'
import Layout from '../../components/layout'
import client from '../../lib/sanity'

function PostTemplate({ data }) {

  return (
    <Layout>
      <Head>
        <title>{ data.title } - Dan Wilson Blog</title>
      </Head>
      <div>
        <h2>{data.publishedAt }</h2>
        <h1>{ data.title }</h1>
        <ReactMarkdown source={ data.body } />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const query = '*[_type == "post" && !(_id in path("drafts.**"))] {slug}'
  const data = await client.fetch(query)

  const paths = data.map((post) => ({
    params: { slug: post.slug.current }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "post" && slug.current == "${params.slug}"][0] {_type, title, publishedAt, body}`
  const data = await client.fetch(query)

  return {
    props: {
      data: data
    }
  }
}

export default PostTemplate
