import React, {Component} from 'react';

import TabBar from 'react-native-tabcontrol';

export default class TabBarExample extends Component{

	render(){
		return (
			<TabBar
				// hasAnimated={false}
				// hasUnderline={false}
				data={[
					'选项1',
					'选项2',
					'测试'
				]}

				style={{
					marginTop: 20
				}}

				tintColor='red'

				currentIndex={2}

				// onChange={(index, text)=>{
				// 	alert('index:' + index + '\n' + 'text:' + text);
				// }}
			/>
		)
	}
}