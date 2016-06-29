# react-native-tabcontrol

选项卡

### Getting started

安装

	npm install react-native-tabcontrol --save

使用

	// ...
	
	import Tab from 'react-native-tabcontrol';
	
	class MyApp extends Component{
		return (
			<Tab
				// hasAnimated={false}
				data={[
					'选项1',
					'选项2',
					'选项3'
				]}

				style={{
					marginTop: 20
				}}

				tintColor='red'

				currentIndex={2}

				onChange={(index, text)=>{
				 	alert('index:' + index + '\n' + 'text:' + text);
				}}
			/>
		)
	}


### API

- **data** - (Array) - 数据，必须
- **currentIndex** - (Number) - 初始化选中项，默认`0`
- **onChange** - (Function) - 切换选项回调；
	- **参数1** index 当前选项索引
	- **参数2** text 当前选项文本
- **tintColor** - (String) - 显示颜色
- **barTintColor** - (String) - 背景颜色
- **underlayColor** - (String) - 触摸操作时显示出来的底层的颜色
- **style** - (Object) - 设置样式
- **hasUnderline** - (Boolean) - 高亮时有下划线，默认`true`
- **hasAnimated** - (Boolean) - 切换显示下划线动画，默认`true`
