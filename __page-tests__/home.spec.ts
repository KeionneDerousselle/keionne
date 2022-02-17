import { mount } from '@vue/test-utils'
import Home from '@/pages/index.vue'

describe('Home', () => {
  it('renders the home page', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('Hello, World!!!')
  })
})
