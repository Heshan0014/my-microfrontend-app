
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STYLE_OPTIONS = [
	{ key: 'casual', label: 'Casual' },
	{ key: 'bohemian', label: 'Bohemian' },
	{ key: 'classic', label: 'Classic' },
	{ key: 'edgy', label: 'Edgy' },
	{ key: 'sporty', label: 'Sporty' },
	{ key: 'chic', label: 'Chic' },
	{ key: 'preppy', label: 'Preppy' },
	{ key: 'minimalist', label: 'Minimalist' },
];

const PRIMARY_COLOR = '#1E90FF'; // Example: Use your existing primary color
const BG_COLOR = '#fff'; // Example: Use your existing background color
const TEXT_COLOR = '#222'; // Example: Use your existing text color
const SELECTED_COLOR = '#FFD700'; // Example: Use your accent color

const StyleProfileSetup = () => {
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const toggleStyle = (key: string) => {
		setSelectedStyles((prev) =>
			prev.includes(key)
				? prev.filter((k) => k !== key)
				: [...prev, key]
		);
	};

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission required', 'Permission to access media library is required!');
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: true,
			quality: 1,
		});
		if (!result.canceled) {
			setImages((prev) => [
				...prev,
				...result.assets.map((asset: { uri: string }) => asset.uri),
			]);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Select Your Style Preferences</Text>
			<View style={styles.grid}>
				{STYLE_OPTIONS.map((option) => {
					const selected = selectedStyles.includes(option.key);
					return (
						<TouchableOpacity
							key={option.key}
							style={[styles.option, selected && styles.selectedOption]}
							onPress={() => toggleStyle(option.key)}
							activeOpacity={0.7}
						>
							<Text style={[styles.optionText, selected && styles.selectedText]}>
								{option.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			<Text style={styles.subtitle}>Upload Style Inspiration Photos</Text>
			<TouchableOpacity style={styles.uploadButton} onPress={pickImage} activeOpacity={0.7}>
				<Text style={styles.uploadButtonText}>Pick Images</Text>
			</TouchableOpacity>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
				{images.map((uri, idx) => (
					<Image
						key={idx}
						source={{ uri }}
						style={styles.uploadedImage}
						resizeMode="cover"
					/>
				))}
			</ScrollView>

			<TouchableOpacity
				style={[
					styles.continueButton,
					selectedStyles.length === 0 && styles.disabledButton,
				]}
				disabled={selectedStyles.length === 0}
				onPress={() => {
					// Placeholder for next step
					console.log('Selected styles:', selectedStyles);
					console.log('Selected images:', images);
				}}
				activeOpacity={0.7}
			>
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: BG_COLOR,
		alignItems: 'center',
		paddingVertical: 32,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
		marginBottom: 24,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '600',
		color: TEXT_COLOR,
		marginTop: 32,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
	},
	option: {
		backgroundColor: '#f0f0f0',
		borderRadius: 16,
		paddingVertical: 18,
		paddingHorizontal: 28,
		margin: 6,
		minWidth: 120,
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'transparent',
	},
	selectedOption: {
		backgroundColor: SELECTED_COLOR,
		borderColor: PRIMARY_COLOR,
	},
	optionText: {
		fontSize: 18,
		color: TEXT_COLOR,
		fontWeight: '500',
	},
	selectedText: {
		color: PRIMARY_COLOR,
		fontWeight: 'bold',
	},
	uploadButton: {
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 20,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginBottom: 12,
	},
	uploadButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	imageScroll: {
		minHeight: 100,
		maxHeight: 120,
		marginBottom: 16,
	},
	uploadedImage: {
		width: 90,
		height: 90,
		borderRadius: 12,
		marginRight: 10,
		borderWidth: 2,
		borderColor: PRIMARY_COLOR,
	},
	continueButton: {
		marginTop: 32,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 16,
		paddingHorizontal: 48,
		borderRadius: 24,
		alignItems: 'center',
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	continueButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	disabledButton: {
		backgroundColor: '#b0c4de',
	},
});

export default StyleProfileSetup;
