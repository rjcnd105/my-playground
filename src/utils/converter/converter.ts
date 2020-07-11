const tuple2obj = <KeyT extends PropertyKey, ValueT>([key, value]: readonly [KeyT, ValueT]) => ({
  [key]: value,
})

const converter = {
  tuple2obj,
}

export default converter
