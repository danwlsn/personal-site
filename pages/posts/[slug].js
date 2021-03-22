import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'

import Head from 'next/head'
import Layout from '../../components/layout'

function PostTemplate({ content, data }) {
  const fm = data

  console.log(moment(fm.date).format('MMMM Do YYYY'))

  return (
    <Layout>
      <Head>
        <title>{ fm.title } - Dan Wilson Blog</title>
      </Head>
      <div>
        <h2>{ moment(fm.date).format('MMMM Do YYYY') }</h2>
        <h1>{ fm.title }</h1>
        <ReactMarkdown source={ content } />
      </div>
    </Layout>
  )
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query

  const content = await import (`../../content/${slug}.md`)
  const data = matter(content.default)

  return { ...data }

  return { slug }
}

export default PostTemplate
