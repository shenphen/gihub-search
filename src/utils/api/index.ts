import axios from 'axios'
import { UserCodec, UserReposCodec } from './codecs'
import { decode } from 'io-ts-promise'

const headers = {
    Accept: 'application/vnd.github.v3+json'
}

export default {
    getUser: async (name: string) => {
        const urls = getUserUrls(name)
        const userResource = await axios.get(urls.user, { headers })
        const userDecoded = await decode(UserCodec, userResource.data)
        const { publicRepos, ...user } = UserCodec.encode(userDecoded)
        const fetchRepos =
            publicRepos > 0
                ? () => axios.get(urls.repos, { headers })
                : () => Promise.resolve({ data: { items: [] } })

        const repositoriesResource = await fetchRepos()
        const repositoriesDecoded = await decode(UserReposCodec, repositoriesResource.data.items)
        const repositories = UserReposCodec.encode(repositoriesDecoded)

        return { ...user, repositories }
    }
}

function getUserUrls(name: string) {
    return {
        user: `https://api.github.com/users/${name}`,
        repos: `https://api.github.com/search/repositories?q=user:${name}&s=stars&per_page=3`
    }
}
