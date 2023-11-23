const dev_info = (...params) => {
  console.log(...params)
}

const dev_error = (...params) => {
  console.log(...params)
}

const test_log = () => { }

const info = process.env.NODE_ENV === "test"
  ? test_log
  : dev_info

const error = process.NODE_ENV === "test"
  ? test_log
  : dev_error

module.exports = {
  info,
  error
}