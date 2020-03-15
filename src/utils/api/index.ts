import axios from 'axios'
import { UserCodec, UserReposCodec, UserSuggestionsCodec } from './codecs'
import { decode } from 'io-ts-promise'

const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json'
    }
})

export default {
    getUser: async (name: string) => {
        const userResource = await githubApi.get(`/users/${name}`)
        const userDecoded = await decode(UserCodec.decoder, userResource.data)
        const { publicRepos, ...user } = UserCodec.map(userDecoded)
        const fetchRepos =
            publicRepos > 0
                ? () => githubApi.get(`/search/repositories?q=user:${name}&s=stars&per_page=3`)
                : () => Promise.resolve({ data: { items: [] } })

        const { data: reposData } = await fetchRepos()
        const repositoriesDecoded = await decode(UserReposCodec.decoder, reposData.items)
        const repositories = UserReposCodec.map(repositoriesDecoded)

        return { ...user, repositories }
    },
    getUsernameSuggestions: async (name: string) => {
        if (!name) {
            return []
        }

        const usersResource = await githubApi.get(`https://api.github.com/search/users?q=${name}`)
        const usersDecoded = await decode(UserSuggestionsCodec.decoder, usersResource.data.items)
        const users = UserSuggestionsCodec.map(usersDecoded)

        return users
    }
}
