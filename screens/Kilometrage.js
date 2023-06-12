import { Button, Text, TextInput, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ROUTES from '../constants/routes';
import React, { useContext } from 'react';
import Axios from "axios";

function Kilometrage(props) {
  const [mesKilos, setMesKilos] = React.useState([]);
  const { navigation, route } = props;


  React.useEffect(() => {
    getMesKilos();
  }, []);

  return (
    <View>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <Button title='Ajouter' onPress={() => navigation.navigate(ROUTES.AJOUTKM, { id: id })} />
        <Button title='Deconnection' onPress={() => navigation.navigate(ROUTES.CONNEXION)} />
        <Button title='Rafraichir' onPress={() => getMesKilos()} />
      </div>
      {console.log(mesKilos)}

      <SafeAreaView style={styles.container}>
        <Text style={{ display: 'flex', justifyContent: 'center' }}><h2>Mes kilométrages:</h2></Text>
        <FlatList
          data={mesKilos}
          renderItem={({ item }) => <Item nom={item.Nom} date={item.Date} distance={item.Distance} duree={item.Durée} commentaire={item.Commentaire} id={item.Id} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </View>
  );

  /**
   * Affiche les éléments recu en parametre
   * @param {*} param0  prend en paramètre un nom de compagnie, une date de déplacement,
   *  une distance, une durée, un commentaire sur le déplacement et l'id de l'élément
   * @returns retourne un élément qui affiche les informations du kilométrage
   */
  function Item({ nom, date, distance, duree, commentaire, id }) {
    return (
      <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, borderTopWidth: 1 , borderColor: 'lightgray', paddingVertical: 5 }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: 20}}>
          <Text>Nom de la compagnie : {nom}</Text>
          <Text>Date du déplacement : {date}</Text>
          <Text>Distance parcourrue : {distance} km</Text>
          <Text>Temps du déplacement : {duree}</Text>
          <Text style={{width: '20rem'}}>Commentaires : {commentaire}</Text>
        </div>
        <div style={{ width: '50%' }}>
          <Button title='Supprimer' onPress={(e) => supprimerKilo(e, id)} />
        </div>
      </View>
    );
  }

  /**
   * Supprime le kilometre avec l'id en parametre
   * @param {*} e 
   * @param {*} idKilo id du kilometre
   */
  function supprimerKilo(e, idKilo) {
    Axios.delete("http://localhost:3001" + "/killometrage", {
      data: {
        idUtilisateur: id,
        idKillometrage: idKilo
      }
    }).then((response) => {
      if (response.data.Compagnie) {
        console.log(response.data.Compagnie);
        setMesKilos([]);
        getMesKilos()
      } else {
      }
    });
  }

  /**
   * Appel de l'api pour ajouter tous les kilometres pour l'utilisateur connecté dans une liste
   */
  function getMesKilos() {
    Axios.get("http://localhost:3001" + "/killometrage", {
      params: {
        id: id
      }
    }).then((response) => {
      if (response.data.Killometrage) {
        setMesKilos(response.data.Killometrage);
      } else {
        console.log(response.data.message);
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  div: {
    //flex: 1, width: 100,
  },
  scrollView: {
    //flex: 1, backgroundColor: '#eeeeee',
  },
  list: {
    //alignItems: 'flex-start', justifyContent: 'flex-start', width: 100, flex: 1
  },
  enappdWrapper: {
    // position: 'absolute',  bottom: 0
  },
  enappdIcon: {
    //width: 100, height: 40
  },
  item: {
    // flexDirection: 'row', alignItems: 'flex-center', paddingHorizontal: 20, paddingTop: 20
  },
  thumbnail: {
    // width: 100, height: 60, borderWidth: 1, borderColor: '#aaa'
  },
  itemText: {
    // paddingTop: 5, paddingLeft: 10, fontSize: 18
  }
});

export default Kilometrage;