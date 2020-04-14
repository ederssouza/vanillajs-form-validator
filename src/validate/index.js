'use strict'

function isElement (element) {
  return element instanceof window.Element
}

class FormValidate {
  constructor ({
    formSelector,
    inputGroupClass = 'form-group',
    validClass = 'valid',
    invalidClass = 'invalid',
    msgClass = 'input-msg'
  }) {
    if (!isElement(formSelector)) {
      throw new TypeError('formSelector should a valid selector')
    }

    // selectors
    this.form = formSelector
    this.inputGroupClass = inputGroupClass

    // css classes
    this.validClass = validClass
    this.invalidClass = invalidClass
    this.msgClass = msgClass

    // regex
    this.regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,3}$/
    this.regexPhone = /^(?:\()?(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])(?:\))?(?:\s)?(9)?(\d{4})(?:-)?(\d{4})$/
    this.regexCPF = /^(\d{3})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{2})$/
    this.regexRG = /^(\d{2})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{1})$/
    this.regexCEP = /^(\d{5})(-)?(\d{3})$/
    this.regexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    this.regexInitialWhiteSpace = /^(\s+)/
    this.regexLastWhiteSpace = /(\s+)$/

    // methods
    this.addError = this.addError.bind(this)
    this.addSuccess = this.addSuccess.bind(this)
    this.validation = this.validation.bind(this)
    this.trigger = this.trigger.bind(this)
    this.checkValidFields = this.checkValidFields.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.getValues = this.getValues.bind(this)
    this.init = this.init.bind(this)
  }

  addError (elem) {
    elem.classList.remove(this.validClass)
    elem.classList.add(this.invalidClass)

    const msg = document.createElement('span')
    msg.classList.add(this.msgClass)
    msg.innerHTML = elem.getAttribute('data-validate-msg') || 'Required field'

    const parent = elem.closest(`.${this.inputGroupClass}`)
    const msgCheck = parent.querySelector(`.${this.msgClass}`)

    if (!msgCheck) {
      parent.appendChild(msg)
    }
  }

  addSuccess (elem) {
    elem.classList.remove(this.invalidClass)
    elem.classList.add(this.validClass)

    const parent = elem.parentNode
    const msg = parent.querySelector(`.${this.msgClass}`)

    if (msg) {
      msg.remove();
    }
  }

  cpfIsValid (cpf) {
    let numbers, digits, sum, i, result, equalDigits
    equalDigits = 1
    cpf = cpf.replace(/[.-]/g, '')

    if (cpf.length < 11) return false

    for (i = 0; i < cpf.length - 1; i++) {
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
        equalDigits = 0
        break
      }
    }

    if (!equalDigits) {
      numbers = cpf.substring(0, 9)
      digits = cpf.substring(9)
      sum = 0

      for (i = 10; i > 1; i--) {
        sum += numbers.charAt(10 - i) * i
      }

      result = sum % 11 < 2 ? 0 : 11 - sum % 11
      if (result !== parseInt(digits.charAt(0))) {
        return false
      }

      numbers = cpf.substring(0, 10)
      sum = 0
      for (i = 11; i > 1; i--) {
        sum += numbers.charAt(11 - i) * i
      }

      result = sum % 11 < 2 ? 0 : 11 - sum % 11
      if (result !== parseInt(digits.charAt(1))) {
        return false
      }

      return true
    } else {
      return false
    }
  }

  validation (e) {
    let target = e.target || e
    const getRegex = target.getAttribute('data-validate-regex')
    const regex = getRegex ? new RegExp(getRegex) : false

    if (target.getAttribute('data-validate-rule') === 'email') {
      if (!this.regexEmail.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'phone') {
      if (!this.regexPhone.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'cpf') {
      target.setAttribute('maxlength', 14)
      if (!this.regexCPF.test(target.value) || !this.cpfIsValid(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'rg') {
      target.setAttribute('maxlength', 12)
      if (!this.regexRG.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'cep') {
      target.setAttribute('maxlength', 9)
      if (!this.regexCEP.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'url') {
      if (!this.regexUrl.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else if (target.type === 'radio' || target.type === 'checkbox') {
      const parent = target.parentNode.parentNode
      target = parent.querySelector('[type=radio]:checked') || parent.querySelector('[type=checkbox]:checked')
      if (!target) {
        this.addError(parent)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(parent)
        this.checkValidFields(e)
        return true
      }
    } else if (regex) {
      if (!regex.test(target.value)) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    } else {
      if (
        target.value.length === 0 ||
        this.regexInitialWhiteSpace.test(target.value) ||
        this.regexLastWhiteSpace.test(target.value)
      ) {
        this.addError(target)
        this.checkValidFields(e)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(e)
        return true
      }
    }
  }

  trigger () {
    let i
    const fields = this.form.querySelectorAll('input')
    const event = new window.Event('change', { bubbles: true })

    for (i = 0; i < fields.length; i++) {
      fields[i].dispatchEvent(event)
    }

    return true
  }

  checkValidFields () {
    const inputs = this.form.querySelectorAll('[data-required]')
    const validInputs = this.form.querySelectorAll(`[data-required].${this.validClass}`)

    if (inputs.length !== validInputs.length) {
      return false
    }

    return true
  }

  reset () {
    let i
    let element
    const elements = this.form.querySelectorAll('[data-required]')

    for (i = 0; i < elements.length; i++) {
      element = elements[i]
      element.classList.remove(this.validClass)
    }

    this.form.reset()
  }

  submit () {
    if (!this.checkValidFields()) {
      let i
      let requiredField
      const requiredFields = this.form.querySelectorAll(`[data-required]:not(.${this.validClass})`)

      for (i = 0; i < requiredFields.length; i++) {
        requiredField = requiredFields[i]
        this.addError(requiredField)
      }

      requiredFields[0].focus()
      return false
    }

    return true
  }

  getValues () {
    let i
    let element
    let obj = {}
    const elements = this.form.elements

    for (i = 0; i < elements.length; i++) {
      element = elements[i]
      if (
        element.type !== 'radio' &&
        element.type !== 'checkbox' &&
        element.type !== 'submit'
      ) {
        obj[element.name] = element.value
      }

      if (element.type === 'radio' || element.type === 'checkbox') {
        const parent = element.closest(`.${this.inputGroupClass}`)
        const elem = parent.querySelector('[type=radio]:checked') || parent.querySelector('[type=checkbox]:checked')

        if (elem) {
          obj[elem.name] = elem.value === 'true' ? !!elem.value : elem.value
        } else {
          obj[element.name] = null
        }
      }
    }

    return obj
  }

  init () {
    let i
    let input
    const inputs = this.form.querySelectorAll('[data-required]')

    for (i = 0; i < inputs.length; i++) {
      input = inputs[i]
      input.addEventListener('keyup', this.validation)
      input.addEventListener('input', this.validation)
      input.addEventListener('change', this.validation)
    }

    // validation radio button
    const radioButtons = this.form.querySelectorAll('[type=radio]')
    let radioButton

    for (i = 0; i < radioButtons.length; i++) {
      radioButton = radioButtons[i]
      radioButton.addEventListener('change', this.validation)
    }

    // validation checkbox
    const checkboxes = this.form.querySelectorAll('[type=checkbox]')
    let checkbox

    for (i = 0; i < checkboxes.length; i++) {
      checkbox = checkboxes[i]
      checkbox.addEventListener('change', this.validation)
    }

    // submit form
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submit()
    })

    return true
  }
}

export default FormValidate
