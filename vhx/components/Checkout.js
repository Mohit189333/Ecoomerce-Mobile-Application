import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MyContext } from "./MyContextProvider";
import { useRoute, useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { TotalValue } = route.params || {};
  const { setLoader, token, setShipping, shipping } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://vhx.vercel.app/get-user-address",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setShipping(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setShipping]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Shipping details...</Text>
      </View>
    );
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]{6}$/, "Invalid pincode"),
    landmark: Yup.string().required("Landmark is required"),
    city: Yup.string().required("City is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://vhx.vercel.app/save-shipping-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (data.success) {
        Alert.alert("Success", data.message);
        setShipping(data.shippingInfo);

        TotalValue ? navigation.navigate("payment") : navigation.goBack();

        resetForm();
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Please try again");
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shipping Details</Text>
      {TotalValue && (
        <Text style={styles.totalValue}>Total Value: ₹{TotalValue}</Text>
      )}
      <Formik
        initialValues={{
          name: shipping?.name || "",
          mobile: shipping?.mobile || "",
          email: shipping?.email || "",
          address: shipping?.address || "",
          state: shipping?.state || "",
          pincode: shipping?.pincode || "",
          landmark: shipping?.landmark || "",
          city: shipping?.city || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                value={values.mobile}
                keyboardType="numeric"
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.error}>{errors.mobile}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
              />
              {touched.address && errors.address && (
                <Text style={styles.error}>{errors.address}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("state")}
                onBlur={handleBlur("state")}
                value={values.state}
              />
              {touched.state && errors.state && (
                <Text style={styles.error}>{errors.state}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("pincode")}
                onBlur={handleBlur("pincode")}
                value={values.pincode}
                keyboardType="numeric"
              />
              {touched.pincode && errors.pincode && (
                <Text style={styles.error}>{errors.pincode}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Landmark</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("landmark")}
                onBlur={handleBlur("landmark")}
                value={values.landmark}
              />
              {touched.landmark && errors.landmark && (
                <Text style={styles.error}>{errors.landmark}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              {touched.city && errors.city && (
                <Text style={styles.error}>{errors.city}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  form: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#4287f5",
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
