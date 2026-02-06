/**
 * Asset List Screen
 * Displays all saved RealEstateAsset records in a scrollable list
 * Each list item shows the asset name, type icon, and city
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {MaterialIcons as Icon} from '@react-native-vector-icons/material-icons';
import {getAllAssets} from '../services/AssetStorageService';
import {AssetTypeIcons} from '../models/RealEstateAsset';

const AssetListScreen = ({navigation}) => {
  const [assets, setAssets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAssets = useCallback(async () => {
    try {
      const allAssets = await getAllAssets();
      setAssets(allAssets);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  // Add a listener for when the screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAssets();
    });

    return unsubscribe;
  }, [navigation, loadAssets]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAssets();
  }, [loadAssets]);

  const handleAddAsset = () => {
    navigation.navigate('AddRealEstateAsset');
  };

  const handleAssetPress = (asset) => {
    // Placeholder for Issue 3 - Navigate to AssetDetail
    console.log('Asset pressed:', asset.assetId);
    // navigation.navigate('AssetDetail', {assetId: asset.assetId});
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="house" size={80} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No assets yet</Text>
      <Text style={styles.emptySubtitle}>Add your first one!</Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddAsset}>
        <Icon name="add" size={24} color="#ffffff" />
        <Text style={styles.emptyButtonText}>Add Real Estate Asset</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAssetItem = ({item}) => (
    <TouchableOpacity
      style={styles.assetItem}
      onPress={() => handleAssetPress(item)}>
      <View style={styles.iconContainer}>
        <Icon
          name={AssetTypeIcons[item.assetType] || 'home'}
          size={32}
          color="#3498db"
        />
      </View>
      <View style={styles.assetInfo}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text style={styles.assetCity}>{item.address.city}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#bdc3c7" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Assets</Text>
        <TouchableOpacity onPress={handleAddAsset} style={styles.headerButton}>
          <Icon name="add" size={28} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Asset List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading assets...</Text>
        </View>
      ) : (
        <FlatList
          data={assets}
          renderItem={renderAssetItem}
          keyExtractor={(item) => item.assetId}
          contentContainerStyle={
            assets.length === 0 ? styles.emptyListContainer : styles.listContainer
          }
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3498db"
              colors={['#3498db']}
            />
          }
        />
      )}

      {/* Floating Add Button - Only shown when there are assets */}
      {assets.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleAddAsset}>
          <Icon name="add" size={28} color="#ffffff" />
        </TouchableOpacity>
      )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerButton: {
    padding: 4,
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
  listContainer: {
    paddingVertical: 8,
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ebf5fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  assetCity: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default AssetListScreen;
