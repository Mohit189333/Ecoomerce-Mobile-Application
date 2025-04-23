import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyContext } from './MyContextProvider';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Payment = () => {
  const navigation = useNavigation();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState('');
  const{setLoader,token,setOrder,setCartItems} = useContext(MyContext)


  const handlePayment = async () => {
    if (inputCaptcha === captcha) {
      setLoader(true);
  
     
      const currentDate = new Date().toISOString();
  
      try {
        const response = await fetch('https://vhx.vercel.app/add-to-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orderDate: currentDate, 
          })
        });
  
        const data = await response.json();
  
        if (data.success) {
          setOrder(data.orderInfo);
          setCartItems(data.cartInfo);
          navigation.navigate('confirmation')
        
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoader(false);
      }
    } else {
      Alert.alert('Error', 'Invalid CAPTCHA. Please try again.');
      setCaptcha(generateCaptcha());
      setInputCaptcha('');
    }
  };
  

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInputCaptcha(''); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Cash on Delivery</Text>
      <View style={styles.captchaContainer}>
        <Text style={styles.captchaText}>{captcha}</Text>
        <TouchableOpacity onPress={refreshCaptcha} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>↻</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter CAPTCHA"
        value={inputCaptcha}
        onChangeText={setInputCaptcha}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: '#e0e0e0', 
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
  },
  refreshButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#4287f5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4287f5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;
