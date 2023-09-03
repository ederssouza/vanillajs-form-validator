import { renderHTML } from '../utils/htmlMock'
import FormValidate from './index'

function dispatchEvent(element, eventName) {
  const event = new window.Event(eventName, { bubbles: true })
  element.dispatchEvent(event)
}

describe('FormValidate', () => {
  let formSelector
  let formValidate

  const defaultValues = {
    inputGroupClass: 'form-group',
    validClass: 'custom-valid-css-class',
    invalidClass: 'custom-invalid-css-class',
    msgClass: 'custom-error-msg-css-class'
  }

  const { validClass, invalidClass, msgClass } = defaultValues

  beforeEach(() => {
    document.body.innerHTML = renderHTML()
    formSelector = document.querySelector('#form')
    formValidate = FormValidate({ formSelector, ...defaultValues })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('when formSelector is not a valid selector', () => {
    it('should throw a TypeError', () => {
      const formSelector = 'form'
      const formValidate = () => FormValidate({ formSelector })

      expect(formValidate).toThrow(TypeError)
      expect(formValidate).toThrowError('formSelector should a valid selector')
    })
  })

  describe('when formSelector is a valid selector', () => {
    it('should render a form with novalidate attribute', () => {
      formValidate.init()

      dispatchEvent(formSelector, 'submit')

      expect(formSelector.getAttribute('novalidate')).not.toBeNull()
    })
  })

  describe('when the form is submitted', () => {
    describe('and there are no required fields', () => {
      beforeEach(() => {
        const requiredInput = document.querySelector("[name='name']")
        requiredInput.removeAttribute('data-required')
      })

      it('should return form values', () => {
        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        expect(formValidate.hasValidFields()).toBe(true)
        expect(formValidate.getValues()).toEqual({
          name: '',
          optional: ''
        })
      })
    })

    describe('and there are required fields', () => {
      it('should return an error before required input and add error CSS class', () => {
        const requiredInput = document.querySelector("[name='name']")
        const inputGroup = requiredInput.parentNode

        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        expect(formValidate.hasValidFields()).toBe(false)
        expect(requiredInput.classList.contains(invalidClass)).toBe(true)
        expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
        expect(inputGroup.textContent).toContain('Required field')
      })
    })
  })

  describe('when required text field', () => {
    describe('and dispatch keyup event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'keyup')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()
          requiredInput.value = 'name value'

          dispatchEvent(requiredInput, 'keyup')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: ''
          })

          expect(requiredInput.classList.contains(invalidClass)).toBe(false)
          expect(requiredInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch input event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'input')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()
          requiredInput.value = 'name value'

          dispatchEvent(requiredInput, 'input')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: ''
          })

          expect(requiredInput.classList.contains(invalidClass)).toBe(false)
          expect(requiredInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch change event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'change')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()
          requiredInput.value = 'name value'

          dispatchEvent(requiredInput, 'change')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: ''
          })

          expect(requiredInput.classList.contains(invalidClass)).toBe(false)
          expect(requiredInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch blur event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'blur')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()
          requiredInput.value = 'name value'

          dispatchEvent(requiredInput, 'blur')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: ''
          })

          expect(requiredInput.classList.contains(invalidClass)).toBe(false)
          expect(requiredInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })
  })

  describe('when call reset method', () => {
    it('should reset all form fields', () => {
      const formFields = formSelector.elements
      const requiredInput = document.querySelector("[name='name']")
      const optionalInput = document.querySelector("[name='optional']")

      formValidate.init()
      requiredInput.value = 'name value'
      optionalInput.value = 'optional value'

      dispatchEvent(requiredInput, 'blur')

      expect(formValidate.hasValidFields()).toBe(true)
      expect(formValidate.getValues()).toEqual({
        name: 'name value',
        optional: 'optional value'
      })

      formValidate.reset()

      expect(formValidate.getValues()).toEqual({
        name: '',
        optional: ''
      })

      Array.from(formFields).forEach((element) => {
        if (
          element.type !== 'radio' &&
          element.type !== 'checkbox' &&
          element.type !== 'submit'
        ) {
          expect(requiredInput.classList.contains(invalidClass)).toBe(false)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
        }
      })
    })
  })
})
