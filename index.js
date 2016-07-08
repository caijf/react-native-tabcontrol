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

/**
 * TabBar
 * 选项卡组件
 * @class TabBar
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

		this.deviceWidth = Dimensions.get('window').width;
	}

	componentWillMount(){
		
		let {currentIndex, data} = this.props;

		this.underlineWidth = this.deviceWidth / data.length;

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

	render(){

		let {hasUnderline, hasAnimated, style, barTintColor, data} = this.props;

		if(data.length <= 0) return;

		// 下划线动画
		if(hasUnderline && hasAnimated){
			this.handleUnderlineAnimation();	
		}

		let barStyle = Object.assign({}, styles.container, style, barTintColor ? {backgroundColor: barTintColor} : {});

		return (
			<View>
				<View style={barStyle}>
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
			underlineStyle = Object.assign({}, styles.underline, { position: 'absolute', width: this.underlineWidth}, tintColor ? {backgroundColor: tintColor} : {});

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

		let {hasUnderline, hasAnimated, data, tintColor, underlayColor} = this.props;

		let items = [],
			itemHighlightStyle = {},
			itemTextHighlight = Object.assign({}, styles.itemText_highlight, tintColor ? { color: tintColor} : {});

		if(hasUnderline && !hasAnimated){
			itemHighlightStyle = Object.assign({}, styles.item_highlight, tintColor ? { borderBottomColor: tintColor} : {});
		}

		for(let i = 0, len = data.length; i < len; i++){

			items.push(
				<TouchableHighlight style={[
						styles.item,
						this.state.currentIndex === i ? itemHighlightStyle : null
					]}
					underlayColor={underlayColor}
					onPress={this.handlePressItem.bind(this, data[i])} 
					key={'tabview_hd_' + i}
				>
						<Text style={[
								styles.itemText, 
								this.state.currentIndex === i ? itemTextHighlight : null
							]}
						>{data[i]}</Text>
				</TouchableHighlight>
			)
		}

		return items;
	}

	handlePressItem(text){

		let {data, onChange} = this.props;

		let currentIndex = data.indexOf(text);

		if(currentIndex !== this.state.currentIndex){
			onChange(currentIndex, text);

			this.setState({
				currentIndex: currentIndex
			});
		}

	}

	static propTypes = {
		hasUnderline: PropTypes.bool,
		hasAnimated: PropTypes.bool,
		currentIndex: PropTypes.number,
		data: PropTypes.array,
		style: PropTypes.object,
		barTintColor: PropTypes.string,
		tintColor: PropTypes.string,
		underlayColor: PropTypes.string,
		onChange: PropTypes.func
	};
	static defaultProps = {
		hasUnderline: true,
		hasAnimated: true, // 是否使用下划线动画，不用的话，使用border
		currentIndex: 0,
		data: [], // 注意数据重复
		style:{},
		barTintColor: '',
		tintColor: '',
		underlayColor: '#dcdcdc',
		onChange: ()=>{}
	};

}