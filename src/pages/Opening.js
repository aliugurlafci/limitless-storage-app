import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { OpeningPartitialStyles as styles, width, theme, platform } from '../Styles';
import { LottieAnimation } from '../global/LottieAnimation';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Icon } from 'galio-framework';
import * as SecureStore from 'expo-secure-store';
import * as Api from '../global/Api';

export const Opening = () => {
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);
    const [UUID, setUUID] = useState({ uuid: "", register: false });
    const scrollRef = useRef();

    const checkUUID = async () => {
        let uid = await SecureStore.getItemAsync('secure_deviceid');

        if (uid === null || uid === undefined) {
            return false;
        }
        else {
            const id = await SecureStore.getItemAsync('secure_deviceid');
            setUUID({ uuid: JSON.parse(id), register: false });
            return true;
        }
    }

    const registerUUID = async () => {
        const check = await checkUUID();
        if (!check) {
            let uid = await Api.getUserUUID();
            setUUID({ uuid: uid, register: false });
            const r = await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uid));
            const date = new Date();
            const day = date.getDay();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const startDate = day + "/" + month + "/" + year;
            const endDate = day + "/" + (month + 1) + "/" + year;

            let registerState = await Api.createUser(UUID.uuid, "user-" + UUID.uuid, 1, startDate, endDate, 1, 1, 102400);
            if (registerState === 'YES') {
                setUUID({ uuid: JSON.parse(UUID.uuid), register: true });
            }
        }
    }

    const handleScroll = (event) => {
        const expr = platform ? Math.ceil(event.x / width) : Math.floor(event.x / width)
        switch (expr) {
            case 0: setPage(1); break;
            case 1: setPage(2); break;
            case 2: setPage(3); break;
        }
    }
    useEffect(() => {
        if (next) {
            const pointX = width * page;
            scrollRef.current.scrollTo({ x: pointX, y: 0, animated: true });
            setNext(false);
        }
    }, [next, page]);
    useEffect(() => {
        registerUUID();
        //SecureStore.deleteItemAsync('secure_deviceid');
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                pagingEnabled={true}
                horizontal={true}
                scrollEventThrottle={16}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => handleScroll(event.nativeEvent.contentOffset)}
                nestedScrollEnabled>
                <PageOne />
                <PageTwo />
                <PageThree />
            </ScrollView>
            <PageControl page={page} setNext={setNext} uuid={UUID} />
        </View>
    );
}

const PageOne = () => {
    return (
        <View style={styles.container}>
            <LottieAnimation
                autoPlay={true}
                duration={3000}
                loop={true}
                url="system"
                style={styles.lottie}
                key="splash-lotties" />
            <Text style={styles.bigText}>Dosyalarınızı depolamak, paylaşmak ve onlara erişmek için tek bir güvenli konum</Text>
            <Text style={[styles.smallText, { marginTop: 24 }]}>İstediğiniz dosyayı depolayabilirsiniz. Dosyalarınıza istediğiniz zaman, bilgisayarınızdan veya mobil cihazlarınızdan, yani istediğiniz yerden erişebilirsiniz. Dosyaların nasıl paylaşılacağını da siz belirlersiniz.</Text>
        </View>
    );
}

const PageTwo = () => {
    return (
        <View style={styles.container}>
            <LottieAnimation
                style={styles.lottie}
                url="pay"
                autoPlay={true}
                loop={true}
                key="lottie-pay"
                speed={100}
                duration={3000}
            />
            <Text style={[styles.bigText, { marginBottom: 20 }]}>Secure Payment Services</Text>
            <Text style={styles.smallText}>It doesn’t matter how big your company is, or whether you’re in retail, catering, the service sector or another industry: we can provide you and your customers with the ideal solution for cashless payments with the perfect terminal</Text>
        </View>
    );
}

const PageThree = () => {
    const data = [
        {
            id: '1',
            name: 'cloud',
            family: 'AntDesign',
            size: 35,
            bigText: '10GB Free/Up to 4GB per file',
            smallText: 'With up to 35GB of free space, you can use MediaFire to back up all your important files – even your not-so-important ones too.'
        },
        {
            id: '2',
            name: 'dashboard',
            family: 'AntDesign',
            size: 35,
            bigText: 'Unlimited bandwidth & downloads',
            smallText: 'Make sure your downloads are always available and fast. You’ll never hit a bandwidth or download limit with ad-supported downloads, no matter how popular your file is.'
        },
        {
            id: '3',
            name: 'send',
            family: 'Feather',
            size: 35,
            bigText: 'Easily share after uploading',
            smallText: 'Share folders and files immediately after they upload. MediaFire makes it easy to share through email, on your website, social media, messenger, or anywhere with a link.'
        },
        {
            id: '4',
            name: 'truck',
            family: 'Feather',
            size: 35,
            bigText: 'Multiple uploads and downloads at once',
            smallText: 'Upload hundreds or even thousands of files at once through any web browser or with our handy apps for Android, BlackBerry, Windows, iPhone, or iPad.'
        },
        {
            id: '5',
            name: 'folderopen',
            family: 'AntDesign',
            size: 35,
            bigText: 'Organize with ease',
            smallText: 'Make it easy to find your documents and files by using MediaFire’s powerful, yet easy-to-use file manager. Upload, copy, move, and control access to your files from anywhere with your desktop or phone.'
        },
        {
            id: '6',
            name: 'cloud',
            family: 'AntDesign',
            size: 35,
            bigText: '10GB Free/Up to 4GB per file',
            smallText: 'With up to 35GB of free space, you can use MediaFire to back up all your important files – even your not-so-important ones too.'
        },
    ]
    const renderListItem = ({ item }) => {
        return (
            <View style={styles.items}>
                <Icon name={item.name} family={item.family} size={item.size} color={theme.accent} />
                <Text style={styles.listText}>{item.bigText}</Text>
                <Text style={styles.smallListText}>{item.smallText}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: theme.accent, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>Top Features</Text>
                <Text style={{ color: theme.textColor, fontSize: 12, textAlign: 'center', marginTop: 6, width: width - 50 }}>LimitlessFire is more than just sharing and storage.
                    Take a look at the top features to make your life simple and easy.</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderListItem}
                numColumns={2}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: width }} />
        </View>
    );
}

const PageControl = ({ page, setNext, uuid }) => {
    return (
        <View style={styles.absolute}>
            <View style={styles.pageControl}>
                <Text style={[styles.controlDots, { opacity: page >= 1 ? 1 : 0.25 }]}>.</Text>
                <Text style={[styles.controlDots, { opacity: page >= 2 ? 1 : 0.25 }]}>.</Text>
                <Text style={[styles.controlDots, { opacity: page === 3 ? 1 : 0.25 }]}>.</Text>
            </View>
            <View style={styles.nextContainer}>
                <Button
                    containerStyle={styles.nextButton}
                    buttonStyle={styles.nextButton}
                    titleStyle={styles.nextButtonTitle}
                    iconContainerStyle={styles.nextButtonIcon}
                    title={page === 3 ? "Finish" : "Next"}
                    raised
                    useForeground
                    onPress={() => page === 3 ? Actions.home({ uuid: uuid }) : setNext(true)}
                    key="next-button" />
            </View>
        </View>
    );
}