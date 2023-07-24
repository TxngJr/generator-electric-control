import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useState } from 'react'

type Props = {
  text: string;
  children: ReactNode;
  width: Number | any;
}

const PopupComponent = (props: Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handlePressIn = () => {
    setShowPopup(true);
  };

  const handlePressOut = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {props.children}
      </TouchableOpacity>

      {showPopup && (
        <View style={[styles.popup, { width: props.width }]}>
          <Text style={styles.popupText}>{props.text}</Text>
        </View>
      )}
    </View>
  );
};

export default PopupComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
    right: -80
  },
  popupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});