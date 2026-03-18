import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  FlatList 
} from 'react-native';

interface PickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  options: string[];
  title: string;
}

export default function CustomPicker({ visible, onClose, onSelect, options, title }: PickerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Backdrop: Clicking here triggers onClose */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          
          {/* Content: Clicking here does nothing (prevents closing) */}
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              
              {options.map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={styles.option} 
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: { width: '85%', backgroundColor: 'white', borderRadius: 15, padding: 20, elevation: 5 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15, textAlign: 'center' },
  option: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F1F2F6' },
  optionText: { fontSize: 16, color: '#2D3436', textAlign: 'center' },
  cancelBtn: { marginTop: 10, paddingVertical: 10 },
  cancelText: { color: '#D63031', textAlign: 'center', fontWeight: 'bold' }
});