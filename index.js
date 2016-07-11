import React, {Component, PropTypes} from 'react';

import {
	View,
	Text,
	Image,
	TouchableHighlight,
	Dimensions,
	Animated
} from 'react-native';

import styles from './styles.js';

const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * TabBar
 * 选项卡组件
 * @class TabBar
 * @example
 * 		data: [
 * 			{
 * 				value: '测试',
 * 			 	unread: 10
 * 		   	}
 *       ]
 */
export default class TabBar extends Component{
	constructor(){
		super();

		this.state={
			currentIndex: 0,
			underlineLeft: new Animated.Value(0)
		}

		this.inputRange = [];
		this.outputRange = [];
		this.underlineWidth = 0;
	}

	componentWillMount(){
		
		let {currentIndex, data} = this.props;

		this.underlineWidth = SCREEN_WIDTH / data.length;

		if(currentIndex < data.length && currentIndex >= 0){
			this.setState({
				currentIndex: currentIndex,
				underlineLeft: new Animated.Value(currentIndex)
			})
		}

		for(let i = 0, len = data.length; i < len; i++){
			this.inputRange.push(i);
			this.outputRange.push(this.underlineWidth*i);
		}
	}

	componentDidMount(){

		let {onChange, data} = this.props;

		let currentIndex = this.state.currentIndex;

		if(currentIndex !== 0){
			onChange(data[currentIndex], currentIndex);
			this.setState({
				currentIndex: currentIndex
			})
		}
	}

	render(){

		let {hasUnderline, hasAnimated, barTintColor, data} = this.props;

		if(data.length <= 0) return;

		// 下划线动画
		if(hasUnderline && hasAnimated){
			this.handleUnderlineAnimation();	
		}

		let barStyle = barTintColor ? {backgroundColor: barTintColor} : {};

		return (
			<View>
				<View style={[styles.container, barStyle]}>
					{
						this.renderItem()
					}
	            </View>
				{
					this.getUnderlineView()
				}
            </View>
		)
	}

	handleUnderlineAnimation(){
		Animated.timing(
			this.state.underlineLeft,
			{toValue: this.state.currentIndex}
		).start();
	}

	getUnderlineView(){
		let {hasUnderline, hasAnimated, tintColor} = this.props;

		let underlineView = null,
			underlineStyle = [
				styles.underline, 
				{ 
					position: 'absolute', 
					width: this.underlineWidth
				}, 
				tintColor ? {backgroundColor: tintColor} : {}
			];

		// 有动画的下划线，使用underlineView
		if(hasUnderline && hasAnimated){
			underlineView = (
				<Animated.View style={[
						underlineStyle, 
						{
							left: this.state.underlineLeft.interpolate({
								inputRange: this.inputRange,
								outputRange: this.outputRange
							})
						}
					]}
				></Animated.View>
			);
		}

		return underlineView;
	}

	renderItem(){

		let {hasUnderline, hasAnimated, data, tintColor, textColor, underlayColor} = this.props;

		let items = [],
			itemHighlightStyle = {},
			itemTextHighlight = [styles.itemText_highlight, tintColor ? { color: tintColor} : {}];

		if(hasUnderline && !hasAnimated){
			itemHighlightStyle = Object.assign({}, styles.item_highlight, tintColor ? { borderBottomColor: tintColor} : {});
		}

		for(let i = 0, len = data.length; i < len; i++){

			if(!data[i].value) data[i].value = 'undefined';

			items.push(
				<TouchableHighlight style={[
						styles.item,
						this.state.currentIndex === i ? itemHighlightStyle : null
					]}
					underlayColor={underlayColor}
					onPress={this.handlePressItem.bind(this, i)} 
					key={'tabview_hd_' + i}
				>
					<View style={styles.itemContainer}>
						<View>
							<Text style={[
									styles.itemText,
									textColor ? {color: textColor}: null, 
									this.state.currentIndex === i ? itemTextHighlight : null
								]}
								numberOfLines={1}
							>{data[i].value}</Text>
						</View>
						{this.renderRedDot(i)}
					</View>
				</TouchableHighlight>
			)
		}

		return items;
	}

	renderRedDot(tabIndex){

		let {hasRedDot, data} = this.props;

		let unreadCount = data[tabIndex].unread ? Number(data[tabIndex].unread) : 0;

		if(hasRedDot && unreadCount > 0){
			return <View style={styles.redDot}></View>
		}

		return null;
	}

	handlePressItem(tabIndex){

		let {data, onChange} = this.props;

		if(tabIndex !== this.state.currentIndex){
			onChange(data[tabIndex], tabIndex);

			this.setState({
				currentIndex: tabIndex
			});
		}
	}

	static propTypes = {
		data: PropTypes.array.isRequired,
		hasUnderline: PropTypes.bool,
		hasAnimated: PropTypes.bool,
		hasRedDot: PropTypes.bool,
		currentIndex: PropTypes.number,
		barTintColor: PropTypes.string,
		tintColor: PropTypes.string,
		color: PropTypes.string,
		underlayColor: PropTypes.string,
		onChange: PropTypes.func
	};
	static defaultProps = {
		data: [],
		hasUnderline: true,
		hasAnimated: true, // 是否使用下划线动画，不用的话，使用border
		hasRedDot: false, // 小红点
		currentIndex: 0,
		barTintColor: 'white',
		tintColor: '#099fde',
		textColor: '#999',
		underlayColor: '#d9d9d9',
		onChange: ()=>{}
	};

}