import { Layout } from 'components/template/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin Template</title>
      </Head>
      <Layout title="Home" subtitle="Admin template">
        <h3>Content</h3>
      </Layout>
    </>
  )
}

export default Home
