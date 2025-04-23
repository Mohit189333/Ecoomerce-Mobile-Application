import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React, { useContext } from 'react'
import { MyContext } from './MyContextProvider';



const Loader = () => {

    const{loader} = useContext(MyContext)
  return (

    <>
    {
        loader &&
        <Modal
        transparent={true}
        animationType="none"
        visible={loader}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        </View>
      </Modal>
    }
    </>
  )
}

export default Loader


const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  