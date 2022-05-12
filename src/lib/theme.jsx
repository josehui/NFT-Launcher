import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }

const theme = extendTheme({ config })


export default theme