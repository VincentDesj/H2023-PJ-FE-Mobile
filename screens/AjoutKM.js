import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ROUTES from '../constants/routes';
import COLORS from '../constants/colors';
import Axios from "axios";


function AjoutKM(props) {
    const [lieuDepart, setLieuDepart] = React.useState(0);
    const [lieuArrive, setLieuArrive] = React.useState("");
    const [heureDepart, setHeureDepart] = React.useState("");
    const [heureArrive, setHeureArrive] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [distance, setDistance] = React.useState("");
    const [selected, setSelected] = React.useState("");
    const [compagnies, setCompagnies] = React.useState([]);
    let idSelected = 0;

    const { navigation, route } = props;

    const id = route.params.id;

    React.useEffect(() => {
        getCompagnies();
    }, []);


    return (
        <SafeAreaView style={styles.main}>
            <View>
                <Text><h2>Nouvelle distance parcourue</h2></Text>
                <TextInput style={styles.input} placeholder="Lieu de départ" onChangeText={setLieuDepart} />
                <TextInput style={styles.input} placeholder="Lieu d'arrivé" onChangeText={setLieuArrive} />
                <TextInput style={styles.input} placeholder="Description du déplacement" onChangeText={setDescription} />
                <Text>{"Nom de la compagnie"}</Text>
                <select
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                >
                    {compagnies.map((value) => (
                        <option value={value.nom} key={value.id}>
                            {value.nom}
                        </option>
                    ))}
                </select>
                <TextInput style={styles.input} placeholder="Nombre de kilomètres parcourus" onChangeText={setDistance} />
                <Text />
                <Button style={styles.loginBtn} title='Départ' onPress={() => startTimer()} />
                <Text />
                <Button style={styles.loginBtn} title='Arrivée' onPress={() => stopTimer()} />
                <Text />
                <Button style={styles.loginBtn} title='Terminer' onPress={(e) => enregistrerBD(e)} />
                <Text />
                <Text>Heure de départ : {heureDepart}</Text>
                <Text>Heure d'arrivée : {heureArrive}</Text>
                <Text />
            </View>
        </SafeAreaView>
    );

    /**
     * Ajoute tous les kilomètres de l'utilisateur connecté dans le state compagnies.
     */
    function getCompagnies() {
        Axios.get("http://localhost:3001" + "/killometrage/compagnie", {
            params: {
                id: id
            }
        }).then((response) => {
            if (response.data) {
                setCompagnies(response.data.Compagnie);
            } else {
                console.log(response.data.message);
            }
        });

    }

    /** Prend le temps de départ, le met en bd et le met dans le props pour un calcule du temps plus tard*/
    function startTimer(e) {
        var date = new Date();
        var annee = date.getFullYear();
        var mois = date.getMonth() + 1;
        var jour = date.getDate();
        var heure = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if (mois < 10) {
            mois = "0" + mois;
        }
        if (jour < 10) {
            jour = "0" + jour;
        }
        if (heure < 10) {
            heure = "0" + heure;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        setHeureDepart(annee + "-" + mois + "-" + jour + " " + heure + ":" + minutes + ":" + seconds);
    }

    /** Prend le temps d'arrive, le met en bd et le met dans le props pour un calcule du temps plus tard*/
    function stopTimer() {
        var date = new Date();
        var annee = date.getFullYear();
        var mois = date.getMonth() + 1;
        var jour = date.getDate();
        var heure = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if (mois < 10) {
            mois = "0" + mois;
        }
        if (jour < 10) {
            jour = "0" + jour;
        }
        if (heure < 10) {
            heure = "0" + heure;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        setHeureArrive(annee + "-" + mois + "-" + jour + " " + heure + ":" + minutes + ":" + seconds);
    }

    /**
     * Ajoute l'objet sélectionné de la liste des compagnies dans le state du idSelected.
     */
    function getSelectedCompagnie() {
        compagnies.forEach(element => {
            if (element.nom === selected) {
                idSelected = element.id;
            }
        });
    }

    /**Enregistre l'entrée du kilométrage en BD */
    function enregistrerBD(e) {

        getSelectedCompagnie();

        e.preventDefault();

        Axios.post("http://localhost:3001" + "/killometrage", {
            distance: distance,
            lieuxDepart: lieuDepart,
            lieuxArrive: lieuArrive,
            tempsDepart: heureDepart,
            tempsArrive: heureArrive,
            commentaire: description,
            idCompagnie: idSelected,
            id: id
        }).then((response) => {
            if (response.data.Killometrage) {
                navigation.navigate(ROUTES.KILOMETRAGE, { id: id });
            } else {
                console.log(response.data.message);
            }

        });
    }

};


export default AjoutKM;


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