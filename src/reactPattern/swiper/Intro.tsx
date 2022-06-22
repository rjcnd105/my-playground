import type { BoxProps } from '@chakra-ui/react'
import { AspectRatio, Box, Flex, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import clsx from 'clsx'

import Badge from '~/components/ui/Badge'
import Icon, { icons } from '~/components/ui/Icon'

type Props = BoxProps

const images = [
  'unsplash_R4BSGm0J7yQ',
  'unsplash_khIQvjniR1E',
  'unsplash_FE4KxxvfPpI',
  'unsplash_5VDUzzNg_Wk',
  'unsplash_9MVVXa5BzlY',
  'unsplash_dmkmrNptMpw',
  'unsplash_042Srn0-82o',
  'unsplash_HwIjNt6medQ',
  'unsplash_OO4gobHWfTM',
  'unsplash_PavL9dX7O7s',
  'unsplash_TnG2q8FtXsg',
  'unsplash_mk6NEGfhlsE',
  'unsplash_dCYlwyl6GqM',
  'unsplash_17NCG_wOkMY',
  'unsplash_GNfCcAC9KiQ',
  'unsplash_vdDRu6btlwg',
  'unsplash_c7kSYkuiN3c',
  'unsplash_q1C116-6HHE',
]
const intro = ({ className, ...props }: Props) => {
  return (
    <Flex className={clsx('tutorial-intro', className)} {...props}>
      <div className="background-viewer">
        <SimpleGrid className="intro-img-grid" columns={[3, 5, 8]} spacing={4}>
          {[...images, ...images].map((name, i) => (
            <AspectRatio maxW={256} ratio={1} key={`${name}-${i}`}>
              <Box
                className="img-box"
                backgroundImage={`/image/dummy/${name}.jpeg`}
                aria-hidden="true"
              />
            </AspectRatio>
          ))}
        </SimpleGrid>
        <div className="gradient-box" />
      </div>

      <Spacer />
      <Box>
        <Box className="folder-wrapper">
          <svg
            width="46"
            height="32"
            viewBox="0 0 46 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1H17.8375C18.6694 1 19.4145 1.51497 19.7085 2.2932L29.5307 28.2932C30.0249 29.6014 29.0582 31 27.6597 31H3C1.89543 31 1 30.1046 1 29V3C1 1.89543 1.89543 1 3 1Z"
              fill="#EAEAEA"
              stroke="#D4D4D4"
              strokeWidth="2"
            />
            <path
              d="M6.75621 8H42.4511C43.6887 8 44.6292 9.11261 44.4232 10.3329L41.2159 29.3329C41.0534 30.2954 40.2199 31 39.2438 31H3.54887C2.3113 31 1.37077 29.8874 1.57677 28.6671L4.78411 9.6671C4.94658 8.70461 5.7801 8 6.75621 8Z"
              fill="#F4F4F4"
              stroke="#D4D4D4"
              strokeWidth="2"
            />
          </svg>
          <Badge className="count-badge">15,000+</Badge>
        </Box>
      </Box>
      <Box className="tuto-text-wrap">
        <Text fontSize={18} color="grey.1" fontFamily="ug">
          그 때 캡쳐한 사진, 그 때 본 링크
        </Text>
        <Text fontSize={26} color="green.2" fontFamily="ug" fontWeight="b" mt={10}>
          다시 찾기 어렵다면?
        </Text>
      </Box>
    </Flex>
  )
}
export default intro
