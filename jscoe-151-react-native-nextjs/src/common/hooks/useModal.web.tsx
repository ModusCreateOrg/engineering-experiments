import React, { createContext, FC, ReactElement, useContext, useState } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { useStyles } from './useStyles';

interface ModalContextValues {
  closeModal: () => void;
  openModal: (el: React.ReactElement) => void;
}

const ModalContext = createContext<ModalContextValues>({} as ModalContextValues);

export const useModal = () => useContext(ModalContext);

export const ModalProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Element, setElement] = useState<ReactElement | null>(null);

  const styles = useStyles((_t, _q, StyleSheet) => ({
    container: {
      ...StyleSheet.absoluteFillObject
    }
  }));

  const closeModal = () => {
    setIsOpen(false);
    setElement(null);
  }
  const openModal = (el: ReactElement) => {
    setIsOpen(true)
    setElement(el);
  };

  return (
    <ModalContext.Provider 
      value={{
        closeModal,
        openModal
      }}>
        {children}
        {
          isOpen && (
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.container}>{Element}</View>
            </TouchableWithoutFeedback>
          )
        }
      </ModalContext.Provider>
  );
};
