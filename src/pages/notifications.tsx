import { Layout } from 'components/template/Layout'
import { useApp } from 'contexts/AppContext'

export default function Notifications() {
  const { name } = useApp()

  return (
    <Layout title="Notifications" subtitle="Manage your notifications">
      <h3>{name}</h3>
    </Layout>
  )
}
