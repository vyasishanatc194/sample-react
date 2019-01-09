/*
  Create by Citrusbug
  Title : Content Container
  Description :  Container File which connect state and component with calling actions
  Date : 09-01-2018
  Time : 12:05 PM
*/
// Import different package as required
import { connect } from 'react-redux';
import * as types from 'Actions/actionTypes';
import ContentsModal from 'Components/CourseAdmin/Contents/';
import socketApiRequest from 'Actions/socketApiRequest';
// mapstatetoprops is use to set props from the initial state
const mapStateToProps = state => ({
    user: state.user.details,
    selectedCourse: state.courses.selectedCourse,
    videoQuizStastics: state.courses.videoQuizStastics,
    videoStastics: state.courses.videoStastics,
});
//combine the function or update the initial state function will be use in mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    getVideoStastics: (params) => dispatch(socketApiRequest({ ...params, type: types.GET_VIDEO_STATUS })),
    getVideoQuizStastics: (params) => dispatch(socketApiRequest({ ...params, type: types.GET_VIDEO_QUIZ_STATUS })),
});

//Export with router to routing and connect component to mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(ContentsModal);
