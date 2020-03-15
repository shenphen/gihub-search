/// <reference types="react-scripts" />

type FetchStatus = 'initial' | 'loading' | 'success' | 'error'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`)
    }
}
