import React, {Fragment} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
  Text,
  Button,
  Switch,
} from 'react-native-paper';
import ErrorMessage from '../../../components/atoms/ErrorMessage';
import FormInput from '../../../components/atoms/FormInput';
import * as yup from 'yup';
import {Formik} from 'formik';
import {BURNT_SIENNA} from '../../../styles/colours';

const initialFormValues = {
  label: '',
  address: '',
  unitNumber: '',
  postalCode: '',
  default: false,
  city: '',
  country: '',
};

const newAddressSchema = yup.object().shape({
  label: yup.string().required('Address label is required'),
  address: yup.string().required('Address line is required'),
  unitNumber: yup.string(),
  postalCode: yup.string().required('Postal code is required'),
  default: yup.boolean().default(false),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
});

const NewAddressScreen = () => {
  const addAddress = (addressDetails) => {
    console.log("Address details:", addressDetails);
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <Formik
            initialValues={initialFormValues}
            onSubmit={values => addAddress(values)}
            validationSchema={newAddressSchema}>
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
              errors,
              values,
            }) => (
              <Fragment>
                <View style={styles.inputSection}>
                  <FormInput
                    name="label"
                    label="Label"
                    onChangeText={handleChange('label')}
                    autoCorrect={false}
                    value={values.label}
                  />
                  <ErrorMessage error={errors.label} />
                </View>
                <View style={styles.inputSection}>
                  <FormInput
                    name="address"
                    label="Address"
                    onChangeText={handleChange('address')}
                    autoCorrect={false}
                    value={values.address}
                  />
                  <ErrorMessage error={errors.address} />
                </View>
                <View style={styles.inputSection}>
                  <FormInput
                    name="unitNumber"
                    label="Unit Number"
                    onChangeText={handleChange('unitNumber')}
                    value={values.unitNumber}
                  />
                  <ErrorMessage error={errors.unitNumber} />
                </View>
                <View style={styles.inputSection}>
                  <FormInput
                    name="postalCode"
                    label="Postal Code"
                    onChangeText={handleChange('postalCode')}
                    value={values.postalCode}
                  />
                  <ErrorMessage error={errors.postalCode} />
                </View>
                <View style={styles.inputSection}>
                  <FormInput
                    name="city"
                    label="City"
                    onChangeText={handleChange('city')}
                    value={values.city}
                    autoCorrect={false}
                  />
                  <ErrorMessage error={errors.city} />
                </View>
                <View style={styles.inputSection}>
                  <FormInput
                    name="country"
                    label="Country"
                    onChangeText={handleChange('country')}
                    value={values.country}
                    autoCorrect={false}
                  />
                  <ErrorMessage error={errors.country} />
                </View>
                <View style={styles.toggleSection}>
                  <Text>Set as default address</Text>
                  <Switch
                    name="default"
                    value={values.default}
                    onValueChange={value =>
                      setFieldValue('default', value, false)
                    }
                  />
                </View>
                <View style={styles.buttonSection}>
                  <Button onPress={resetForm} mode="outlined" color="grey">
                    Clear
                  </Button>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    color={BURNT_SIENNA}
                    dark>
                    Submit
                  </Button>
                </View>
              </Fragment>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default NewAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  inputSection: {
    marginVertical: 10,
  },
  toggleSection: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSection: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
