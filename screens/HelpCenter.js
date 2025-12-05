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

    const templateParams = {
      user_message: sentence,
    };

   emailjs.send(
  "service_5mauzjb",
  "template_fn3xq13",
  templateParams,
  { publicKey: "INPAcIjYp1Aei6bwI" }
)
.then(() => {
  Alert.alert("Success", "Your message has been sent!");
  setSentence("");
})
.catch((err) => {
  console.log(err);
  Alert.alert("Error", "Something went wrong.");
});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Help Center</Text>

      <TextInput
        placeholder="What’s the issue?"
        placeholderTextColor="#999"
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
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    height: 120,
    textAlignVertical: 'top',
  },
});
