import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, ScrollView, } from 'react-native';


const DATA = [
  { id: '1', title: 'You are invited: Join the Streaks Challenge Today' },
  { id: '2', title: 'Shop your viewed items at Sale price' },
  { id: '3', title: 'Looking like a bomb in campus ' },
   { id: '4', title: 'Shop footwear under 1500 ' },
  { id: '5', title: 'REPLAY? Make em your at sale price now' },
  { id: '6', title: 'Fitness wear is starting at Tomorrow' },
   { id: '7', title: 'Lets go to buy a your wishlist at 25% discount' },
  { id: '8', title: 'Your puma shoes is moving to a out of stock' },
  { id: '9', title: 'Your black hoodie is out of stock' },
];

const Notify = () => {
  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={styles.container}>
      
    { 
    DATA.map((item)=>{
      return(
<Text key={item.id} style={styles.item}><FontAwesome5 name="bell"/> <Text  >{item.title}</Text> </Text>
      )
    })  }
       
     
    </SafeAreaView>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

 


  item: {
    
    
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
   
    
  },

  
});

export default Notify;