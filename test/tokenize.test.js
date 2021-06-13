let { Input } = require('postcss')

let tokenize = require('../tokenize')

function run(css, tokens) {
  expect(tokenize(new Input(css))).toEqual(tokens)
}

it('tokenizes inine comments', () => {
  run('// a', [['comment', '// a', 1, 1, 1, 4, 'inline']])
})

it('tokenizes inine comments and new lines', () => {
  run('// a\r\n', [
    ['comment', '// a', 1, 1, 1, 4, 'inline'],
    ['newline', '\r\n', 1]
  ])
})

it('tokenizes new lines arround spaces', () => {
  run(' \n ', [
    ['space', ' '],
    ['newline', '\n', 1],
    ['space', ' ']
  ])
})

it('tokenizes Windows new lines', () => {
  run('\r\n', [['newline', '\r\n', 1]])
})

it('tokenizes single carriage return', () => {
  run('\ra', [
    ['newline', '\r', 1],
    ['word', 'a', 2, 1, 2, 1]
  ])
})

it('tokenizes last carriage return', () => {
  run('\r', [['newline', '\r', 1]])
})

it('tokenizes comma', () => {
  run('a,b', [
    ['word', 'a', 1, 1, 1, 1],
    [',', ',', 1, 2],
    ['word', 'b', 1, 3, 1, 3]
  ])
})

it('escapes control symbols', () => {
  run('\\(\\{\\"\\@\\\\""', [
    ['word', '\\(', 1, 1, 1, 2],
    ['word', '\\{', 1, 3, 1, 4],
    ['word', '\\"', 1, 5, 1, 6],
    ['word', '\\@', 1, 7, 1, 8],
    ['word', '\\\\', 1, 9, 1, 10],
    ['string', '""', 1, 11, 1, 12]
  ])
})

it('escapes new line', () => {
  run('\\\n\\\r\\\r\n\\\f\\\\\n', [
    ['word', '\\\n', 1, 1, 1, 2],
    ['word', '\\\r', 2, 1, 2, 2],
    ['word', '\\\r\n', 3, 1, 3, 3],
    ['word', '\\\f', 4, 1, 4, 2],
    ['word', '\\\\', 5, 1, 5, 2],
    ['newline', '\n', 5]
  ])
})
