/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'
import { withFallback } from 'io-ts-types/lib/withFallback'

const UserReposResourceCodec = t.type({
    id: t.number,
    name: t.string,
    html_url: t.string,
    description: withFallback(t.string, ''),
    fork: t.boolean,
    stargazers_count: t.number,
    language: withFallback(t.string, '')
})

type UserReposResource = t.TypeOf<typeof UserReposResourceCodec>

function userReposResourceMapper(repositories: UserReposResource[]) {
    return repositories.map(
        ({ id, name, html_url, description, fork, stargazers_count, language }) => ({
            id,
            name,
            description,
            url: html_url,
            fork,
            stars: stargazers_count,
            language
        })
    )
}

const UserReposCodec = mapOutput(t.array(UserReposResourceCodec), userReposResourceMapper)

export default UserReposCodec
