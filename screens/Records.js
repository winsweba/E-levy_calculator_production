import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useAuth} from '../context/AppContext';
import firestore from '@react-native-firebase/firestore';
import {AppBar, ListItem} from '@react-native-material/core';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const Records = () => {
  const [userRecords, setUserRecords] = useState([]);

  const {user} = useAuth();

  // const ref = firestore().collection('Users').orderBy('timeStamp', 'desc')
  const ref = firestore().collection('Users');

  useEffect(() => {
    try {
      // return ref.where('userId', '==', user.uid).get().then(querySnapshot => {
      //   const list = [];
      //   querySnapshot.forEach(doc => {

      //     list.push({
      //       id: doc.id,
      //       ...doc.data()
      //     });
      //   });

      //   setUserRecords(list);
      // });
      return ref.where('userId', '==', user.uid).onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {
            govCharges,
            tellcomCharges,
            totalCharges,
            yourAmount,
            yourBalance,
            timeStamp,
          } = doc.data();
          list.push({
            id: doc.id,
            govCharges,
            tellcomCharges,
            totalCharges,
            yourAmount,
            yourBalance,
            timeStamp,
          });
        });
        // console.log(list.timeStamp)
        setUserRecords(list);
        try {
        } catch (error) {
          console.log(`NULL ${error}`);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  //   Government Charges
  // Telecommunication Charges
  // Total Charges
  // Your balance
  return (
    <>
      {/* <AppBar
    title=" Your Records "
    /> */}
      <ListItem title="Gov    Telecom    Total    Balance    Amount " />

      <ScrollView>
        {userRecords.map(records => {
          // return <Text>{records.govCharges}</Text>;
          console.log(records.timeStamp);
          return (
            <ListItem
              key={records.id}
              title={`${records.govCharges}      ${records.tellcomCharges}         ${records.totalCharges}     ${records.yourBalance}       ${records.yourAmount}`}
            />
          );
        })}
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={'ca-app-pub-2635835949649414/6551432105'}
        />
      </View>
    </>
  );
};

export default Records;
