/* eslint-disable no-unused-expressions */
'use strict'

import { expect } from 'chai'
import FormValidate from './index'

describe('FormValidate', () => {
  let form
  let validate
  let formGroup
  let elem

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form">
        <div class="form-group"></div>
      </form>
    `
    elem = document.createElement('input')
    elem.dataset.required = true

    formGroup = document.querySelector('.form-group')
    formGroup.appendChild(elem)

    form = document.getElementById('form')
    validate = new FormValidate({ formSelector: form })
  })

  test('should create an instance of FormValidate', () => {
    expect(validate).to.be.an.instanceof(FormValidate)
  })

  test('should have a form property', () => {
    expect(validate).to.have.property('form')
  })

  test('should throw an error when not add form selector', () => {
    const result = 'formSelector should a valid selector'

    try {
      validate = new FormValidate({})
    } catch (e) {
      expect(e.message).to.be.equal(result)
    }
  })

  describe('FormValidate.addError()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('addError')
    })

    test('should add invalid class', () => {
      validate.addError(elem)

      const before = elem.classList.contains('invalid')
      expect(before).to.be.true
    })

    test('should remove valid class', () => {
      elem.classList.add('valid')
      validate.addError(elem)

      const before = elem.classList.contains('valid')
      expect(before).to.be.false
    })

    test('should insert an error message', () => {
      validate.addError(elem)

      const before = !!formGroup.querySelector('.input-msg')
      expect(before).to.be.true
    })

    test('should not insert an error message', () => {
      const msg = document.createElement('span')
      msg.classList.add('input-msg')
      formGroup.appendChild(msg)
      validate.addError(elem)

      const before = !!formGroup.querySelector('.input-msg')
      expect(before).to.be.true
    })

    test('should insert an error message with default message "Required field"', () => {
      validate.addError(elem)

      const before = formGroup.querySelector('.input-msg').innerHTML
      const after = 'Required field'
      expect(before).to.be.equal(after)
    })

    test('should insert an error message with default custom message', () => {
      elem.setAttribute('data-validate-msg', 'Fild name is required')
      validate.addError(elem)

      const before = formGroup.querySelector('.input-msg').innerHTML
      const after = 'Fild name is required'
      expect(before).to.be.equal(after)
    })
  })

  describe('FormValidate.addSuccess()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('addSuccess')
    })

    test('should add valid class', () => {
      validate.addSuccess(elem)

      const before = elem.classList.contains('valid')
      expect(before).to.be.true
    })

    test('should remove invalid class', () => {
      elem.classList.add('invalid')
      validate.addSuccess(elem)

      const before = elem.classList.contains('invalid')
      expect(before).to.be.false
    })

    test('should not remove an error message', () => {
      validate.addSuccess(elem)

      const before = !!formGroup.querySelector('.input-msg')
      expect(before).to.be.false
    })

    test('should remove an error message', () => {
      const msg = document.createElement('span')
      msg.classList.add('input-msg')
      formGroup.appendChild(msg)

      validate.addSuccess(elem)
      const before = !!formGroup.querySelector('.input-msg')
      expect(before).to.be.false
    })
  })

  describe('FormValidate.cpfIsValid()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('cpfIsValid')
    })

    test('should return valid CPF', () => {
      expect(validate.cpfIsValid('834.613.480-07')).to.be.equal(true)
    })

    test('should return valid CPF without chars ".-"', () => {
      expect(validate.cpfIsValid('83461348007')).to.be.equal(true)
    })

    test('should return invalid CPF incorret verificator digit', () => {
      expect(validate.cpfIsValid('834.613.480-08')).to.be.equal(false)
    })

    test('should return invalid CPF when chars length < 11', () => {
      expect(validate.cpfIsValid('834.613.480')).to.be.equal(false)
    })

    test('should return invalid CPF when repeated characters', () => {
      expect(validate.cpfIsValid('111.111.111-11')).to.be.equal(false)
    })

    test('should return invalid CPF when (sum % 11 < 2 === 11 - sum % 11)', () => {
      expect(validate.cpfIsValid('000.000.001-10')).to.be.equal(false)
    })

    test('should return invalid CPF when (sum % 11 < 2 === 0)', () => {
      expect(validate.cpfIsValid('000.000.000-01')).to.be.equal(false)
    })
  })

  describe('FormValidate.validation()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('validation')
    })

    test('should return invalid e-mail', () => {
      elem.setAttribute('data-validate-rule', 'email')
      elem.value = 'emailoutlook.com'

      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return valid e-mail', () => {
      elem.setAttribute('data-validate-rule', 'email')
      elem.value = 'email@outlook.com'

      const before = validate.validation(elem)
      expect(before).to.be.true
    })

    test('should return invalid phone', () => {
      elem.setAttribute('data-validate-rule', 'phone')
      elem.value = '(11) 08888-8888'

      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return valid phone', () => {
      elem.setAttribute('data-validate-rule', 'phone')
      elem.value = '(11) 98888-8888'

      const before = validate.validation(elem)
      expect(before).to.be.true
    })

    test('should return invalid cpf', () => {
      elem.setAttribute('data-validate-rule', 'cpf')
      elem.value = '175.989.790-66'

      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return valid cpf', () => {
      elem.setAttribute('data-validate-rule', 'cpf')
      elem.value = '175.989.790-65'

      const before = validate.validation(elem)
      expect(before).to.be.true
    })

    test('should return invalid rg', () => {
      elem.setAttribute('data-validate-rule', 'rg')
      elem.value = '00.000.000'

      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return valid rg', () => {
      elem.setAttribute('data-validate-rule', 'rg')
      elem.value = '44.258.852-2'

      const before = validate.validation(elem)
      expect(before).to.be.true
    })

    test('should return invalid cep', () => {
      elem.setAttribute('data-validate-rule', 'cep')
      elem.value = '00000'

      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return valid cep', () => {
      elem.setAttribute('data-validate-rule', 'cep')
      elem.value = '06172-228'

      const before = validate.validation(elem)
      expect(before).to.be.true
    })

    test('should return input not checked', () => {
      document.body.innerHTML = `
        <form id="form">
          <div class="form-group">
            <label for="input-rg">Sex</label>
            <div data-required data-validate-msg="Selecione uma opção">
              <label class="radio-inline">
                <input type="radio" name="sex" value="female"> Female
              </label>
              <label class="radio-inline">
                <input type="radio" name="sex" value="male"> Male
              </label>
            </div>
          </div>
        </form>
      `

      elem = document.querySelector('[type="radio"]')
      elem.checked = false
      validate.validation(elem)

      const before = elem.checked
      expect(before).to.be.false
    })

    test('should return input checked', () => {
      document.body.innerHTML = `
        <form id="form">
          <div class="form-group">
            <label for="input-rg">Sex</label>
            <div data-required data-validate-msg="Selecione uma opção">
              <label class="radio-inline">
                <input type="radio" name="sex" value="female"> Female
              </label>
              <label class="radio-inline">
                <input type="radio" name="sex" value="male"> Male
              </label>
            </div>
          </div>
        </form>
      `

      elem = document.querySelector('[type="radio"]')
      elem.checked = true
      validate.validation(elem)

      const before = elem.checked
      expect(before).to.be.true
    })

    test('should return null value', () => {
      elem.value = ''
      const before = validate.validation(elem)
      expect(before).to.be.false
    })

    test('should return not null value', () => {
      elem.value = 'hello'
      const before = validate.validation(elem)
      expect(before).to.be.true
    })
  })

  describe('FormValidate.trigger()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('trigger')
    })

    test('should return event', () => {
      const before = validate.trigger()
      expect(before).to.be.true
    })
  })

  describe('FormValidate.checkValidFields()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('checkValidFields')
    })

    test('validate.checkValidFields() should return false', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>

        <div class="form-group">
          <input type="text" data-required="true">
        </div>
      `

      const before = validate.checkValidFields()
      expect(before).to.be.false
    })

    test('validate.checkValidFields() should return true', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>

        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>
      `

      const before = validate.checkValidFields()
      expect(before).to.be.true
    })
  })

  describe('FormValidate.reset()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('reset')
    })

    test('should reset form', () => {
      elem.classList.add('valid')
      elem.value = 'Fulano da Silva'
      validate.reset()

      const before = elem.value.length === 0 && !elem.classList.contains('valid')
      expect(before).to.be.true
    })
  })

  describe('FormValidate.submit()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('submit')
    })

    test('should return true', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>

        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>
      `

      const before = validate.submit()
      expect(before).to.be.true
    })

    test('should return false', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" data-required="true" class="valid">
        </div>

        <div class="form-group">
          <input type="text" data-required="true">
        </div>
      `

      const before = validate.submit()
      expect(before).to.be.false
    })
  })

  describe('FormValidate.getValues()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('getValues')
    })

    test('should return object { name: "Fulano da Silva", terms: true, accept: "i accept" }', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" name="name" data-required="true" class="valid" value="Fulano da Silva">
        </div>

        <div class="form-group">
          <div class="checkbox" data-required data-validate-msg="Selecione uma opção">
            <label>
              <input type="checkbox" name="terms" value="true" checked> I accept terms.
            </label>
          </div>
        </div>

        <div class="form-group">
          <div class="checkbox" data-required data-validate-msg="Selecione uma opção">
            <label>
              <input type="checkbox" name="accept" value="i accept" checked> I accept terms.
            </label>
          </div>
        </div>
      `

      const before = validate.getValues()
      const after = { name: 'Fulano da Silva', terms: true, accept: 'i accept' }
      expect(before).to.be.deep.equal(after)
    })

    test('should return object { name: "Fulano da Silva", terms: null }', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" name="name" data-required="true" class="valid" value="Fulano da Silva">
        </div>

        <div class="form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox" name="terms" value="true"> I accept terms.
            </label>
          </div>
        </div>
      `

      const before = validate.getValues()
      const after = { name: 'Fulano da Silva', terms: null }
      expect(before).to.be.deep.equal(after)
    })
  })

  describe('FormValidate.init()', () => {
    test('should exist', () => {
      expect(validate).to.respondTo('init')
    })

    test('should return true', () => {
      form.innerHTML = `
        <div class="form-group">
          <input type="text" name="name" data-required="true" class="valid" value="Fulano da Silva">
        </div>

        <div class="form-group">
          <label for="input-rg">Sex</label>
          <div data-required data-validate-msg="Selecione uma opção">
            <label class="radio-inline">
              <input type="radio" name="sex" value="female"> Female
            </label>
            <label class="radio-inline">
              <input type="radio" name="sex" value="male" checked> Male
            </label>
          </div>
        </div>

        <div class="form-group">
          <div class="checkbox" data-required data-validate-msg="Selecione uma opção">
            <label>
              <input type="checkbox" name="terms" value="true" checked> I accept terms.
            </label>
          </div>
        </div>
      `

      const before = validate.init()
      const event = new window.Event('submit', { bubbles: true })
      form.dispatchEvent(event)
      expect(before).to.be.true
    })
  })
})
