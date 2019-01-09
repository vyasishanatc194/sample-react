/*
  Create by Citrusbug
  Title : Course Index Page
  Description :  This page containes all the logic for the screen
  Date : 09-01-2018
  Time : 12:15 PM
*/

// Import react
import React from "react";

// Import packages as requesirment, In this I need semantic-ui so I import it
import { Grid, Container, Header, Divider, Tab } from "semantic-ui-react";

//Import differnce layout and component which required
import Layout from "Containers/layout";
import Contents from "Containers/Contents";
import Students from "Containers/StudentsForCourse"

//Create class which contain all component logic and ui which make from extending react component
class CourseAdmin extends React.Component {
  //constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement
  constructor(props) {
    super(props);
    // State which having all basic data for the page
    this.state = {
      activeCategory: "Progress",
      courseId:0
    };
  }
  // Function which use for get percentage from the json
  getPercentage = id => {
    // While we are using redux we get the state from the middleware it use in component as props
    const course = this.props.coursePercentage.json.find(
      item => item.courseId === id
    );

    if (course) {
      return course.courseProgress;
    }
  };
  // Validate the button text
  validateCourseBtnText = id => {
    const percentage = this.getPercentage(id);

    if (!this.props.user.admin) {
      if (percentage > 0) {
        return "Continue Course";
      } else {
        return "Start Course";
      }
    } else {
      return "Go to Course";
    }
  };
  // Validate diferent style for button
  validateCourseBtnStyle = begin => {
    if (!begin && !this.props.user.admin) {
      return "grey-button";
    } else {
      return "blue-button";
    }
  };

  // Validate the circle style
  validateCourseCircleStyle = (begin, id) => {
    const percentage = this.getPercentage(id);
    if (!this.props.user.admin) {
      if (percentage > 0) {
        return "progressArea";
      } else {
        return "progressArea beginner";
      }
    } else {
      return "progressArea";
    }
  };
  // Redirect the course while clicking on button
  startCourse = course => {
    this.props.history.push(`/course/${course.id}/video/${course.videoId}`);
  };

  // handle on click event and change the state
  handleClickChangeCategory = data => {
    this.setState({ activeCategory: data.children });
  };
  // When page will be loaded then defult componentwillmount will be call.
  componentWillMount() {
    const { courseId } = this.props.match.params;
    this.setState({
      courseId: parseInt(courseId,10),
    })
    this.props.getCourseContent({ courseId: parseInt(courseId, 10) });
    this.props.getCourses();
    this.props.getCourseProgress();
    
  }
  // render the component
  render() {
    const { activeCategory } = this.state;
    const { courseList, courseContent , selectedCourse,coursePercentage, user } = this.props;
    const panes = [
    {
      menuItem: "Overview",
      render: () => (
        <Tab.Pane attached={false}>
          <h4 style={{ color: "#666", paddingTop: 20 }}>No Overview yet</h4>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Contents",
      render: () => (
        <Tab.Pane attached={false}>
          <Contents user={user} course={selectedCourse} modules={courseContent.modules} exam={courseContent.exam} practice={courseContent.practice} video={courseContent.video} history={history} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Students",
      render: () => (
        <Tab.Pane attached={false}>
          <Students courseId={this.state.courseId} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Settings",
      render: () => (
        <Tab.Pane attached={false}>
          <h4 style={{ color: "#666", paddingTop: 20 }}>No Settings yet</h4>
        </Tab.Pane>
      )
    }
  ];
    return (
      <div>
       <Layout/>
       <div className="page-contents-container">
         <Grid>
           <Grid.Row className="page-heading-container">
             <Grid.Column className="jumbotron">
               <Container>
                 <Header as="h3" style={{ marginBottom: "1.2em" }}>
                    {selectedCourse.courseName}
                 </Header>
                 <Divider />
               </Container>
             </Grid.Column>
           </Grid.Row>
           <Grid.Row className="tab-contents-row">
             <Grid.Column className="tab-contents-column">
               <Container>
                 <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
               </Container>
             </Grid.Column>
           </Grid.Row>
         </Grid>
       </div>
     </div>
    );
  }
}

// Export the class 
export default CourseAdmin;

