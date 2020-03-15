import React from 'react'
import { shallow } from 'enzyme'
import User from '../User'
import mock from '../__mocks__/user.mock'

describe('User', () => {
    it('should render', () => {
        const render = shallow(<User {...mock} />)
        expect(render).not.toBeEmptyRender()
    })

    it('should render name', () => {
        const propsVariations = [mock, { ...mock, name: 'user2' }]

        propsVariations.forEach(props => {
            const render = shallow(<User {...props} />)
            const userName = render.find('[data-test="User-name"]')
            expect(userName).toHaveLength(1)
            expect(userName.text()).toEqual(props.name)
        })
    })

    it('should render description', () => {
        const propsVariations = [mock, { ...mock, description: 'description2' }]

        propsVariations.forEach(props => {
            const render = shallow(<User {...props} />)
            const userDescription = render.find('[data-test="User-description"]')
            expect(userDescription).toHaveLength(1)
            expect(userDescription.text()).toEqual(props.description)
        })
    })

    it('should render avatar', () => {
        const propsVariations = [mock, { ...mock, avatar: 'avatarUrl2' }]

        propsVariations.forEach(props => {
            const render = shallow(<User {...props} />)
            const userAvatar = render.find('img[data-test="User-avatar"]')
            expect(userAvatar).toHaveLength(1)
            expect(userAvatar.type()).toEqual('img')
            expect(userAvatar.prop('src')).toEqual(props.avatar)
        })
    })

    it('should render information if there are no repositories', () => {
        const props = { ...mock, repositories: [] }
        const render = shallow(<User {...props} />)
        const noRepositoriesInformation = render.find('[data-test="User-no-repositories"]')
        const repositoriesList = render.find('ul[data-test="User-repositories-list"]')
        expect(noRepositoriesInformation).toHaveLength(1)
        expect(repositoriesList).toHaveLength(0)
    })

    it('should render repositories', () => {
        const propsVariations = [
            mock,
            { ...mock, repositories: mock.repositories.slice(0, 1) },
            { ...mock, repositories: mock.repositories.slice(0, 2) }
        ]

        propsVariations.forEach(props => {
            const render = shallow(<User {...props} />)
            const noRepositoriesInformation = render.find('[data-test="User-no-repositories"]')
            const repositoriesList = render.find('ul[data-test="User-repositories-list"]')

            expect(noRepositoriesInformation).toHaveLength(0)
            expect(repositoriesList).toHaveLength(1)
            expect(repositoriesList.children()).toHaveLength(props.repositories.length)
        })
    })
})
