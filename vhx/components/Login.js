import React, { useContext } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "./MyContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    loader,
    setLoader,
    setToken,
    setCartItems,
    setWishItems,
    setUserdata,
    setOrder,
  } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          setLoader(true);
          const response = await fetch("https://vhx.vercel.app/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (data.success) {
            resetForm();
            navigation.navigate("tab");
            await AsyncStorage.setItem("token", data.data);
            setToken(data.data);
            setCartItems(data.cartInfo);
            setWishItems(data.wishInfo);
            setUserdata(data.accountInfo);
            setOrder(data.orderInfo);
          } else {
            Alert.alert(data.error);
          }
          setLoader(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                k
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {loader ? "wait..." : "Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text style={styles.link}>Not signed up? Register here</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: 750,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  link: {
    marginTop: 30,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
