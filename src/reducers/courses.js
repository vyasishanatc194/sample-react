/*
  Create by Citrusbug
  Title : Course Reducer
  Description :  Reducer file helping us to get data and update the current state.
  Date : 09-01-2018
  Time : 12:03 PM
*/

// Import Actions
import * as types from 'Actions/actionTypes';

// Initiate defualt state
const INITIAL_STATE = {
  courseList: {
    status: 'empty',
  },
  coursePercentage: {
    status: 'empty',
  },
  editableCourses: {
    status: 'empty'
  },
  courseDetails: {
    jsons: {
      content: [],
    },
    status: 'empty',
  },
  selectedCourse: {
    status: 'empty',
  },
  courseContent:{
    practice : {},
    modules:{},
    video:{},
    exam:{},

  },
  courseStudent:{},
  videoStastics : [],
  videoQuizStastics : [],
  quizChartData : []
  
};
//create constant which have initial state and update state
const courses = (state = INITIAL_STATE, action) => {
  //Switch case which take action type and update related state values
  switch (action.type) {
    case types.GET_COURSES:
      return {
        ...state,
        courseList: action,
      };
    case types.GET_COURSES_PROGRESS_PERCENTAGE:
      return {
        ...state,
        coursePercentage: action,
      }
    case types.GET_EDITABLE_COURSES:
      return {
        ...state,
        editableCourses: action,
      }
    case types.GET_STUDENT_COURSE_PROGRESS:
      return {
        ...state,
        courseDetails: action,
      };
    case types.GET_COURSE_NAME:
      return {
        ...state,
        selectedCourse: action,
      };
    case types.GET_CONTENTS:
      if (action.status != "fail"){
        return {
          ...state,
          courseContent: action.jsons,
        };
      }else{
        return {
          ...state,
          
        };
      }
    case types.GET_COURSES_STUDENT_PROGRESS:
      if (action.status != "fail") {
        return {
          ...state,
          courseStudent: action.jsons,
        };
      } else {
        return {
          ...state,

        };
      }
    case types.GET_VIDEO_STATUS:
      return {
        ...state,
        videoStastics: action,
      };
    case types.GET_VIDEO_QUIZ_STATUS:
      return {
        ...state,
        videoQuizStastics: action,
      };
    case types.RESET_VIDEO_QUIZ_STATUS:
      return {
        ...state,
        videoQuizStastics: [],
      };
    case types.GET_QUIZ_ANSWER_CHART_DATA:
      return {
        ...state,
        quizChartData: action,
      };
    case types.RESET_QUIZ_ANSWER_CHART_DATA:
      return {
        ...state,
        quizChartData: [],
      };
    default:
      return {
        ...state,
      };
  }
};

//Export the constaten with updated state
export default courses;
