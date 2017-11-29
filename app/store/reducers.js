import C from '../constants';
import { combineReducers } from 'redux';

export const hexCode = function(state="000000", action){

	switch (action.type) {
		case C.SET_HEX_CODE:
			return action.payload.hexCode;
		default:
			return state;
	}

}

export const colorName = function(state="Black", action){

	switch (action.type) {
		case C.SET_COLOR_NAME:
			return action.payload.colorName;
		default:
			return state;
	}

}

export const rgbCodes = function(state={"red": 0, "green": 0, "blue": 0}, action){

	switch (action.type) {
		case C.SET_RED:
			return {
				...state,
				red: action.payload.rgbValue
			};
		case C.SET_GREEN:
			return {
				...state,
				green: action.payload.rgbValue
			};
		case C.SET_BLUE:
			console.log(`Update blue: ${action.payload.rgbValue}`);
			return {
				...state,
				blue: action.payload.rgbValue
			};
		case C.UPDATE_ALL_RGB:
			return {
				...state,
				red: action.payload.red,
				green: action.payload.green,
				blue: action.payload.blue
			};
		default:
			return state;
	}

}

export default combineReducers({
	hexCode,
	colorName,
	rgbCodes
})