import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Spinner from '../Spinner'

Enzyme.configure({adapter: new Adapter()})

describe('Spinner component', () => {
    it('should render self and subcomponents', () => {
        const enzymeWrapper = shallow(<Spinner />)
        expect(enzymeWrapper.find('Loader').length).toBe(1)
    })
})
