import { useParams } from 'react-router'
import PagePlaceholder from '../../../shared/components/PagePlaceholder.jsx'

const Home = () => {
  const { username } = useParams()

  return (
    <PagePlaceholder
      title={`@${username}`}
      description="This public page will display the user's active links."
    />
  )
}

export default Home
