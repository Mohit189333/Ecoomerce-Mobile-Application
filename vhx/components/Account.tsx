import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Login from './Login'
import AccountDetails from './AccountDetails'
import { MyContext } from './MyContextProvider'

const Account = () => {
 const {token} = useContext(MyContext)

 
  return (
    <View>
      
{token ?<AccountDetails/>:
<Login/>
}
    </View>
  )
}

export default Account