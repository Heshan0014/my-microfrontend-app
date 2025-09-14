import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import baseURL from "../utils/apiConfig"; // import the helper

export default function AdminVerificationScreen({ navigation }: any) {
  const [pendingDesigners, setPendingDesigners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDesigners();
  }, []);

  const fetchPendingDesigners = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/designer-requests`);
      setPendingDesigners(response.data);
    } catch (error) {
      console.error("Error fetching designers:", error);
      Alert.alert("Error", "Failed to load pending designers.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (designerId: string) => {
    try {
      await axios.post(`${baseURL}/api/admin/approve/${designerId}`);
      Alert.alert("Success", "Designer approved successfully!");
      setPendingDesigners((prev) =>
        prev.filter((designer) => designer.id !== designerId)
      );
    } catch (error) {
      console.error("Approval failed:", error);
      Alert.alert("Error", "Failed to approve designer.");
    }
  };

  const handleReject = async (designerId: string) => {
    try {
      await axios.post(`${baseURL}/api/admin/reject/${designerId}`);
      Alert.alert("Success", "Designer rejected successfully!");
      setPendingDesigners((prev) =>
        prev.filter((designer) => designer.id !== designerId)
      );
    } catch (error) {
      console.error("Rejection failed:", error);
      Alert.alert("Error", "Failed to reject designer.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Pending Designer Approvals</Text>

      <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false}>
        {pendingDesigners.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No pending designers.
          </Text>
        ) : (
          pendingDesigners.map((designer) => (
            <View key={designer.id} style={styles.card}>
              <Text style={styles.brand}>{designer.brandName}</Text>
          
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{designer.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{designer.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Business Address:</Text>
                <Text style={styles.value}>{designer.businessAddress}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Portfolio:</Text>
                <Text style={styles.value}>{designer.portfolio}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Business Reg. No:</Text>
                <Text style={styles.value}>{designer.businessRegNumber}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, styles.approve]}
                  onPress={() => handleApprove(designer.id)}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.reject]}
                  onPress={() => handleReject(designer.id)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E6",
    padding: 15,
  },
  backButton: {
    marginBottom: 10,
    alignSelf: "flex-start",
    padding: 6,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#E6D3C2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  brand: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E1E1E",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    width: 150,
    color: "#1E1E1E",
  },
  value: {
    color: "#333",
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  approve: {
    backgroundColor: "#D9C1A9",
  },
  reject: {
    backgroundColor: "#BFA188",
  },
  buttonText: {
    color: "#1E1E1E",
    fontWeight: "bold",
  },
});
