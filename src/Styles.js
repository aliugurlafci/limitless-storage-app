import { StyleSheet, Dimensions, Platform } from 'react-native';

export const { width, height } = Dimensions.get("window");

export const platform = Platform.OS === "android" ? true : false;

export const theme = {
    accent: '#ff5722',
    textColor: '#ffffff',
    backgroundColor: '#363640',
    borderColor: '#515159',
    black: '#000000',
    white: '#ffffff',
    error: 'red',
    refreshCircle: '#000000',
    refreshText: '#000000',
    folderOutline: '#000000',
    shadowColor: '#888888',
    folderOutlineSelected: '#ffffff'
}

export const SplashStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottie: {
        width: width,
        height: height * 0.5,
    }
});
export const FileDownloaderStyles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: theme.backgroundColor,
        paddingTop: 20,
    },
    navbar: {
        width: width,
        height: 50,
        backgroundColor: theme.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: -52
    },
    navText: {
        textAlign: 'center',
        color: theme.textColor
    },
    row: {
        flexDirection: 'row'
    },
    leftMenu: {
        width: 50,
        height: platform ? height - 50 : height - 72,
        backgroundColor: theme.backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    actionBar: {
        zIndex: 20,
        width: 35,
        height: 40,
        backgroundColor: theme.backgroundColor,
        borderRadius: 50,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        top: (height - 95) / 2
    },
    menuItems: {
        width: 50,
        height: height / 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.4
    },
    menuText: {
        textAlign: 'center',
        fontSize: 9,
        paddingTop: 8,
        color: theme.textColor
    },
    body: {
        width: width,
        height: height - 12,
        backgroundColor: theme.white
    },
    bodyPathSection: {
        width: width,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.08)'
    },
    pathSectionText: {
        fontSize: 12,
        marginLeft: 10,
        opacity: 1
    },
    bodyListSection: {
        width: width,
        height: height,
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: 'flex-start',
    },
    fileRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    floatingButtonContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        left: (width - 100) / 2,
        alignItems: 'center'
    },
    floatingButton: {
        width: 50,
        height: 50,
        textAlign: 'center',
        backgroundColor: theme.accent
    },
    folderListItem: {
        height: 70,
        alignItems: 'center',
        marginTop: 5,
    },
    folderListed: {
        width: width - 50,
        height: 50,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listSelected: {
        width: width - 16,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: theme.borderColor,
        borderRadius: 8,
    },
    oriented: {
        width: width - 50,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
        justifyContent: 'space-between'
    },
    listText: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    selectedListItem: {
        backgroundColor: theme.accent,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    folderDescriptionText: {
        fontSize: 10,
        textAlign: 'center'
    },
});
export const OpeningPartitialStyles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: theme.backgroundColor,
        alignItems: 'center',
    },
    bigText: {
        color: theme.textColor,
        fontSize: 18,
        textAlign: 'center',
        width: width - 50,
        fontWeight: 'bold'
    },
    smallText: {
        color: theme.textColor,
        fontSize: 14,
        textAlign: 'center',
        width: width - 50
    },
    listText: {
        color: theme.textColor,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 6,
        fontWeight: 'bold',
        marginTop: 5
    },
    smallListText: {
        color: theme.textColor,
        fontSize: 10,
        textAlign: 'center',
    },
    lottie: {
        width: width,
        height: height * 0.5,
        backgroundColor: 'transparent'
    },
    absolute: {
        position: 'absolute',
        bottom: platform ? 10 : 10,
        width: width,
        height: 80,
        flexDirection: 'row'
    },
    pageControl: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
    },
    controlDots: {
        fontSize: platform ? 50 : 70,
        padding: 5,
        color: theme.accent,
        marginRight: -4,
    },
    nextContainer: {
        width: width - 120,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    nextButton: {
        borderRadius: 100,
        width: 55,
        height: 55,
        backgroundColor: theme.accent,
    },
    nextButtonTitle: {
        textAlign: 'center',
        fontSize: 13
    },
    nextButtonIcon: {
        fontSize: 14
    },
    header: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: platform ? 50 : 40,
        marginBottom: platform ? 25 : 15
    },
    items: {
        width: (width - 40) / 2,
        alignItems: 'center',
        margin: 6,
        marginBottom: platform ? 24 : 0
    },
});
export const RenameModalStyles = StyleSheet.create({
    overlay: {
        width: width - 80,
        marginLeft: 65,
        marginRight: 15
    },
    headerView: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        paddingBottom: 10,
        borderColor: theme.borderColor
    },
    headerViewText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    overlayBody: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        borderWidth: 0,
        borderColor: 'transparent',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    button: {
        width: width * 0.5,
        height: 40,
        backgroundColor: theme.accent,
        borderRadius: 40
    }
});
export const PopoverStyles = StyleSheet.create({
    outside: {
        width: width,
        height: height,
        position: 'absolute',
        zIndex: 11
    },
    body: {
        width: width - 50,
        minHeight: 50,
        backgroundColor: theme.backgroundColor,
        position: 'absolute',
        right: 25,
        zIndex: 15,
        opacity: 1,
        borderRadius: 8,
        flexDirection: 'row'
    },
    top: {
        width: width - 110,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    topText: {
        color: theme.textColor,
        fontSize: 14,
        margin: 12
    },
    bottom: {
        width: 60,
        backgroundColor: theme.accent,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const MiniFileModal = StyleSheet.create({
    overlay: {
        width: width * 0.9,
        height: height * 0.6,
        margin: 0,
        padding: 0,
        borderRadius: 12
    },
    container: {
        width: width * 0.9,
        height: height * 0.6,
        alignItems: 'center'
    },
    header: {
        width: width * 0.9,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    body: {
        width: width * 0.87,
        height: height * 0.40,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: theme.white,
    },
    flatList: {
        alignItems: 'flex-start',
        width: width * 0.87,
        justifyContent: 'flex-start',
    },
    bottom: {
        width: width * 0.87,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        width: width * 0.30,
        borderRadius: 100,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    emptyView: {
        width: width * 0.87,
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBold: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});
export const EntryRejectedStyles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: theme.backgroundColor,
        alignItems: 'center',
    },
    top: {
        width: width - 25,
        height: height * 0.25,
    },
    bottom: {
        width: width - 25,
        height: height * 0.70,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    visualPassword: {
        width: width / 2,
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
    },
    row: {
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dots: {
        fontSize: 80,
        marginRight: 5,
        marginBottom: 12,
        color: theme.accent
    },
    touchable: {
        width: 70,
        height: 70,
        alignItems: 'center',
        borderRadius: 100
    },
    numberPad: {
        width: width,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -height * 0.1
    },
    numbers: {
        width: width / 3,
        height: (width - 25) / 4,
        alignItems: 'center',
    },
    numberText: {
        fontSize: 26,
        color: theme.textColor
    },
    text: {
        color: theme.textColor,
        fontSize: 16,
        marginBottom: -40,
        textAlign: 'center',
        width: width - 100
    },
    shadow: {
        backgroundColor: theme.backgroundColor,
        borderRadius: 12,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
});