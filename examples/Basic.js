import React, {Component} from 'react';

import {
	View,
	Text,
	Platform
} from 'react-native';

import TabView from '../../libs/react-native-tabcontrol';

export default class TabBarExample extends Component{

	render(){
		return (
			<View style={{marginTop: Platform.OS === 'ios' ? 20 : 0}}>
				<TabView
					// hasAnimated={false}
					// hasUnderline={false}
					hasRedDot={true}

					data={[
						{
							value: '全部'
						},
						{
							value: '降价(99+)',
							unread: 5
						},
						{
							value: '失效(8)'
						}
					]}

					// tintColor='green'

					// currentIndex={0}

					onChange={(item, index)=>{
						// alert('index:' + index + '\n' + 'value:' + item.value);
						item.unread = 0
					}}
				/>
			</View>
		)
	}
}