import { Input } from 'components/template/Input'
import { Layout } from 'components/template/Layout'
import { useAuth } from 'contexts/AuthContext'
import { useState } from 'react'

export default function Profile() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')

  return (
    <Layout title="Profile" subtitle="Manage your profile info">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Input
            name="name"
            type="text"
            label="Name"
            value={name}
            placeholder="Name"
            onChange={setName}
            required
          />

          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            placeholder="Email"
            onChange={setEmail}
            required
          />
        </div>

        <Input name="photo" type="file" label="Profile picture" />
      </div>
    </Layout>
  )
}
