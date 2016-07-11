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
		borderBottomColor: 'transparent',
		overflow: 'hidden'
	},
	item_highlight: {
		borderBottomColor: '#099fde'
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemText: {
		color: '#000',
		fontSize: 15
	},
	itemText_highlight: {
		color: '#099fde'
	},
	underline: {
		height: 2,
		width: 0,
		marginTop: -2,
		backgroundColor: '#099fde'
	},
	redDot: {
		width: 8,
		height: 8,
		backgroundColor: 'red',
		borderRadius: 4,
		marginLeft: 3,
		marginTop: -10
	}
});

