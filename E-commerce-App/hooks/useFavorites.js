import { useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  // Load user's favorites
  const loadFavorites = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'favorites'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const favoritesList = [];
      querySnapshot.forEach((doc) => {
        favoritesList.push({ id: doc.id, ...doc.data() });
      });
      setFavorites(favoritesList);
      console.log('🔄 Loaded favorites:', favoritesList.length, 'items');
      console.log('📋 Favorites list:', favoritesList.map(f => f.businessName));
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add business to favorites
  const addToFavorites = async (business) => {
    if (!userId) return;
    
    try {
      console.log('➕ Adding to favorites:', business.name, 'ID:', business.id);
      const favoriteRef = doc(collection(db, 'favorites'));
      await setDoc(favoriteRef, {
        userId,
        businessId: business.id,
        businessName: business.name,
        businessImage: business.imageURL,
        businessAddress: business.address,
        businessCategory: business.category,
        addedAt: new Date().toISOString()
      });
      
      // Update local state immediately for better UX
      const newFavorite = {
        id: favoriteRef.id,
        userId,
        businessId: business.id,
        businessName: business.name,
        businessImage: business.imageURL,
        businessAddress: business.address,
        businessCategory: business.category,
        addedAt: new Date().toISOString()
      };
      setFavorites(prev => {
        const updated = [...prev, newFavorite];
        console.log('✅ Updated favorites state:', updated.length, 'items');
        return updated;
      });
      console.log('✅ Added to favorites successfully');
    } catch (error) {
      console.error('❌ Error adding to favorites:', error);
    }
  };

  // Remove business from favorites
  const removeFromFavorites = async (businessId) => {
    if (!userId) return;
    
    try {
      console.log('➖ Removing from favorites:', businessId);
      const q = query(
        collection(db, 'favorites'),
        where('userId', '==', userId),
        where('businessId', '==', businessId)
      );
      const querySnapshot = await getDocs(q);
      
      // Update local state immediately for better UX
      setFavorites(prev => {
        const updated = prev.filter(fav => fav.businessId !== businessId);
        console.log('✅ Updated favorites state:', updated.length, 'items');
        return updated;
      });
      
      // Delete from Firebase
      const deletePromises = querySnapshot.docs.map(async (document) => {
        await deleteDoc(doc(db, 'favorites', document.id));
      });
      await Promise.all(deletePromises);
      
      console.log('✅ Removed from favorites successfully');
    } catch (error) {
      console.error('❌ Error removing from favorites:', error);
      // Reload favorites if there was an error
      await loadFavorites();
    }
  };

  // Check if business is in favorites
  const isFavorite = (businessId) => {
    const result = favorites.some(fav => fav.businessId === businessId);
    console.log(`🔍 Checking if ${businessId} is favorite:`, result);
    return result;
  };

  // Toggle favorite status
  const toggleFavorite = async (business) => {
    console.log('🔄 Toggling favorite for:', business.name, 'ID:', business.id);
    if (isFavorite(business.id)) {
      console.log('➖ Removing from favorites');
      await removeFromFavorites(business.id);
    } else {
      console.log('➕ Adding to favorites');
      await addToFavorites(business);
    }
  };

  // Load favorites on mount
  useEffect(() => {
    if (userId) {
      console.log('🚀 Loading favorites for user:', userId);
      loadFavorites();
    }
  }, [userId]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    loadFavorites
  };
}; 