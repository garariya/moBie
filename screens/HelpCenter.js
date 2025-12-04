import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';
import emailjs from '@emailjs/react-native';

const HelpCenter = () => {
  const [sentence, setSentence] = useState('');

  const handleClick = () => {

    if (!sentence.trim()) {
      Alert.alert("Error", "Please enter your issue before submitting.");
      return;
    }

    emailjs
      .send(
        "service_5mauzjb",           // your service ID
        "template_fn3xq13",          // your template ID
        { message: sentence },       // the data sent to EmailJS
        { publicKey: "INPAcIjYp1Aei6bwI" } // correct format for React Native
      )
      .then(() => {
        Alert.alert("Success", "Your message has been sent!");
        setSentence("");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "Something went wrong");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Help Center</Text>

      <TextInput
        placeholder="What’s the issue?"
        value={sentence}
        onChangeText={setSentence}
        style={styles.input}
        multiline
      />

      <Button title="Submit" onPress={handleClick} />
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    height: 100,
  },
});
