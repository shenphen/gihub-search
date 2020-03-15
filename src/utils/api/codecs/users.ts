/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'

const UsersCodec = t.type({
    login: t.string
})

type UsersResource = t.TypeOf<typeof UsersCodec>

function userResourceMapper(users: UsersResource[]) {
    return users.map(({ login }) => login)
}

export default {
    decoder: t.array(UsersCodec),
    map: mapOutput(t.array(UsersCodec), userResourceMapper).encode
}
