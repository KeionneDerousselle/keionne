import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import ButtonLink from './index.vue'

describe('Button', () => {
  let wrapper: VueWrapper<InstanceType<typeof ButtonLink>>
  let buttonClasses: string[]

  describe('when the button link props are not provided', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink)
      buttonClasses = wrapper.get('button.button').classes()
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should display the button link', () => {
      expect(wrapper.get('button.button').isVisible()).toBe(true)
    })

    it('should render the center button content', () => {
      expect(wrapper.get('button.button .button__content--center').isVisible()).toBe(true)
    })

    it('should not render either the left or right loading spinner by default', () => {
      expect(() => wrapper.get('button.button .button__spinner')).toThrow()
    })

    it('should not render the loading button class', () => {
      expect(buttonClasses).not.toContain('button--loading')
    })

    it('should not set the disabled attribute on the button link', () => {
      // The disabled attribute should not be defined, but most likely will not equal the value false
      // <button></button>
      expect(wrapper.get('button.button').attributes().disabled).toBeFalsy()
    })
  })

  describe('when the href property is provided to the button link', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        props: {
          href: 'https://www.google.com',
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should render the button as an external link', () => {
      expect(wrapper.get('a.button').isVisible()).toBe(true)
    })
  })

  describe('when the to property is provided to the button link', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        stubs: ['nuxt-link'],
        props: {
          to: '/',
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should render the button as an internal nuxt link', () => {
      expect(wrapper.get('nuxt-link.button').isVisible()).toBe(true)
    })
  })

  describe('when the button link is disabled', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        attrs: {
          disabled: true,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not set the disabled attribute on the button link', () => {
      // The disabled attribute should be defined, but most likely will not equal the value true
      // <button disabled="disabled"></button>
      expect(wrapper.get('button.button').attributes().disabled).toEqual('')
    })
  })

  describe('when the button link is not disabled', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        attrs: {
          disabled: false,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not set the disabled attribute on the button link', () => {
      // The disabled attribute should not be defined, but most likely will not equal the value false
      // <button></button>
      expect(wrapper.get('button.button').attributes().disabled).toBeFalsy()
    })
  })

  describe('when providing the button link with a default slot', () => {
    let contentSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      wrapper = shallowMount(ButtonLink, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should render the content slot', () => {
      expect(wrapper.get(`button.button .button__content .button__content--center #${contentSlotId}`).isVisible()).toBe(
        true
      )
    })
  })

  describe('when not providing the button link with a default slot', () => {
    let contentSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      wrapper = shallowMount(ButtonLink)
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not render the content slot', () => {
      expect(() => wrapper.get(`button.button .button__content .button__content--center #${contentSlotId}`)).toThrow()
    })
  })

  describe('when listeners are provided to the button link', () => {
    beforeAll(async () => {
      wrapper = mount(ButtonLink)

      wrapper.get('button.button').trigger('click')
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should emit the click event', () => {
      expect(wrapper.emitted().click[0][0]).toEqual(expect.any(MouseEvent))
    })
  })

  describe('when attributes are provided to the button link', () => {
    beforeAll(() => {
      wrapper = mount(ButtonLink, {
        attrs: {
          type: 'submit',
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should pass any attributes to the button link component', () => {
      expect(wrapper.attributes().type).toBe('submit')
    })
  })

  describe('when a right button slot is provided, but the button link is not loading', () => {
    let contentSlotId: string
    let rightSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`,
        },

        props: {
          loading: false,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should render the right content slot', () => {
      expect(wrapper.get(`button.button .button__content .button__content--right #${rightSlotId}`).isVisible()).toBe(
        true
      )
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get('button.button .button__content--left')).toThrow()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a right button slot is provided, and the button link is loading', () => {
    let contentSlotId: string
    let rightSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`,
        },

        props: {
          loading: true,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get(`button.button .button__content .button__content--right #${rightSlotId}`)).toThrow()
    })

    it('should render the right loading spinner', () => {
      expect(wrapper.get('button.button .button__content .button__content--right .button__spinner').isVisible()).toBe(
        true
      )
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get('button.button .button__content--left')).toThrow()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a left button slot is provided, but the button link is not loading', () => {
    let contentSlotId: string
    let leftSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          left: `<span id="${leftSlotId}">L</span>`,
        },

        props: {
          loading: false,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right')).toThrow()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`button.button .button__content--left #${leftSlotId}`).isVisible()).toBe(true)
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a left button slot is provided, and the button link is loading', () => {
    let contentSlotId: string
    let leftSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          left: `<span id="${leftSlotId}">L</span>`,
        },

        props: {
          loading: true,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right')).toThrow()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get(`button.button .button__content--left #${leftSlotId}`)).toThrow()
    })

    it('should render the left loading spinner', () => {
      expect(wrapper.get('button.button .button__content .button__content--left .button__spinner').isVisible()).toBe(
        true
      )
    })
  })

  describe('when a right and left button slot is provided', () => {
    let contentSlotId: string
    let rightSlotId: string
    let leftSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          left: `<span id="${leftSlotId}">L</span>`,
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`,
        },

        props: {
          loading: false,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should render the right slot', () => {
      expect(wrapper.get(`button.button .button__content .button__content--right #${rightSlotId}`).isVisible()).toBe(
        true
      )
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`button.button .button__content .button__content--left #${leftSlotId}`).isVisible()).toBe(true)
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a right and left button slot is provided, and the button link is loading', () => {
    let contentSlotId: string
    let rightSlotId: string
    let leftSlotId: string

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowMount(ButtonLink, {
        slots: {
          left: `<span id="${leftSlotId}">L</span>`,
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`,
        },

        props: {
          loading: true,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not render the right slot', () => {
      expect(() => wrapper.get(`button.button .button__content .button__content--right #${rightSlotId}`)).toThrow()
    })

    it('should render the right loading spinner', () => {
      expect(wrapper.get('button.button .button__content .button__content--right .button__spinner').isVisible()).toBe(
        true
      )
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`button.button .button__content .button__content--left #${leftSlotId}`).isVisible()).toBe(true)
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('button.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when no left or right slot are provided, and the button link is loading', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        props: {
          loading: true,
        },
      })

      buttonClasses = wrapper.get('button.button').classes()
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should set the loading class on the button link', () => {
      expect(buttonClasses).toContain('button--loading')
    })

    it('should render the loading spinner on the right side of the button link', () => {
      expect(wrapper.get('button.button .button__content--right .button__spinner').isVisible()).toBe(true)
    })

    it('should not render the loading spinner on the left side of the button link', () => {
      expect(() => wrapper.get('button.button .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when no left or right slot are provided, and the button link is not loading', () => {
    beforeAll(() => {
      wrapper = shallowMount(ButtonLink, {
        props: {
          loading: false,
        },
      })

      buttonClasses = wrapper.get('button.button').classes()
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should not set the loading class on the button link', () => {
      expect(buttonClasses).not.toContain('button--loading')
    })

    it('should not render the loading spinner on the right side of the button link', () => {
      expect(() => wrapper.get('button.button .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the loading spinner on the left side of the button link', () => {
      expect(() => wrapper.get('button.button .button__content--left .button__spinner')).toThrow()
    })
  })
})
