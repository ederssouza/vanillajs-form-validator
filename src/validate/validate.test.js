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
    form = document.getElementById('form')
    formGroup = document.querySelector('.form-group')

    elem = document.createElement('input')
    elem.setAttribute('data-required', true)
    formGroup.appendChild(elem)

    validate = new FormValidate(form)
  })

  describe('Smoke tests', () => {
    test('should create an instance of FormValidate', () => {
      expect(validate).to.be.an.instanceof(FormValidate)
    })

    test('Must Have a Form Property', () => {
      expect(validate).to.have.property('form')
    })

    // test('should be a method addSuccess', () => {
    //   expect(validate).to.respondTo('addSuccess')
    // })

    // test('should be a method cpfIsValid', () => {
    //   expect(validate).to.respondTo('cpfIsValid')
    // })

    // test('should be a method validation', () => {
    //   expect(validate).to.respondTo('validation')
    // })

    // test('should be a method checkValidFields', () => {
    //   expect(validate).to.respondTo('checkValidFields')
    // })

    // test('should be a method getValues', () => {
    //   expect(validate).to.respondTo('getValues')
    // })

    // test('should be a method reset', () => {
    //   expect(validate).to.respondTo('reset')
    // })

    // test('should be a method submit', () => {
    //   expect(validate).to.respondTo('submit')
    // })
  })

  describe('addError method', () => {
    test('should be a method addError', () => {
      expect(validate).to.respondTo('addError')
    })

    test('should add class invalid', () => {
      validate.addError(elem)

      const before = elem.classList.contains('invalid')
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should remove class valid', () => {
      elem.classList.add('valid')
      validate.addError(elem)

      const before = elem.classList.contains('valid')
      const after = false
      expect(before).to.be.equal(after)
    })

    test('must insert an error message', () => {
      validate.addError(elem)
      const before = !!document.querySelector('.input-msg')
      const after = true
      expect(before).to.be.equal(after)
    })

    test('must not insert an error message', () => {
      const msg = document.createElement('span')
      msg.classList.add('input-msg')
      formGroup.appendChild(msg)

      validate.addError(elem)
      const before = !!document.querySelector('.input-msg')
      const after = true
      expect(before).to.be.equal(after)
    })

    test('must insert an error message with default message "Required field"', () => {
      validate.addError(elem)
      const before = document.querySelector('.form-group').querySelector('.input-msg').innerHTML
      const after = 'Required field'
      expect(before).to.be.equal(after)
    })

    test('must insert an error message with default custom message', () => {
      elem.setAttribute('data-validate-msg', 'Fild name is required')
      validate.addError(elem)
      const before = document.querySelector('.form-group').querySelector('.input-msg').innerHTML
      const after = 'Fild name is required'
      expect(before).to.be.equal(after)
    })
  })

  describe('addSuccess method', () => {
    test('should be a method addSuccess', () => {
      expect(validate).to.respondTo('addSuccess')
    })

    test('should add class valid', () => {
      validate.addSuccess(elem)

      const before = elem.classList.contains('valid')
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should remove class invalid', () => {
      elem.classList.add('invalid')
      validate.addSuccess(elem)

      const before = elem.classList.contains('invalid')
      const after = false
      expect(before).to.be.equal(after)
    })

    test('must not remove an error message', () => {
      validate.addSuccess(elem)
      const before = !!document.querySelector('.input-msg')
      const after = false
      expect(before).to.be.equal(after)
    })

    test('must remove an error message', () => {
      const msg = document.createElement('span')
      msg.classList.add('input-msg')
      formGroup.appendChild(msg)

      validate.addSuccess(elem)
      const before = !!document.querySelector('.input-msg')
      const after = false
      expect(before).to.be.equal(after)
    })
  })

  describe('cpfIsValid method', () => {
    test('should be a method cpfIsValid', () => {
      expect(validate).to.respondTo('cpfIsValid')
    })

    describe('cshould be return valid CPF', () => {
      test('should be return valid CPF', () => {
        expect(validate.cpfIsValid('834.613.480-07')).to.be.equal(true)
      })

      test('should be return valid CPF without chars ".-"', () => {
        expect(validate.cpfIsValid('83461348007')).to.be.equal(true)
      })
    })

    describe('should be return invalid CPF', () => {
      test('incorret verificator digit', () => {
        expect(validate.cpfIsValid('834.613.480-08')).to.be.equal(false)
      })

      test('when chars length < 11', () => {
        expect(validate.cpfIsValid('834.613.480')).to.be.equal(false)
      })

      test('when repeated characters', () => {
        expect(validate.cpfIsValid('111.111.111-11')).to.be.equal(false)
      })

      test('when sum % 11 < 2 === 11 - sum % 11', () => {
        expect(validate.cpfIsValid('000.000.001-10')).to.be.equal(false)
      })

      test('when sum % 11 < 2 === 0', () => {
        expect(validate.cpfIsValid('000.000.000-01')).to.be.equal(false)
      })
    })
  })

  describe('validation method', () => {
    test('should be a method validation', () => {
      expect(validate).to.respondTo('validation')
    })

    test('should be return invalid e-mail', () => {
      elem.setAttribute('data-validate-rule', 'email')
      elem.value = 'emailoutlook.com.br'

      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return valid e-mail', () => {
      elem.setAttribute('data-validate-rule', 'email')
      elem.value = 'email@outlook.com.br'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return invalid phone', () => {
      elem.setAttribute('data-validate-rule', 'phone')
      elem.value = '(11) 08888-8888'

      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return valid phone', () => {
      elem.setAttribute('data-validate-rule', 'phone')
      elem.value = '(11) 98888-8888'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return invalid cpf', () => {
      elem.setAttribute('data-validate-rule', 'cpf')
      elem.value = '175.989.790-66'

      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return valid cpf', () => {
      elem.setAttribute('data-validate-rule', 'cpf')
      elem.value = '175.989.790-65'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return invalid rg', () => {
      elem.setAttribute('data-validate-rule', 'rg')
      elem.value = '00.000.000'

      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return valid rg', () => {
      elem.setAttribute('data-validate-rule', 'rg')
      elem.value = '44.258.852-2'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return invalid cep', () => {
      elem.setAttribute('data-validate-rule', 'cep')
      elem.value = '00000'

      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return valid cep', () => {
      elem.setAttribute('data-validate-rule', 'cep')
      elem.value = '06172-228'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return input not checked', () => {
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
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return input checked', () => {
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
      const after = true
      expect(before).to.be.equal(after)
    })

    test('should be return null value', () => {
      elem.value = ''
      const before = validate.validation(elem)
      const after = false
      expect(before).to.be.equal(after)
    })

    test('should be return not null value', () => {
      elem.value = 'hello'

      const before = validate.validation(elem)
      const after = true
      expect(before).to.be.equal(after)
    })
  })

  describe('checkValidFields method', () => {
    test('should be a method checkValidFields', () => {
      expect(validate).to.respondTo('checkValidFields')
    })
  })

  describe('getValues method', () => {
    test('should be a method getValues', () => {
      expect(validate).to.respondTo('getValues')
    })
  })

  describe('reset method', () => {
    test('should be a method reset', () => {
      expect(validate).to.respondTo('reset')
    })
  })

  describe('submit method', () => {
    test('should be a method submit', () => {
      expect(validate).to.respondTo('submit')
    })
  })
})
