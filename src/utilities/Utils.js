const validarEmail = (email) => {
  var re = /\S+@\S+\.\S+/
  return re.test(String(email).toLowerCase())
}

export {
  validarEmail
}