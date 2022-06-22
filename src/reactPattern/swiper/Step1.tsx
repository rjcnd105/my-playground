import type { BoxProps } from '@chakra-ui/react'
import { Box, Img, Text } from '@chakra-ui/react'

type Props = BoxProps

const step1 = (props: Props) => {
  return (
    <Box className="step1" {...props}>
      <Box className="step-images-wrap">
        <Box
          className="step-images"
          maxW={218}
          maxH={352}
          backgroundImage='url("/image/dummy/unsplash_awj7sRviVXo.jpg")'
          backgroundSize="contain"
        >
          <Img w="100%" src="/image/dummy/unsplash_awj7sRviVXo.jpg" alt="게시 이미지" />
          <svg
            className="star1"
            width="104"
            height="108"
            viewBox="0 0 104 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 0L58.3738 34.3834L83.7404 10.3131L68.6869 41.8762L103.357 37.3131L72.6262 54L103.357 70.6869L68.6869 66.1238L83.7404 97.6869L58.3738 73.6167L52 108L45.6262 73.6167L20.2596 97.6869L35.3131 66.1238L0.642948 70.6869L31.3738 54L0.642948 37.3131L35.3131 41.8762L20.2596 10.3131L45.6262 34.3834L52 0Z"
              fill="#CCF656"
            />
          </svg>
          <svg
            className="star2"
            width="174"
            height="174"
            viewBox="0 0 174 174"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M83 1L93.269 56.3954L134.137 17.6155L109.884 68.4673L165.742 61.1155L116.231 88L165.742 114.884L109.884 107.533L134.137 158.384L93.269 119.605L83 175L72.731 119.605L31.8627 158.384L56.1155 107.533L0.25808 114.884L49.769 88L0.25808 61.1155L56.1155 68.4673L31.8627 17.6155L72.731 56.3954L83 1Z"
              stroke="#CCF656"
            />
          </svg>
          <Box className="url-box">
            <Text color="lightGrey.3" fontWeight="m">
              https://youtu.bb/hl=posstit
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="tuto-text-wrap">
        <Text color="grey.1">step1</Text>
        <Text fontSize={26} color="white" fontFamily="ug" fontWeight="b" mt={10}>
          저장하고 싶은{' '}
          <Text display="inline" color="green.2">
            사진, 링크
          </Text>
          를
        </Text>
      </Box>
    </Box>
  )
}
export default step1
