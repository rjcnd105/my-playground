const stringUtils = {
  toDashedPhone(phone: string) {
    if (phone.length === 11) return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    if (phone.length === 10) return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    return undefined
  },
}

export default stringUtils
