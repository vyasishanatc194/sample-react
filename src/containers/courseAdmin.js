/*
  Create by Citrusbug
  Title : Course Container
  Description :  Container File which connect state and component with calling actions
  Date : 09-01-2018
  Time : 12:15 PM
*/
// Import different package as required
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CourseAdmin from '../pages/CourseAdmin'
import socketApiRequest from 'Actions/socketApiRequest';
import * as types from 'Actions/actionTypes';
// mapstatetoprops is use to set props from the initial state
const mapStateToProps = state => ({
  user: state.user.details,
  courseList: state.courses.courseList,
  coursePercentage: state.courses.coursePercentage,
  courseContent: state.courses.courseContent,
  selectedCourse: state.courses.selectedCourse,
  videoQuizStastics: state.courses.videoQuizStastics,
  videoStastics: state.courses.videoStastics,

});
//combine the function or update the initial state function will be use in mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(socketApiRequest({ type: types.GET_COURSES })),
  getCourseProgress: () => dispatch(socketApiRequest({ type: types.GET_COURSES_PROGRESS_PERCENTAGE })),
  getCourseContent: (params) => dispatch(socketApiRequest({ ...params, type: types.GET_CONTENTS })),
  getVideoStastics: (params) => dispatch(socketApiRequest({ ...params, type: types.GET_VIDEO_STATUS })),
  getVideoQuizStastics: (params) => dispatch(socketApiRequest({ ...params, type: types.GET_VIDEO_QUIZ_STATUS })),
  
});

//Export with router to routing and connect component to mapStateToProps and mapDispatchToProps
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseAdmin));