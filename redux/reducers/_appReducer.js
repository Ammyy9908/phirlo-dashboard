const intialState = {
    user:null,
    consignments:null,
    alert:false,
    user_analytics:null,
    points_analytics:null,
}



export default function AppReducer(state = intialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_POINTS_ANALYTICS':
            return {
                ...state,
                points_analytics: action.points_analytics
            }

        case "SET_USER_ANAYLITICS":
            return {
                ...state,
                user_analytics: action.user_analytics
            }


            case 'SET_ALERT':
            return {
                ...state,
                alert: action.alert
            }
            case 'SET_CONSIGNMENTS':
            return {
                ...state,
                consignments: action.consignments
            }
        default:
            return state;
    }
}