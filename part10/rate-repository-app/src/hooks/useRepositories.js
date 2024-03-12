import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_REPOSITORIES } from '../gql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)

    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
      nextFetchPolicy: "cache-and-network"
    })

    if (error) {
      console.log(error.message)
    }

    setLoading(false || loading)
    setRepositories(data)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return {repositories, loading, refetch: fetchRepositories}
}

export default useRepositories