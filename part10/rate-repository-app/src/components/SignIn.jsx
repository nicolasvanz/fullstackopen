import { View, TextInput, StyleSheet } from "react-native"
import { useFormik } from "formik"

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
  }
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignIn