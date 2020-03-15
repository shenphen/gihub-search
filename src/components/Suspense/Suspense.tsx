import React, { Fragment } from 'react'

export interface SuspenseProps {
    fetchStatus: FetchStatus
    LoadingComponent: React.ReactElement
    fallback?: React.ReactNode
}

const Suspense: React.FC<SuspenseProps> = ({
    fetchStatus,
    LoadingComponent,
    fallback,
    children
}) => {
    switch (fetchStatus) {
        case 'initial':
            return null
        case 'loading':
            return <Fragment>{LoadingComponent}</Fragment>
        case 'error':
            return fallback ? <Fragment>{fallback}</Fragment> : null
        case 'success':
            return <Fragment>{children}</Fragment>
        default:
            throw new UnreachableCaseError(fetchStatus)
    }
}

export default Suspense
