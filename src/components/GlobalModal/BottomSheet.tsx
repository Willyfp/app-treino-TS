import React, { useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { RootState } from '../../store/reducers';
import { BottomView, TransparentView } from './styles';
import { Creators as bottomSheetActions } from '../../store/reducers/modalReducer';

const mapStateToProps = ({ modalReducer }: RootState) => ({
  visible: modalReducer.getIn(['bottomSheet', 'visible']),
  child: modalReducer.getIn(['bottomSheet', 'child']),
});

const mapDispatchToProps = {
  setBottomSheet: bottomSheetActions.setBottomSheet,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const BottomSheet = ({ visible, child, setBottomSheet }: PropsFromRedux) => {
  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        slideDown();
        return true;
      } else {
        return false;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [visible]);

  const { colors } = useTheme();
  const { height } = useWindowDimensions();

  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [visible]);

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height + 50,
      duration: 700,
      useNativeDriver: true,
    }).start(({ finished }) => finished && setBottomSheet({ visible: false }));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={slideDown}>
        <TransparentView
          style={{ transform: [{ translateY: slideAnim }], zIndex: 1 }}
        />
      </TouchableWithoutFeedback>
      <BottomView style={{ transform: [{ translateY: slideAnim }], zIndex: 1 }}>
        <FontAwesome5Icon name={'grip-lines'} size={25} color={colors.text} />
        {child}
      </BottomView>
    </>
  );
};

export default connector(BottomSheet);
