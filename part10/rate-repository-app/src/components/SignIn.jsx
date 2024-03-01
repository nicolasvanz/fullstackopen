import { View, TextInput, StyleSheet } from "react-native"
import { useFormik } from "formik"
import * as yup from "yup"

import Text from "./Text"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import theme from "../theme"

const initialValues = {
  username: "",
  password: ""
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
    paddingLeft: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.fontSizes.subheading
  },
  errorTextStyle: {
    color: theme.colors.error
  }
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, 'Username should have at least 4 characters')
      .required("Username is required"),
    password: yup
      .string()
      .required("Password is required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: formik.touched.username && formik.errors.username ? theme.colors.error : styles.textInput.borderColor,
        }}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorTextStyle}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: formik.touched.password && formik.errors.password ? theme.colors.error : styles.textInput.borderColor
        }}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorTextStyle}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignIn