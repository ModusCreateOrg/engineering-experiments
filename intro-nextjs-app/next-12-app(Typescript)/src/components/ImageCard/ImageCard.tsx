import { Box } from '@chakra-ui/react'
import { ChildrenProps } from 'types/ReactTypes'

const ImageCard = ({ children }: ChildrenProps) => {
  return (
    <Box textAlign="center" bg="white" shadow="md" p="10px">
      {children}
    </Box>
  )
}

export default ImageCard
