/**
 * Add Real Estate Asset Screen
 * Allows users to add a new real estate asset
 * Following domain guidelines: uses RealEstateAsset instead of ambiguous "Location" or "Property"
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {MaterialIcons as Icon} from '@react-native-vector-icons/material-icons';
import {
  createRealEstateAsset,
  AssetTypes,
  AssetTypeIcons,
  AssetTypeLabels,
} from '../models/RealEstateAsset';
import {saveAsset} from '../services/AssetStorageService';

const AddRealEstateAssetScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(AssetTypes.APARTMENT_BUILDING);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter an asset name.');
      return;
    }

    if (!street.trim() || !city.trim()) {
      Alert.alert('Validation Error', 'Please enter at least street and city.');
      return;
    }

    const newAsset = createRealEstateAsset({
      name: name.trim(),
      assetType: selectedType,
      address: {
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        country: country.trim(),
      },
      description: description.trim(),
      notes: notes.trim(),
    });

    try {
      await saveAsset(newAsset);
      Alert.alert(
        'Success',
        `Real Estate Asset "${newAsset.name}" has been saved!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Error',
        `Failed to save asset: ${error.message}`,
        [{text: 'OK'}],
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderAssetTypeButton = (type) => {
    const isSelected = selectedType === type;
    return (
      <TouchableOpacity
        key={type}
        style={[
          styles.typeButton,
          isSelected && styles.typeButtonSelected,
        ]}
        onPress={() => setSelectedType(type)}>
        <Icon
          name={AssetTypeIcons[type]}
          size={32}
          color={isSelected ? '#3498db' : '#7f8c8d'}
        />
        <Text
          style={[
            styles.typeLabel,
            isSelected && styles.typeLabelSelected,
          ]}>
          {AssetTypeLabels[type]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Real Estate Asset</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Icon name="check" size={24} color="#27ae60" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Asset Name */}
          <View style={styles.section}>
            <Text style={styles.label}>Asset Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Sunset Apartments"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#95a5a6"
            />
          </View>

          {/* Asset Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Asset Type</Text>
            <View style={styles.typeContainer}>
              {Object.values(AssetTypes).map(type =>
                renderAssetTypeButton(type),
              )}
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            
            <Text style={styles.label}>Street Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 123 Main Street"
              value={street}
              onChangeText={setStreet}
              placeholderTextColor="#95a5a6"
            />

            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., San Francisco"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#95a5a6"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>State/Province</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., CA"
                  value={state}
                  onChangeText={setState}
                  placeholderTextColor="#95a5a6"
                />
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>ZIP/Postal Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 94102"
                  value={zipCode}
                  onChangeText={setZipCode}
                  placeholderTextColor="#95a5a6"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., United States"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor="#95a5a6"
            />
          </View>

          {/* Additional Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Brief description of the asset..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              placeholderTextColor="#95a5a6"
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any additional notes..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              placeholderTextColor="#95a5a6"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  typeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#e1e8ed',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    minWidth: 100,
  },
  typeButtonSelected: {
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  typeLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  typeLabelSelected: {
    color: '#3498db',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});

export default AddRealEstateAssetScreen;
