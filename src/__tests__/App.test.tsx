import React from 'react'
import { shallow } from 'enzyme'
import App from 'App'
import User from 'components/User'

describe('App', () => {
    const $ = shallow(<App />)

    it('should render header', () => {
        const header = $.find('.App-header')
        expect(header).toHaveLength(1)
    })

    it('should render User component', () => {
        const user = $.find(User)
        expect(user).toHaveLength(1)
    })
})
