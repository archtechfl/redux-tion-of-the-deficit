import C from '../constants';
import { combineReducers } from 'redux';

export const hexCode = function(state="FFFFFF", action){

	switch (action.type) {
		case C.SET_HEX_CODE:
			console.log("Setting hex code");
			return action.payload.hexCode;
		default:
			return state;
	}

}

export const colorName = function(state="white", action){

	switch (action.type) {
		case C.SET_COLOR_NAME:
			console.log("Setting color name");
			return action.payload.colorName;
		default:
			return state;
	}

}

export const rgbCodes = function(state={"red": 255, "green": 255, "blue": 255}, action){

	switch (action.type) {
		case C.SET_RED:
			console.log("Setting red");
			return {
				...state,
				red: action.payload.hexValue
			};
		case C.SET_GREEN:
			console.log("Setting green");
			return {
				...state,
				green: action.payload.hexValue
			};
		case C.SET_BLUE:
			console.log("Setting blue");
			return {
				...state,
				blue: action.payload.hexValue
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