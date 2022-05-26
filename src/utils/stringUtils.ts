import { isNil } from './common'

function isNilStr(str: unknown): str is string {
  return isNil(str) || str === ''
}

function isNotEmptyStr(str: unknown): str is string {
  return typeof str === 'string' && str !== ''
}
function  toDashedPhone(phone: string) {
  if (phone.length === 11) return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  if (phone.length === 10) return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  return undefined
}

const stringUtils = {
  isNilStr,
  isNotEmptyStr,
  toDashedPhone
}

export default stringUtils
