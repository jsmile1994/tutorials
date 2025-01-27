import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../../../config/images';
import metrics from '../../../config/metrics';
import { COLORS } from '../../../utils/colorHelper';
import { helpers } from '../../../utils/helpers';
import { SemiBoldText } from '../../../components/CustomFontText/SemiBoldText';
import { BoldText } from '../../../components/CustomFontText/BoldText';
import { RegularText } from '../../../components/CustomFontText/RegularText';
import { ExportPrivateKeyModal } from '../../../components/ExportPrivateKeyModal';
import { CONSTANTS, CUSTOMIZE } from '../../../config/customize';

const TEXT_LENGTH = 300;
const TEXT_HEIGHT = 30;
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

export const WalletCard = ({
  balance,
  locked,
  unwAddress,
  usdtPair,
  future
}) => {

  const [visible, setVisible] = useState(false);

  const handleExportPrivateKey = () => {
    setVisible(true);
  }

  return (
    <View
      style={styles.container}>
      <View style={styles.addressWrapper}>
        <View style={styles.addressWrapper}>
          <SemiBoldText style={{ color: 'grey', fontSize: 16 }}>Address: </SemiBoldText>
          <View style={{ flex: 1 }}>
            <BoldText
              numberOfLines={1}
              ellipsizeMode='middle'
              style={{ fontSize: 16, color: '#000' }}
            >
              {unwAddress}
            </BoldText>
          </View>
        </View>

        <Pressable
          onPress={() => helpers.handleCopyToClipboard(unwAddress, 'Copied', Toast.TOP)}
          style={{ paddingLeft: 15, }}>
          <Icon
            name="copy1"
            type="AntDesign"
            style={{ fontSize: 24, color: COLORS.black }}
          />
        </Pressable>
        <Pressable
          onPress={handleExportPrivateKey}
          style={{ paddingLeft: 15, }}>
          <Icon
            name="export"
            type="AntDesign"
            style={{ fontSize: 24, color: 'red' }}
          />
        </Pressable>
      </View>

      <View
        style={styles.content}>
        {/* top */}
        <View>
          <Text>
            <BoldText
              style={{ color: COLORS.white, fontSize: helpers.isIpX ? 30 : 26 }}>
              {helpers.formatAmount(helpers.formatUnw(balance + locked + future), 3)} {''}
            </BoldText>
            <SemiBoldText style={{ color: COLORS.white }}>{CONSTANTS.CURRENCY}</SemiBoldText>
          </Text>
          <RegularText
            style={{ color: COLORS.white, fontSize: 13, marginTop: 5 }}>
            ={' '}
            {usdtPair
              ? helpers.formatAmount(helpers.formatUnw(usdtPair * balance), 3)
              : ''}{' '}
            USD
          </RegularText>
        </View>
        <View style={{}}>
          <RegularText
            style={styles.label}>
            Available
          </RegularText>
          <BoldText
            style={styles.figure}
            numberOfLines={1}
          >
            {helpers.formatAmount(helpers.formatUnw(balance), 3)} {CONSTANTS.CURRENCY}
          </BoldText>
        </View>
        {/* center */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <RegularText
                style={styles.label}>
                Future
              </RegularText>
              <BoldText
                style={styles.figure}
                numberOfLines={1}
              >
                {helpers.formatAmount(helpers.formatUnw(future), 3)} {CONSTANTS.CURRENCY}
              </BoldText>
            </View>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              <RegularText
                style={styles.label}>
                Locked
              </RegularText>
              <BoldText
                style={styles.figure}
                numberOfLines={1}
              >
                {helpers.formatAmount(helpers.formatUnw(locked), 3)} {CONSTANTS.CURRENCY}
              </BoldText>
            </View>
          </View>
        </View>
      </View >
      <ExportPrivateKeyModal
        visible={visible}
        setVisible={setVisible}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 15,
  },
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 20,
    paddingTop: 4,
    flex: 1
  },
  content: {
    height: null,
    justifyContent: 'space-between',
    backgroundColor: CUSTOMIZE.primary_color,
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20
  },
  label: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10
  },
  figure: {
    color: COLORS.white,
    marginTop: 10,
    fontSize: 16
  },
});