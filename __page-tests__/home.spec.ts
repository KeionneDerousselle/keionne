import { mount, VueWrapper } from '@vue/test-utils'
import Home from '@/pages/index.vue'

describe('Home', () => {
  let wrapper: VueWrapper<InstanceType<typeof Home>>

  beforeAll(() => {
    wrapper = mount(Home)
  })

  afterAll(() => {
    wrapper.unmount()
  })

  it('renders the about section', () => {
    expect(wrapper.get('#about').isVisible()).toBe(true)
  })
})
