import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * Usage example
 * <SvgIcon iconName='hamburger' svgStyle={width: 50, height: 32, color: {Colors.secondaryButton}, fill: {'#d8d8d8'} />
 */
const SvgComponent = (props) => {
        let exactSizes = props.svgStyle.exactSizes && props.svgStyle.exactSizes === true ? 1 : 1.15;
        let fill = props.svgStyle.fill ? props.svgStyle.fill : '#fff';
        let width = props.svgStyle.width ? props.svgStyle.width / exactSizes : 50;
        let height = props.svgStyle.height ? props.svgStyle.height / exactSizes : 32;

        let iconName = props.iconName ? props.iconName : null;
        // Log.debug('SvgComponent: ', {lineColor: lineColor, fill: fill, width: width, height: height, iconName: iconName, props: props, });

        if (iconName === 'gallery_back')
        {
                return (
                  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 48">
                          <Path fill={fill} d="M23 48a2 2 0 01-1 0L1 26a3 3 0 010-4L22 0a2 2 0 013 0 2 2 0 010 3L3 24l22 21a2 2 0 01-2 3z"/>
                  </Svg>
                );
        }
        else if (iconName === 'gallery_forward')
        {
                return (
                  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 48">
                          <Path fill={fill} d="M2 48a2 2 0 01-2-3l22-21L0 3a2 2 0 010-3 2 2 0 013 0l21 22a3 3 0 010 4L3 48a2 2 0 01-1 0z"/>
                  </Svg>
                );
        }
        else
        {
                return null;
        }
};

class MySVGIcon extends Component {
        render() {
                const { style } = this.props;
                const component = SvgComponent(this.props);

                return <View style={style}>{component}</View>;
        }
}

export default MySVGIcon;