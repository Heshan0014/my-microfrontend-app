import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Designer = {
  ownerId: string;
  brandName: string;
  displayName: string;
  bio: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  address: string;
  profilePic: string;
  styleTags: string[];
  verificationStatus: string;
  createdAt: number;
  updatedAt: number;
  views: number;
  likes: number;
};

type DesignerForm = Designer & {
  styleTagsString?: string;
};

const DesignerProfileScreen = () => {
  const [designer, setDesigner] = useState<Designer>({
    ownerId: "uid_from_firebase_auth",
    brandName: "SRI by Nadeesha",
    displayName: "Nadeesha Perera",
    bio: "Handmade batik & fusion wear from Colombo.",
    phone: "+94xxxxxxxxx",
    email: "designer@example.com",
    instagram: "https://instagram.com/sribyNadeesha",
    facebook: "https://facebook.com/sribyNadeesha",
    address: "Colombo 07",
    profilePic:
      "https://cdn-icons-png.flaticon.com/512/847/847969.png", // 🔹 profile pic state
    styleTags: ["Bohemian", "Sustainable", "Evening"],
    verificationStatus: "pending",
    createdAt: 1691234567890,
    updatedAt: 1691239999999,
    views: 12,
    likes: 54,
  });

  const [editVisible, setEditVisible] = useState(false);
  const [form, setForm] = useState<DesignerForm>(designer);

  const handleSave = () => {
    // Convert tags from comma separated string → array
    const updatedTags = form.styleTagsString
      ? form.styleTagsString.split(",").map((t: string) => t.trim())
      : [];

    setDesigner({
      ...form,
      styleTags: updatedTags,
    });
    setEditVisible(false);
  };

  return (
    <LinearGradient
      colors={["#fce9d2", "#f8f1e4", "#f9e2c5"]}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Designer Profile</Text>
          <TouchableOpacity onPress={() => setEditVisible(true)}>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: designer.profilePic }} style={styles.avatar} />
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.brandName}>{designer.brandName}</Text>
          <Text style={styles.displayName}>{designer.displayName}</Text>
          <Text style={styles.bio}>{designer.bio}</Text>
        </View>

        {/* Contact Details */}
        <View style={styles.detailsList}>
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => Linking.openURL(`tel:${designer.phone}`)}
          >
            <Ionicons name="call-outline" size={18} color="#333" />
            <Text style={styles.detailText}>{designer.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => Linking.openURL(`mailto:${designer.email}`)}
          >
            <Ionicons name="mail-outline" size={18} color="#333" />
            <Text style={styles.detailText}>{designer.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => Linking.openURL(designer.instagram)}
          >
            <Ionicons name="logo-instagram" size={18} color="#E1306C" />
            <Text style={[styles.detailText, { color: "#E1306C" }]}>
              Instagram
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => Linking.openURL(designer.facebook)}
          >
            <Ionicons name="logo-facebook" size={18} color="#1877F2" />
            <Text style={[styles.detailText, { color: "#1877F2" }]}>
              Facebook
            </Text>
          </TouchableOpacity>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color="#333" />
            <Text style={styles.detailText}>{designer.address}</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {designer.styleTags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{designer.views}</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{designer.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{designer.verificationStatus}</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* Edit Modal */}
        <Modal visible={editVisible} animationType="slide">
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Profile Picture URL"
              value={form.profilePic}
              onChangeText={(text) => setForm({ ...form, profilePic: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Brand Name"
              value={form.brandName}
              onChangeText={(text) => setForm({ ...form, brandName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={form.displayName}
              onChangeText={(text) => setForm({ ...form, displayName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Bio"
              multiline
              value={form.bio}
              onChangeText={(text) => setForm({ ...form, bio: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Instagram"
              value={form.instagram}
              onChangeText={(text) => setForm({ ...form, instagram: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Facebook"
              value={form.facebook}
              onChangeText={(text) => setForm({ ...form, facebook: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Style Tags (comma separated)"
              value={form.styleTagsString || form.styleTags.join(", ")}
              onChangeText={(text) =>
                setForm({ ...form, styleTagsString: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

export default DesignerProfileScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoCard: {
    alignItems: "center",
    marginBottom: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  displayName: {
    fontSize: 16,
    color: "#555",
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    color: "#333",
  },
  detailsList: {
    marginTop: 14,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#eee",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
  },
  modalContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#bbb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
