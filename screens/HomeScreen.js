import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useAuth} from '../context/AppContext';

import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {
  Button,
  Flex,
  Surface,
  TextInput,
  Text,
  Stack,
  FAB,
  AppBar,
} from '@react-native-material/core';
import {Dimensions, ScrollView, View} from 'react-native';

// # App Open
// AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

// # Interstitial
// InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

// # Rewarded
// RewardedAd.createForAdRequest(TestIds.REWARDED);

// # Banners

const HomeScreen = ({navigation}) => {
  const [balance, setBalance] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [govCharges, setGovCharges] = useState(0);
  const [tellCharges, setTellCharges] = useState(0);
  const [amount, onChangeAmount] = useState(0);
  const [allCharges, setAllCharges] = useState([]);

  const ref = firestore().collection('Users');
  const chargeRef = firestore().collection('charges');

  const {user, AnonymouslyAuth, loading} = useAuth();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    chargeRef.onSnapshot(querySnapshot => {
      try {
        const list = [];
        querySnapshot.forEach(doc => {
          const {govCharges, telliCharges, constAmount} = doc.data();
          list.push({
            id: doc.id,
            govCharges,
            telliCharges,
            constAmount,
          });
        });
        // console.log(list);
        setAllCharges(list);
      } catch (error) {
        console.log(`NULL ${error}`);
      }
    });

    // const unsubscribe = interstitial.addAdEventListener(
    //   AdEventType.LOADED,
    //   () => {
    //     setLoaded(true);
    //   },
    // );

    // // Start loading the interstitial straight away
    // interstitial.load();

    // // Unsubscribe from events on unmount
    // return unsubscribe;
  }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  // AnonymouslyAuth is Here
  AnonymouslyAuth();

  const total = () => {
    var regOnlyNum = /^\d+$/;
    if (regOnlyNum.test(amount)) {
      const tellC = allCharges.map(charge => charge.telliCharges);
      const govC = allCharges.map(charge => charge.govCharges);
      const CONST_AMOUNT = allCharges.map(charge => charge.constAmount);

      // console.log(`#########${tellC}`)
      // console.log(`#########${govC}`)

      //  const CONST_AMOUNT = 100;
      if (allCharges.length == 0) {
        const govCh = 0.015;
        const tellCh = 0.0075;
        const CONST_AMOUNT = 100;
        if (amount > CONST_AMOUNT) {
          // const GOV_CHARGES = 0.015 * amount;
          const GOV_CHARGES = govCh * amount;
          setGovCharges(GOV_CHARGES);

          // const TELLCO_CHARGES = 0.0075 * amount;
          const TELLCO_CHARGES = tellCh * amount;
          setTellCharges(TELLCO_CHARGES);

          const TOTAL_CHARGES = TELLCO_CHARGES + GOV_CHARGES;
          setTotalCharges(TOTAL_CHARGES);

          const BALANCE = amount - TOTAL_CHARGES;
          setBalance(BALANCE);

          addRecord(
            GOV_CHARGES.toFixed(2),
            TELLCO_CHARGES.toFixed(2),
            TOTAL_CHARGES.toFixed(2),
            BALANCE.toFixed(2),
          );
          onChangeAmount('');
        } else if (amount <= CONST_AMOUNT) {
          const GOV_CHARGES = 0 * amount;
          setGovCharges(`${GOV_CHARGES} => 😎`);

          const TELLCO_CHARGES = tellCh * amount;
          setTellCharges(TELLCO_CHARGES);

          const TOTAL_CHARGES = TELLCO_CHARGES + GOV_CHARGES;
          setTotalCharges(TOTAL_CHARGES);

          const BALANCE = amount - TOTAL_CHARGES;
          setBalance(BALANCE.toFixed(2));

          addRecord(
            GOV_CHARGES.toFixed(2),
            TELLCO_CHARGES.toFixed(2),
            TOTAL_CHARGES.toFixed(2),
            BALANCE.toFixed(2),
          );
          onChangeAmount('');
        } else if (amount === 0 || amount === "") {
          setGovCharges('Enter Amount  😎');
          setTellCharges('Enter Amount   😎');
          setTotalCharges('Enter Amount   😎');
          setBalance('ʕ•́ᴥ•̀ʔ 😃');
          setTotalCharges('ʕ•́ᴥ•̀ʔっ 😜');
          onChangeAmount('');
        } else {
          setGovCharges('No CHARGES  😎');
          setTellCharges('No CHARGES  😎');
          setTotalCharges('No CHARGES  😎');
          setBalance('ʕ•́ᴥ•̀ʔ 😃');
          setTotalCharges('ʕ•́ᴥ•̀ʔっ 😜');
          onChangeAmount('');
        }
      } else {
        if (amount > CONST_AMOUNT) {
          // const GOV_CHARGES = 0.015 * amount;
          var GOV_CHARGES = govC * amount;
          setGovCharges(GOV_CHARGES);

          // const TELLCO_CHARGES = 0.0075 * amount;
          var TELLCO_CHARGES = tellC * amount;
          setTellCharges(TELLCO_CHARGES);

          var TOTAL_CHARGES = TELLCO_CHARGES + GOV_CHARGES;
          setTotalCharges(TOTAL_CHARGES);

          var BALANCE = amount - TOTAL_CHARGES;
          setBalance(BALANCE);

          addRecord(
            GOV_CHARGES.toFixed(2),
            TELLCO_CHARGES.toFixed(2),
            TOTAL_CHARGES.toFixed(2),
            BALANCE.toFixed(2),
          );
          onChangeAmount('');
        } else if (amount <= CONST_AMOUNT) {
          const GOV_CHARGES = 0 * amount;
          setGovCharges(`${GOV_CHARGES} => 😎`);

          const TELLCO_CHARGES = tellC * amount;
          setTellCharges(TELLCO_CHARGES);

          const TOTAL_CHARGES = TELLCO_CHARGES + GOV_CHARGES;
          setTotalCharges(TOTAL_CHARGES);

          const BALANCE = amount - TOTAL_CHARGES;
          setBalance(BALANCE);

          addRecord(
            GOV_CHARGES.toFixed(2),
            TELLCO_CHARGES.toFixed(2),
            TOTAL_CHARGES.toFixed(2),
            BALANCE.toFixed(2),
          );
          onChangeAmount('');
        } else if (amount === 0 ||amount === "" ) {
          setGovCharges('Enter Amount  😎');
          setTellCharges('Enter Amount   😎');
          setTotalCharges('Enter Amount   😎');
          setBalance('ʕ•́ᴥ•̀ʔ 😃');
          setTotalCharges('ʕ•́ᴥ•̀ʔっ 😜');
          onChangeAmount('');
        } else {
          setGovCharges('No CHARGES  😎');
          setTellCharges('No CHARGES  😎');
          setTotalCharges('No CHARGES  😎');
          setBalance('ʕ•́ᴥ•̀ʔ 😃');
          setTotalCharges('ʕ•́ᴥ•̀ʔっ 😜');
          // ʕ•́ᴥ•̀ʔっ♡  ʕʘ̅͜ʘ̅ʔ
          onChangeAmount('');
        }
      }
    } else {
      setGovCharges('Enter Only Real Numbers 😎');
      setTellCharges('Enter Only Real Numbers 😎');
      setTotalCharges('Enter Only Real Numbers 😎');
      setBalance('ʕ•́ᴥ•̀ʔ 😃');
      setTotalCharges('ʕ•́ᴥ•̀ʔっ 😜');
      onChangeAmount('');
    }
  };

  const addRecord = (govCharges, tellCharges, totalCharges, balance) => {
    try {
      ref
        .add({
          userId: user.uid,
          yourAmount: amount,
          govCharges: govCharges,
          tellcomCharges: tellCharges,
          totalCharges: totalCharges,
          yourBalance: balance,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {});
    } catch (error) {
      console.log;
    }
  };

  // const [test, setTest] = useState('NetWork')
  // if(loading === false){
  //   return (
  //     <Text>LLLLLLIIIIII</Text>
  //   )
  // }

  return (
    <>
      {/* <AppBar
    title="E-levy Calculator"
    /> */}
      <ScrollView>
        <TextInput
          variant="outlined"
          label="Amount"
          style={{margin: 16}}
          onChangeText={v => onChangeAmount(v)}
          value={amount}
          placeholder="enter your amount here"
          keyboardType="numeric"
        />

        <Flex
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 180,
              height: 70,
              marginRight: 5,
            }}>
            <Text variant="subtitle2" style={{margin: 5}}>
              Government Charges:{' '}
            </Text>
          </Surface>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 150,
              height: 70,
            }}>
            <Text style={{margin: 5}}> GH {govCharges}</Text>
          </Surface>
        </Flex>

        <Flex
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 180,
              height: 70,
              marginRight: 5,
            }}>
            <Text variant="subtitle2" style={{margin: 5}}>
              Telecommunication Charges:{' '}
            </Text>
          </Surface>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 150,
              height: 70,
            }}>
            <Text style={{margin: 5}}> GH {tellCharges}</Text>
          </Surface>
        </Flex>

        <Flex
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 180,
              height: 70,
              marginRight: 5,
            }}>
            <Text variant="subtitle2" style={{margin: 5}}>
              Total Charges:{' '}
            </Text>
          </Surface>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 150,
              height: 70,
            }}>
            <Text style={{margin: 5}}> GH {totalCharges}</Text>
          </Surface>
        </Flex>

        <Flex
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 180,
              height: 70,
              marginRight: 5,
            }}>
            <Text variant="subtitle2" style={{margin: 5}}>
              Your balance:{' '}
            </Text>
          </Surface>
          <Surface
            elevation={6}
            category="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 150,
              height: 70,
            }}>
            <Text style={{margin: 5}}> GH {balance}</Text>
          </Surface>
        </Flex>

        <Flex fill style={{flexDirection: 'row', marginTop: 50}}>
          <Stack style={{marginRight: 15, marginLeft: 20}} center spacing={2}>
            <Button
              onPress={total}
              title="Calculate"
              color="#841584"
              accessibilityLabel="Count"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 150,
                height: 50,
              }}
            />
          </Stack>
          <Stack style={{marginRight: 20}} center spacing={2}>
            <Button
              title="View Records"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 150,
                // width: Dimensions.get('window').width,
                height: 50,
              }}
              onPress={() => {
                // interstitial.show()
                return navigation.navigate('Records');
              }}
            />
          </Stack>
        </Flex>
      </ScrollView>

      {/* <Stack fill center spacing={4}>
  <FAB
      variant="extended"
      
      label="navigate"
      color="primary"
    />
  </Stack> */}

      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={'ca-app-pub-2635835949649414/5364020703'}
        />
      </View>
    </>
  );
};

export default HomeScreen;
