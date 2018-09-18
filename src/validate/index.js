'use strict'

class FormValidate {
  constructor (form) {
    this.form = form
    this.validation = this.validation.bind(this)
    this.checkValidFields = this.checkValidFields.bind(this)
    this.getValues = this.getValues.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
  }

  addError (elem) {
    elem.classList.remove('valid')
    elem.classList.add('invalid')

    const msg = document.createElement('span')
    msg.classList.add('input-msg')
    msg.innerHTML = elem.getAttribute('data-validate-msg') || 'Required field'

    const parent = elem.closest('.form-group')
    const msgCheck = parent.querySelector('.input-msg')

    if (!msgCheck) {
      parent.appendChild(msg)
    }
  }

  addSuccess (elem) {
    elem.classList.remove('invalid')
    elem.classList.add('valid')

    const parent = elem.parentNode
    const msg = parent.querySelector('.input-msg')

    if (msg) {
      parent.removeChild(msg)
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

  validation (event) {
    let target = event.target || event

    if (target.getAttribute('data-validate-rule') === 'email') {
      const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,3}$/
      if (!regex.test(target.value)) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'phone') {
      const regex = /^(?:\()?(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])(?:\))?(?:\s)?(9)?(\d{4})(?:-)?(\d{4})$/
      if (!regex.test(target.value)) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'cpf') {
      target.setAttribute('maxlength', 14)
      const regex = /^(\d{3})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{2})$/
      if (!regex.test(target.value) || !this.cpfIsValid(target.value)) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'rg') {
      target.setAttribute('maxlength', 12)
      const regex = /^(\d{2})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{1})$/
      if (!regex.test(target.value)) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    } else if (target.getAttribute('data-validate-rule') === 'cep') {
      target.setAttribute('maxlength', 9)
      const regex = /^(\d{5})(-)?(\d{3})$/
      if (!regex.test(target.value)) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    } else if (target.type === 'radio' || target.type === 'checkbox') {
      const parent = target.parentNode.parentNode
      target = parent.querySelector('[type=radio]:checked') || parent.querySelector('[type=checkbox]:checked')
      if (!target) {
        this.addError(parent)
        return false
      } else {
        this.addSuccess(parent)
        return true
      }
    } else {
      if (target.value.length === 0) {
        this.addError(target)
        this.checkValidFields(event)
        return false
      } else {
        this.addSuccess(target)
        this.checkValidFields(event)
        return true
      }
    }
  }

  checkValidFields () {
    const inputs = this.form.querySelectorAll('[data-required]')
    const validInputs = this.form.querySelectorAll('[data-required].valid')

    if (inputs.length !== validInputs.length) {
      return false
    }

    return true
  }

  getValues () {
    // const elements = this.form.elements
    // let i
    // let element
    // let obj = {}

    // for (i = 0; i < elements.length; i++) {
    //   element = elements[i]
    //   if (element.type !== 'radio' && element.type !== 'checkbox' && element.type !== 'submit') {
    //     obj[element.name] = element.value
    //   }

    //   if (element.type === 'radio' || element.type === 'checkbox') {
    //     var parent = element.closest('.form-group')
    //     var elem = parent.querySelector('[type=radio]:checked') || parent.querySelector('[type=checkbox]:checked')
    //     if (elem) {
    //       obj[elem.name] = elem.value
    //     } else {
    //       obj[element.name] = null
    //     }
    //   }
    // }

    // return obj
  }

  reset () {
    const elements = this.form.querySelectorAll('[data-required]')
    let i
    let element

    for (i = 0; i < elements.length; i++) {
      element = elements[i]
      element.classList.remove('valid')
    }

    this.form.reset()
  }

  submit () {
    if (!this.checkValidFields()) {
      const requiredFields = document.querySelectorAll('[data-required]:not(.valid)')
      let i
      let requiredField

      for (i = 0; i < requiredFields.length; i++) {
        requiredField = requiredFields[i]
        this.addError(requiredField)
      }

      requiredFields[0].focus()
      return false
    }

    return this.getValues()
  }
}

export default FormValidate
