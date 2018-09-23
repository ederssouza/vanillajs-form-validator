# VanillaJS Form Validator

[![Build Status](https://travis-ci.org/ederssouza/vanillajs-form-validator.svg?branch=master)](https://travis-ci.org/ederssouza/vanillajs-form-validator) [![Coverage Status](https://coveralls.io/repos/github/ederssouza/vanillajs-form-validator/badge.svg)](https://coveralls.io/github/ederssouza/vanillajs-form-validator) [![npm version](http://img.shields.io/npm/v/vanillajs-form-validator.svg)](https://npmjs.org/package/vanillajs-form-validator) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ederssouza/vanillajs-form-validator/raw/master/LICENSE.md)

Form validation in pure JavaScript.

## Installation

```bash
npm install vanillajs-form-validator --save
```

## How to use

1 - Create HTML markup with `data-required` on `<input />` tag:

```html
<form id="form" novalidate>
  <div class="form-group">
    <input
      type="text"
      name="name"
      placeholder="Name"
      autocomplete="off"
      data-required>
  </div>

  <button type="submit">Submit</button>
</form>
```

2 - Create validator instance and call `.init()` method:

```javascript
var form = document.getElementById('form')

var formValidate = new FormValidate({
  formSelector: form
})

formValidate.init()
```

### Options

#### Properties

|name|type|defalt value|
|:-|:-|:-|
|`formSelector`|`HTML DOM Element`||
|`formGroupSelector`|`String`|`form-group`|
|`validClass`|`String`|`valid`|
|`invalidClass`|`String`|`invalid`|
|`msgClass`|`String`|`input-msg`|

#### Methods

|name|action|
|:-|:-|
|`FormValidate.trigger()`|Force trigger validation event|
|`FormValidate.checkValidFields()`|Check if form required fields was validated|
|`FormValidate.reset()`|Clear form values and `valid` and `invalid` classes|
|`FormValidate.getValues()`|Get form values and return an object|

#### Validations rules attribute

Add `data-required` attribute on `<input />` tag:

```html
<div class="form-group">
  <input
    type="email"
    name="name"
    placeholder="Name"
    autocomplete="off"
    data-required
    data-validate-rule="email">
</div>
```

|name|validation type|
|:-|:-|
|`data-validate-rule="email"`|Check valid e-mail|
|`data-validate-rule="phone"`|Check valid Brazil phone number|
|`data-validate-rule="cpf"`|Check valid CPF|
|`data-validate-rule="rg"`|Check valid RG|
|`data-validate-rule="cep"`|Check valid CEP|
|`data-validate-rule="url"`|Check valid CEP|

#### Regex attribute

Add `data-validate-regex` attribute on `<input />` tag:

```html
<div class="form-group">
  <input
    type="text"
    name="name"
    placeholder="Only numbers"
    autocomplete="off"
    data-required
    data-validate-regex="\d+"
    data-validate-msg="Only numbers is required field">
</div>
```

#### Custom error message

Add `data-validate-msg` attribute on `<input />` tag:

```html
<div class="form-group">
  <input
    type="email"
    name="name"
    placeholder="Name"
    autocomplete="off"
    data-required
    data-validate-msg="Name is required field">
</div>
```

## Examples

### Basic

[Click here](https://ederssouza.github.io/vanillajs-form-validator/samples/basic.html) to view demo.

```html
<form id="form" novalidate>
  <div class="form-group">
    <input
      type="text"
      name="name"
      placeholder="Name"
      autocomplete="off"
      data-required>
  </div>

  <button type="submit">Submit</button>
</form>

<script src="dist/js/vanillajs-form-validator.js"></script>
<script>
  var form = document.getElementById('form')
  var config = {
    formSelector: form
  }

  var formValidate = new FormValidate(config)
  formValidate.init()
</script>
```

### Rewriting HTML classes names

```javascript
var form = document.getElementById('form')

var formValidate = new FormValidate({
  formSelector: form,
  inputGroupClass: 'uk-margin',
  validClass: 'uk-form-success',
  invalidClass: 'uk-form-danger',
  msgClass: 'input-msg'
})

formValidate.init()
```

### Full example

[Click here](https://ederssouza.github.io/vanillajs-form-validator/samples) to view demo.

```javascript
var form = document.getElementById('form')
var config = {
  formSelector: form,
  inputGroupClass: 'uk-margin',
  validClass: 'uk-form-success',
  invalidClass: 'uk-form-danger',
  msgClass: 'input-msg'
}

var formValidate = new FormValidate(config)
formValidate.init()

form.addEventListener('submit', () => {

  // check valid form
  var isValid = formValidate.checkValidFields()

  if (isValid) {

    // get input values
    console.table(formValidate.getValues())

    // reset form
    formValidate.reset()
  }
})
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ederssouza/vanillajs-form-validator/tags).

## Authors

See also the list of [contributors](https://github.com/ederssouza/vanillajs-form-validator/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
