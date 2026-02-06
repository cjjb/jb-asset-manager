/**
 * Asset Detail Screen
 * Displays all details of a single RealEstateAsset in read-only format
 * Includes navigation to Edit and Delete operations
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {MaterialIcons as Icon} from '@react-native-vector-icons/material-icons';
import {getAssetById, deleteAsset} from '../services/AssetStorageService';
import {AssetTypeIcons, AssetTypeLabels} from '../models/RealEstateAsset';

const AssetDetailScreen = ({navigation, route}) => {
  const {assetId} = route.params;
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAsset = useCallback(async () => {
    try {
      setLoading(true);
      const loadedAsset = await getAssetById(assetId);
      if (loadedAsset) {
        setAsset(loadedAsset);
      } else {
        // Asset not found, navigate back
        Alert.alert('Error', 'Asset not found', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.error('Error loading asset:', error);
      Alert.alert('Error', 'Failed to load asset details');
    } finally {
      setLoading(false);
    }
  }, [assetId, navigation]);

  useEffect(() => {
    loadAsset();
  }, [loadAsset]);

  // Reload asset when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAsset();
    });

    return unsubscribe;
  }, [navigation, loadAsset]);

  const handleEdit = () => {
    // Placeholder for Issue 4 - Navigate to EditRealEstateAsset
    Alert.alert('Coming Soon', 'Edit functionality will be implemented in Issue 4');
    // navigation.navigate('EditRealEstateAsset', {assetId: asset.assetId});
  };

  const handleDelete = () => {
    // Show confirmation dialog (Issue 5)
    Alert.alert(
      'Delete Asset',
      `Are you sure you want to delete "${asset.name}"? This action cannot be undone.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const deleted = await deleteAsset(asset.assetId);
              if (deleted) {
                Alert.alert('Success', 'Asset deleted successfully');
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to delete asset');
              }
            } catch (error) {
              console.error('Error deleting asset:', error);
              Alert.alert('Error', 'Failed to delete asset');
            }
          },
        },
      ],
    );
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatFullAddress = (address) => {
    if (!address) return 'N/A';
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country,
    ].filter(part => part); // Remove empty parts
    return parts.join(', ');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Asset Details</Text>
          <View style={styles.headerActions} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading asset details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!asset) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Asset Details</Text>
          <View style={styles.headerActions} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Asset not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asset Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
            <Icon name="edit" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.headerButton}>
            <Icon name="delete" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Asset Type Icon and Name */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Icon
              name={AssetTypeIcons[asset.assetType] || 'home'}
              size={48}
              color="#3498db"
            />
          </View>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.assetTypeLabel}>
            {AssetTypeLabels[asset.assetType] || asset.assetType}
          </Text>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Address</Text>
          <View style={styles.fieldContainer}>
            <Icon name="location-on" size={20} color="#7f8c8d" style={styles.fieldIcon} />
            <Text style={styles.fieldValue}>{formatFullAddress(asset.address)}</Text>
          </View>
        </View>

        {/* Description Section */}
        {asset.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <View style={styles.fieldContainer}>
              <Icon name="description" size={20} color="#7f8c8d" style={styles.fieldIcon} />
              <Text style={styles.fieldValue}>{asset.description}</Text>
            </View>
          </View>
        ) : null}

        {/* Notes Section */}
        {asset.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <View style={styles.fieldContainer}>
              <Icon name="note" size={20} color="#7f8c8d" style={styles.fieldIcon} />
              <Text style={styles.fieldValue}>{asset.notes}</Text>
            </View>
          </View>
        ) : null}

        {/* Created Date Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Created</Text>
          <View style={styles.fieldContainer}>
            <Icon name="calendar-today" size={20} color="#7f8c8d" style={styles.fieldIcon} />
            <Text style={styles.fieldValue}>{formatDate(asset.createdAt)}</Text>
          </View>
        </View>

        {/* Updated Date Section - only show if different from created */}
        {asset.updatedAt && asset.updatedAt !== asset.createdAt && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Last Updated</Text>
            <View style={styles.fieldContainer}>
              <Icon name="update" size={20} color="#7f8c8d" style={styles.fieldIcon} />
              <Text style={styles.fieldValue}>{formatDate(asset.updatedAt)}</Text>
            </View>
          </View>
        )}
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 4,
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ebf5fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  assetTypeLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fieldIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
});

export default AssetDetailScreen;
