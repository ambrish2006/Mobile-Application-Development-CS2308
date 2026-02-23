import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type FoodItem = {
  id: string;
  name: string;
  price: number;
  category: 'Veg' | 'Non-Veg' | 'Beverage';
  image: any;
};

const foodData: FoodItem[] = [
  {
    id: '1',
    name: 'Veg Biryani',
    price: 180,
    category: 'Veg',
    image: require('./assets/vegbiryani.jpeg'),
  },
  {
    id: '2',
    name: 'Chicken Burger',
    price: 220,
    category: 'Non-Veg',
    image: require('./assets/chickenburger.webp'),
  },
  {
    id: '3',
    name: 'Paneer Pizza',
    price: 250,
    category: 'Veg',
    image: require('./assets/pannerpizza.jpeg'),
  },
  {
    id: '4',
    name: 'Cold Coffee',
    price: 120,
    category: 'Beverage',
    image: require('./assets/coldcoffee.jpeg'),
  },
];

function HomeScreen({ navigation }: any) {
  const [cart, setCart] = useState<FoodItem[]>([]);

  const addToCart = (item: FoodItem) => {
    setCart((prev) => [...prev, item]);
  };

  const getCategoryColor = (category: string) => {
    if (category === 'Veg') return '#d4edda';
    if (category === 'Non-Veg') return '#f8d7da';
    if (category === 'Beverage') return '#d1ecf1';
    return '#fff';
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.header}>🍽 Food Delivery</Text>

      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: getCategoryColor(item.category) },
            ]}
          >
            <Image source={item.image} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text>₹ {item.price}</Text>
              <Text style={styles.category}>{item.category}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(item)}
              >
                <Text style={{ color: '#fff' }}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate('Payment', {
              cartItems: cart,
              total: totalAmount,
            })
          }
        >
          <Text style={styles.checkoutText}>
            Go to Payment (₹ {totalAmount})
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

function PaymentScreen({ route, navigation }: any) {
  const { cartItems, total } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>💳 Payment Page</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text>{item.name}</Text>
            <Text>₹ {item.price}</Text>
          </View>
        )}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalText}>₹ {total}</Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => {
          Alert.alert('Payment Successful ✅');
          navigation.popToTop();
        }}
      >
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    marginVertical: 5,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#ff4d4d',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});