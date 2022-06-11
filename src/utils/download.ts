// export const handleDownload = (url, index = 0) => {
//   setTimeout(function temporaryDownloadLinkFunc() {
//     fileDownload(url, `${index}.pdf`)
//   }, index * 350)
// }

import { AxiosResponse } from 'axios'

export const fileDownload = (url: string, fileName: string, fileExt: string) => {
  const downloadEl = document.createElement('a')
  downloadEl.setAttribute('target', '_blank')
  downloadEl.style.display = 'none'
  downloadEl.setAttribute('href', url)
  downloadEl.setAttribute('download', `${fileName}.${fileExt}`)
  downloadEl.click()

  if (downloadEl.parentNode) {
    document.body.removeChild(downloadEl)
  }
}

export const downloadOpenUrl = (url: string, windowOption = '_blank') => {
  // 일렉트론에서 url 미리보기시 파일 다운로드 창이 뜸 -> ?preview 가 붙은 텍스트는 일렉트론에서 다운로드 하지 않고 새 창을 열도록 예외처리할 예정
  const newUrl = `${url}?preview`
  window.open(newUrl, windowOption)
}

export function downloadHistory(res: AxiosResponse<Blob>, customFileName: string) {
  const url = window.URL.createObjectURL(new Blob([res.data]))

  const contentDisposition = res.headers['content-disposition'] // 파일 이름
  let fileName = 'unknown'
  if (contentDisposition) {
    const [fileNameMatch] = contentDisposition.split(';').filter((str) => str.includes('filename'))
    if (fileNameMatch) [, fileName] = fileNameMatch.split('=')
  }
  const fileExt = fileName.split('.')[1].replace(/"/g, '') // 파일 확장자

  fileDownload(url, customFileName, fileExt)
}
