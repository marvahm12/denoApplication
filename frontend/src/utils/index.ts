const patterns: Record<string, RegExp> = {
  cardName: /^([a-zA-Z ]){2,30}$/,
  phoneNumber: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,8}$/,
  cardNumber: /^\d(\d){15}$/,
  securityCode: /^\d{3}$/,
  username: /^[a-z0-9]{3,10}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
}

const patternErrorMessages: Record<string, string> = {
  cardName: 'Name should contain only alpahabetic characters.',
  cardNumber: 'Invalid card number',
  phoneNumber: 'Eg: +(033)-123-456789 or +33123456789',
  securityCode: 'Invalid security code',
  email: 'Invalid email format',
  password:
    'Should contain:\n' +
    'At least an upper case character, ' +
    'at least a lower case character, ' +
    'at least a digit, ' +
    'at least a special character (#?!@$%^&*-), ' +
    'at least 8 characters.',
  username: 'Should contain digits and lower case characters.',
}

export const checkValidPattern = (
  key: keyof typeof patterns,
  value: string,
): string | undefined => {
  const pattern = patterns[key]
  if (pattern && !value.match(pattern)) {
    return patternErrorMessages[key]
  }
  return
}

export const buildQueryString = (obj: Record<string, any>): string => {
  var str = []
  for (const p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

export const formatDate = (value: string) => {
  let formattedDate = ''
  if (value) {
    const parsedDate = new Date(value)
    const day = parsedDate.getDate()
    const month = parsedDate.getMonth() + 1
    const year = parsedDate.getFullYear()

    formattedDate = `${day}/${month}/${year}`
  }
  return formattedDate
}

export const getHashParams = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((acc: Record<string, any>, item) => {
      if (item) {
        var elem = item.split('=')
        acc[elem[0]] = decodeURIComponent(elem[1])
      }
      return acc
    }, {})
}

export const removeHashParamsFromUrl = () => {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search,
  )
}

export const isEmpty = (arg: any) => {
  if (!arg) return true
  if (arg && arg.constructor === Array && !arg.length) return true
  if (arg && arg.constructor === Object && !Object.keys(arg).length) return true
  return arg === undefined || arg === null
}
