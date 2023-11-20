import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import color from '../constants/color';
import choices from '../Data/MockData';
import React, {useState} from 'react';

const Login = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = choice => {
    setUserChoice(choice);
    randomComputerChoice(choice);
  };

  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computerRandomChoice) => {
    if (user?.name === computerRandomChoice?.name) {
      setResult('Berabere!');
    } else if (
      (user?.name === 'Taş' && computerRandomChoice?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computerRandomChoice?.name === 'Taş') ||
      (user?.name === 'Makas' && computerRandomChoice?.name === 'Kağıt')
    ) {
      setResult('Kazandın!');
    } else {
      setResult('Kaybettin!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.backgroundColor}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.computerChoiceText}>Kullanıcın Seçimi:</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => handleUserChoice(choice)}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.buttonActive]
                  : styles.button
              }>
              <Image source={choice?.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.computerChoiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: color.white,
  },
  computerChoiceText: {
    color: color.white,
    marginVertical: 20,
    fontSize: 20,
  },
  choice: {},
  image: {
    width: 90,
    height: 90,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  resultText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.white,
    marginVertical: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  buttonActive: {
    borderWidth: 2,
  },
});
