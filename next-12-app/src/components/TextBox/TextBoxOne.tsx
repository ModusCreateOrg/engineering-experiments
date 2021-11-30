import { Text, Box } from '@chakra-ui/react'
import { TextBoxOneProps } from 'types/TextBoxTypes'

const TextBoxOne = ({ text }: TextBoxOneProps) => {
  return (
    <Box borderRadius="10px" w="500px" mb="20px" bg="white" p="10px">
      <Text fontSize="18px">{text}</Text>
    </Box>
  )
}

export default TextBoxOne
