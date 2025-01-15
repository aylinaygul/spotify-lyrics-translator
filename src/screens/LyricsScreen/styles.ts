import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        gap: 10,
    },
    lyricsBox: {
        backgroundColor: 'lightgrey',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 20 },
    closeButton: {
        backgroundColor: 'navy',
        width: '30%',
        padding: 5,
        borderRadius: 5,
    },
    closeButtonText: { color: 'white', textAlign: 'center', fontSize: 10 },


});

export default styles;