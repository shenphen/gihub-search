import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Suspense, { SuspenseProps } from '../Suspense'

const mock = {
    Loading: {
        selector: { 'data-test': 'loading' },
        Component: <div data-test="loading" />
    },
    Children: {
        selector: { 'data-test': 'success' },
        Component: <div data-test="success" />
    },
    Error: {
        selector: { 'data-test': 'error' },
        Component: <div data-test="error" />
    }
}

interface PropsVariations {
    fallback?: JSX.Element
    children?: JSX.Element
}

const defaultPropsVariations: PropsVariations[] = [
    { fallback: mock.Error.Component, children: mock.Children.Component },
    { fallback: mock.Error.Component },
    { children: mock.Children.Component },
    {}
]

const getShallowRenders = (
    fetchStatus: FetchStatus,
    propsVariations: PropsVariations[] = defaultPropsVariations
): ShallowWrapper<React.FC<SuspenseProps>>[] => {
    return propsVariations.map(({ fallback, children }) =>
        shallow(
            <Suspense
                fetchStatus={fetchStatus}
                LoadingComponent={mock.Loading.Component}
                fallback={fallback}
            >
                {children}
            </Suspense>
        )
    )
}

describe('Suspense given initial fetchStatus', () => {
    it('should render empty element', () => {
        const renders = getShallowRenders('initial')

        renders.forEach(render => {
            expect(render).toBeEmptyRender()
        })
    })
})

describe('Suspense given loading fetchStatus', () => {
    it('should render loading element', () => {
        const renders = getShallowRenders('loading')

        renders.forEach(render => {
            expect(render.find(mock.Loading.selector)).toHaveLength(1)
            expect(render.find(mock.Children.selector)).toHaveLength(0)
            expect(render.find(mock.Error.selector)).toHaveLength(0)
        })
    })
})

describe('User given error fetchStatus', () => {
    it('should render fallback element if provided', () => {
        const propsVariationsWithFallback = defaultPropsVariations.filter(
            variation => !!variation.fallback
        )
        const renders = getShallowRenders('error', propsVariationsWithFallback)

        renders.forEach(render => {
            expect(render.find(mock.Loading.selector)).toHaveLength(0)
            expect(render.find(mock.Children.selector)).toHaveLength(0)
            expect(render.find(mock.Error.selector)).toHaveLength(1)
        })
    })
    it('should render empty element if fallback is not provided', () => {
        const propsVariationsWithoutFallback = defaultPropsVariations.filter(
            variation => !variation.fallback
        )
        const renders = getShallowRenders('error', propsVariationsWithoutFallback)

        renders.forEach(render => {
            expect(render).toBeEmptyRender()
        })
    })
})
