import {
	StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 43,
		borderBottomWidth: 0.5,
		borderBottomColor: '#bcbcbc',
		backgroundColor:'white'
	},
	item: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: -0.5,
		borderBottomWidth: 2,
		borderBottomColor: 'transparent'
	},
	item_highlight: {
		borderBottomColor: '#099fde'
	},
	itemText: {
		color: '#000'
	},
	itemText_highlight: {
		color: '#099fde'
	},
	underline: {
		height: 2,
		width: 0,
		marginTop: -2,
		backgroundColor: '#099fde'
	}
});

