import { createStackNavigator } from 'react-navigation-stack';
import PositionScreen from '../pages/Position';
import SettingScreen from '../pages/Setting';
import RecodingScreen from '../pages/Recoding';

const StackNavigator = createStackNavigator({
  Position: PositionScreen,
  Setting: SettingScreen,
  Recoding: RecodingScreen,
});
export default StackNavigator;
