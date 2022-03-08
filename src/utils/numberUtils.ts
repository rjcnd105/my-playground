const numberUtils = {
  thousandsSeparators(num: number) {
    const numParts = num.toString().split('.')
    if (!numParts[0]) return String(num)
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return numParts.join('.')
  },

  removeSeparators: (str: string) => str.replaceAll(',', '')
}

export default numberUtils
