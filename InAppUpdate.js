import React, {useState} from 'react';
import {Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';

const InAppUpdate = () => {
  const [Latest_Version, setLatest_Version] = useState();
  const Package_Name = VersionCheck.getPackageName();
  const Build_Number = VersionCheck.getCurrentBuildNumber();
  const Current_Version = VersionCheck.getCurrentVersion();

  console.log('Package Name', Package_Name);
  console.log('Current BuildNumber', Build_Number);
  console.log('Current Version', Current_Version);
  console.log('Latest Version', Latest_Version);

  VersionCheck.getLatestVersion({
    provider: 'playStore',
  }).then(latestVersion => {
    // console.log('playStore', latestVersion);
    setLatest_Version(latestVersion);
  });

  VersionCheck.needUpdate({
    currentVersion: Current_Version,
    latestVersion: Latest_Version,
  }).then(res => {
    console.log('Checked update -> ', res.isNeeded);
  });

  VersionCheck.needUpdate().then(async res => {
    // console.log(res.isNeeded); // true
    if (res.isNeeded) {
      Linking.openURL(res.storeUrl);
    } else {
      console.log('No need to UPDATE');
    }
  });

  // VersionCheck.getLatestVersion({
  //   provider: 'appStore', // for iOS
  // }).then(latestVersion => {
  //   console.log(latestVersion); // 0.1.2
  // });
};

export default InAppUpdate;
