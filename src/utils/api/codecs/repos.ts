/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'
import { withFallback } from 'io-ts-types/lib/withFallback'

const UserReposCodec = t.type({
    id: t.number,
    name: t.string,
    html_url: t.string,
    description: withFallback(t.string, ''),
    stargazers_count: t.number,
    language: withFallback(t.string, '')
})

type UserReposResource = t.TypeOf<typeof UserReposCodec>

function userReposMapper(repositories: UserReposResource[]) {
    return repositories.map(({ id, name, html_url, description, stargazers_count, language }) => ({
        id,
        name,
        description,
        url: html_url,
        stars: stargazers_count,
        language
    }))
}

export default {
    decoder: t.array(UserReposCodec),
    map: mapOutput(t.array(UserReposCodec), userReposMapper).encode
}
