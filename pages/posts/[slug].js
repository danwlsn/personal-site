import React from 'react'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import Head from 'next/head'
import Layout from '../../components/layout'
import client from '../../lib/sanity'

function PostTemplate({ data }) {
  const momentDate = moment(data.publishedAt).format('MMMM Do YYYY')

  return (
    <Layout>
      <Head>
        <title>{ data.title } - Dan Wilson Blog</title>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="@danwlsn" />
        <meta name="twitter:creator" content="@danwlsn" />
        <meta property="og:url" content={`https://danwilson.co/posts/${data.slug.current}`} />
        <meta property="og:title" content={ data.title } />
        <meta property="og:description" content={ data.description } />
        <meta property="og:image" content={ data.imageUrl } />
      </Head>
      <div>
        <h2 className="text-xs">{ momentDate }</h2>
        <h1 className="text-5xl font-light mb-8">{ data.title }</h1>
        <img src={ data.imageUrl } className="mb-8 max-w-prose w-full" />
        <ReactMarkdown className="prose prose-lg pb-8 mb-8 border-b-2 border-green-100" source={ data.body } />
        <p>Want to continue the conversation? <a href="https://twitter.com/danwlsn" target="_blank" className="pu-link">Reply to me on twitter</a></p>
        <a href="/" className="pu-link">Go home</a>
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
  const query = `*[_type == "post" && slug.current == "${params.slug}"][0] {_type, title, publishedAt, body, slug, description, "imageUrl": mainImage.asset->url }`
  const data = await client.fetch(query)

  return {
    props: {
      data: data
    }
  }
}

export default PostTemplate
