import React, { useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Platform, StyleSheet, View } from 'react-native';

const DoubleSlider = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);

  const multiSliderValuesChange = (values) => setMultiSliderValue(values);

  return (
    <View style={{height:15}}>
      <MultiSlider
        markerStyle={{
          ...Platform.select({
            ios: {
              height: 30,
              width: 30,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 1,
              shadowOpacity: 0.1,
            },
            android: {
              height: 30,
              width: 30,
              borderRadius: 50,
              backgroundColor: '#1792E8',
          
            },
          }),
        }}
        pressedMarkerStyle={{
          ...Platform.select({
            android: {
              height: 30,
              width: 30,
              borderRadius: 20,
              backgroundColor: '#148ADC',
            },
          }),
        }}
        selectedStyle={{
          backgroundColor: '#1792E8',
        }}
        trackStyle={{
          backgroundColor: '#CECECE',
        }}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={320}
        onValuesChange={multiSliderValuesChange}
        min={0}
        max={100}
        allowOverlap={false}
        minMarkerOverlapDistance={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default DoubleSlider;
