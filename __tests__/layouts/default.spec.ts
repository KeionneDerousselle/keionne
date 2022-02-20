import { mount, VueWrapper } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

describe('Default Layout', () => {
  let wrapper: VueWrapper<InstanceType<typeof DefaultLayout>>

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2020, 11, 31).getTime())

    wrapper = mount(DefaultLayout)
  })

  afterAll(() => {
    jest.useRealTimers()
    wrapper.unmount()
  })

  it('should render the app container', () => {
    expect(wrapper.get('.k-app').isVisible()).toBe(true)
  })

  it('should display the main container', () => {
    expect(wrapper.get('.k-main').isVisible()).toBe(true)
  })

  it('should display the footer', () => {
    expect(wrapper.get('.k-footer').isVisible()).toBe(true)
  })
})
