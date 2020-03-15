import { useState, useEffect } from 'react'

function useFetch<S, A>(
    initialState: S,
    action: (argument: A) => Promise<S>,
    initialArgument: A
): [{ fetchStatus: FetchStatus; data: S }, React.Dispatch<React.SetStateAction<A>>] {
    const [data, setData] = useState<S>(initialState)
    const [actionArgument, setActionArgument] = useState<A>(initialArgument)
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>('initial')

    useEffect(() => {
        setFetchStatus('loading')
        action(actionArgument)
            .then(response => {
                setData(response)
                setFetchStatus('success')
            })
            .catch(() => {
                setFetchStatus('error')
            })
    }, [action, actionArgument])

    return [{ data, fetchStatus }, setActionArgument]
}

export default useFetch
