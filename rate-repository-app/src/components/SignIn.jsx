import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
  },
  input: {
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: -10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
  },
  buttonText: {
    color: theme.colors.appBarText,
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showUsernameError = formik.touched.username && formik.errors.username;
  const showPasswordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, showUsernameError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {showUsernameError && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, showPasswordError && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {showPasswordError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
