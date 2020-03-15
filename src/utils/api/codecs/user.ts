/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'

const UserResourceCodec = t.type({
    id: t.number,
    name: t.string,
    bio: t.string,
    avatar_url: t.string,
    public_repos: t.number
})

type UserResource = t.TypeOf<typeof UserResourceCodec>

function userResourceMapper({ id, name, bio, avatar_url, public_repos }: UserResource) {
    return {
        id,
        name,
        description: bio,
        avatar: avatar_url,
        publicRepos: public_repos
    }
}

const UserCodec = mapOutput(UserResourceCodec, userResourceMapper)

export default UserCodec
