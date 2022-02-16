import { mount } from '@vue/test-utils'
import Home from './index.vue'

describe('Home', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(Home)

    expect(wrapper.text()).toContain('Hello, World!!!')
  })
})
