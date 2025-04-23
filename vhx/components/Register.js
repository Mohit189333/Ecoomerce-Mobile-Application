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

const RegisterPage = () => {
  const { loader, setLoader } = useContext(MyContext);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik
        initialValues={{ name: "", email: "", mobile: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("name is required")
            .matches(/^([^0-9]*)$/, "Don't allow Numeric Value"),
          email: Yup.string()
            .required("Email is required")
            .email("Enter a valid email"),
          mobile: Yup.string()
            .required("Mobile number is required")
            .matches(/^[0-9]{10}$/, "Mobile number is not valid"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(12, "Password must be at most 12 characters"),
        })}
        onSubmit={async (values, { resetForm }) => {
          setLoader(true);
          try {
            const response = await fetch("https://vhx.vercel.app/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
              Alert.alert("Success", data.message);
              resetForm();
              navigation.navigate("login");
            } else {
              Alert.alert("Error", data.error);
            }
          } catch (error) {
            Alert.alert("Error", error.message);
          } finally {
            setLoader(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="mobile"
              onChangeText={handleChange("mobile")}
              onBlur={handleBlur("mobile")}
              value={values.mobile}
            />
            {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {loader ? "wait.." : "Register"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});

export default RegisterPage;
