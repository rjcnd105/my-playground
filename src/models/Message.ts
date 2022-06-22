export type Message = {
  _URI: 'Message'
  kind: string
  status: 'success' | 'error' | 'info' | 'warning'
  text: string
}
const _URI = 'Message' as const

type MessageParams = Omit<Message, '_URI' | 'kind'> & Partial<Pick<Message, 'kind'>>
export function message({ kind = '', ...params }: MessageParams) {
  return { _URI, kind, ...params }
}

// custom type gurad
export const isMessage = (o: unknown): o is Message => {
  if( typeof o === 'object' && o !== null && '_URI' in o) {
    return (o as { _URI: unknown })._URI === _URI
  }
  return false
}
