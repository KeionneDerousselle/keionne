import { shallowMount, VueWrapper } from '@vue/test-utils'
import Footer from './index.vue'

describe('Footer', () => {
  let wrapper: VueWrapper<InstanceType<typeof Footer>>
  const currentYear = new Date().getFullYear()

  beforeAll(() => {
    wrapper = shallowMount(Footer)
  })

  afterAll(() => {
    wrapper.unmount()
  })

  it('should contain a copyright with the current year', () => {
    expect(wrapper.get('.footer').text()).toContain(`© ${currentYear} Keionne Derousselle`)
  })
})
