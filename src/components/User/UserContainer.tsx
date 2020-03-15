import React, { useEffect } from 'react'
import User, { UserProps, UserSkeleton } from './User'
import Suspense from 'components/Suspense'
import api from 'utils/api'
import useFetch from 'utils/hooks/useFetch'

const UserContainer = (props: { name: string }) => {
    const [{ fetchStatus, data }, fetchUser] = useFetch<UserProps, string>(
        {
            name: '',
            description: '',
            avatar: '',
            repositories: []
        },
        api.getUser,
        props.name
    )

    useEffect(() => {
        fetchUser(props.name)
    }, [fetchUser, props.name])

    return (
        <Suspense
            fetchStatus={fetchStatus}
            LoadingComponent={<UserSkeleton />}
            fallback={<div className="User-not-found">User not found</div>}
        >
            <User {...data} />
        </Suspense>
    )
}

export default UserContainer
