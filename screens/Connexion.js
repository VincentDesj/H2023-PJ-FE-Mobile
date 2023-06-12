import React, { useContext } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ROUTES from '../constants/routes';
import COLORS from '../constants/colors';
import Axios from "axios";


function Connexion(props) {
  const [courriel, setCourriel] = React.useState("");
  const [motDePasse, setMotDePasse] = React.useState("");

  let userId = 0;


  const { navigation } = props;

  return(
      <SafeAreaView style={styles.main}>
        <View>
          <Text style={styles.loginContinueTxt}>PC & Associé Killométrage!</Text>
          <TextInput style={styles.input} onChangeText={setCourriel} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={setMotDePasse} />
          <Text />
          <Button style={styles.loginBtn} title='Connexion' onPress={(e) => login(e)} />
        </View>
      </SafeAreaView>
  );


  /**
   * Vérifie le login en bd et si l'adresse et le mot de passe est valide,
   * on navigue vers la page kilometres avec l'id du user connecté
   * @param {*} e 
   */
  function login(e) {
    e.preventDefault();
    console.log(courriel);
    Axios.post("http://localhost:3001" + "/login/mobile", {
      courriel: courriel,
      motDePasse: motDePasse,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        userId = response.data.id;
        navigation.navigate(ROUTES.KILOMETRAGE, {id: userId} )

      }
    });
  };

};

export default Connexion;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});