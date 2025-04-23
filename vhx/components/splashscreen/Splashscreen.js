import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
    const navigation = useNavigation()
useEffect(() => {
// Simulate a delay of 3 seconds
const delay = setTimeout(() => {
// Navigate to the home screen
navigation.navigate('tab');
}, 3000);

// Clear the timeout on component unmount
return () => clearTimeout(delay);
}, [navigator]);

return (
<View style={styles.container}>
<Image
style={styles.tinyLogo}
source={require('../../assets/kp.jpg')}
/>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor:"white"
},
tinyLogo: {
height:200,
objectFit:'contain',
fontWeight: 'bold',
},
});

export default SplashScreen;