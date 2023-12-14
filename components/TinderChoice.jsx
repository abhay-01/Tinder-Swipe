import React from 'react'
import { View, Text } from 'react-native'

export default function TinderChoice({type}) {
  return (
   <View style= {{
    backgroundColor:type === "✔" ? "green" : "red",
    width:90,
    height:90,
    borderRadius:50,
    shadowColor:'black',
    shadowOffset:{
        width:0,
        height:10,
    },
    shadowRadius:10,
    shadowOpacity:0.3,
    justifyContent:'center',
    alignItems:'center',

   }}>
<Text style = {{
    color:"white",
    fontSize:55,
    textAlign:'center',
    paddingLeft:10,
    paddingRight:10,
}}>
    {type}
</Text>
   </View>
  )
}
