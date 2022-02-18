import { mount } from '@vue/test-utils'
import AboutMe from './index.vue'

describe('About Me', () => {
  it('renders the about me page', () => {
    const wrapper = mount(AboutMe)
    expect(wrapper.text()).toContain('About Me')
  })
})
