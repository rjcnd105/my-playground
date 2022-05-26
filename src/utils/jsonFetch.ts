interface JsonResponse<JsonT> extends Response {
  json(): Promise<JsonT>
}
const jsonFetch = <DataT>(...params: Parameters<typeof fetch>) =>
  fetch(...params) as Promise<JsonResponse<DataT>>