/*
  Create by Citrusbug
  Title : Component Page
  Description :  Component contain all the logic here which need to be in viewing page.
  Date : 09-01-2018
  Time : 12:05 PM
*/
// Import different package as required
import React from 'react';
import { Grid, Table, Header, Popup, Image, Button } from 'semantic-ui-react';
// Import images as required
import VideoPlay from 'Assets/graphics/icons/video-play.svg';
import Assignment from 'Assets/graphics/icons/assignment.svg';
import Statistics from 'Assets/graphics/icons/statistics.svg';
import Map from 'Assets/graphics/icons/map.svg';
import Settings from 'Assets/graphics/icons/settings.svg';
import VideoQuizStatstics from "Containers/statistics";
//Import style sheet 
import './styles.less';
// Export defult class
export default class Contents extends React.Component {
  // Initate state for the component
  state = {
    isOpen: false, 
    selectedItem: {}, 
    videoStatusData: {},
    labelsArray: [],
    dataArray: [],
  }
  
  //Handle open state for differnt state
  handleOpen = (item) => {
    this.props.getVideoStastics({videoId : item.id})
    this.props.getVideoQuizStastics({ videoId: item.id })
    this.setState({ isOpen: true, selectedItem: item })
  }
  

  openHandler = () => {
    console.log(this.props);
  }

  handlerClose = () => {
    this.setState({ isOpen: false, selectedItem: {} })
  }
  // Date filtration 
  endAfterStart( end) {
    var startDate = new Date();
    var endDate = new Date(end);

    return endDate.getTime() >= startDate.getTime();
  } 
  // Formate date and time as required
  formatDate(date,time) {
    
    if(date == null){
      return '-';
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      locale = "en-us",
      year = d.getFullYear();
    var hrs = d.getHours();
    var min = d.getMinutes();
    if(!time){
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      month = d.toLocaleString(locale, {
        month: "short"
      });

      return [day, month, year].join(' ');
    }else{
      let hour = hrs;
      let min = d.getMinutes();
      let part = hour > 12 ? 'PM' : 'AM';

      min = (min + '').length == 1 ? `0${min}` : min;
      hour = hour > 12 ? hour - 12 : hour;
      hour = (hour + '').length == 1 ? `0${hour}` : hour;
      return hour+':'+min+''+part;
    }
    
  }
  // Dynamically generate table
  generateRowsForAll(item,moduleId){
    if (item.moduleId === moduleId){
      const row = (<Table.Row key={item.id}>
          <Table.Cell>
            <Image src={item.type === "video" ? VideoPlay : Assignment} />
          </Table.Cell>
          <Table.Cell className="content">
            <Header as="h4">
              <Header.Content>
                {item.name}
                
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell className="status">
            <p className={this.endAfterStart(item.endDate) ? 'indicators green' : 'indicators'} />
            {this.endAfterStart(item.endDate) ? 'Active' : 'Expired'}
          </Table.Cell>
          <Table.Cell />
          <Table.Cell className="start-date">
            <Header as="h4">

              {item.startDate != null ?
                <Header.Content>
                  {this.formatDate(item.startDate, false)}
                  <Header.Subheader>{this.formatDate(item.startDate, true)}</Header.Subheader>
                </Header.Content>
                : <Header.Content> - </Header.Content>}

            </Header>
          </Table.Cell>
          <Table.Cell className="end-date">
            <Header as="h4">
              {item.endDate != null ?
                <Header.Content>
                  {this.formatDate(item.endDate, false)}
                  <Header.Subheader>{this.formatDate(item.endDate, true)}</Header.Subheader>
                </Header.Content>
                : <Header.Content> - </Header.Content>}

            </Header>
          </Table.Cell>
          <Table.Cell className="views">
            10
          </Table.Cell>
          <Table.Cell />
          <Table.Cell >
            <Image src={Statistics} title="Statistics" className="icon-opacity" onClick={() => this.handleOpen(item)} />
          </Table.Cell>
          <Table.Cell>
            <Popup
              trigger={<Image src={Map} className="icon-opacity" />}
              content="Map"
              position="top center"
              inverted
            />
          </Table.Cell>
          <Table.Cell>
            <Popup
              trigger={<Image src={Settings} className="icon-opacity" />}
              content="Settings"
              position="top center"
              inverted
            />
          </Table.Cell>
        </Table.Row>);
      return row 
    }
  }
  // Render the component html 
  render() {
    const { modules, exam, video, history, practice } = this.props;
    return (
      <div>
        {/* Calling Video stastics Component to render with passing some parameter*/}
        <VideoQuizStatstics handlerClose={this.handlerClose} lectureDetail={this.state.selectedItem} isOpen={this.state.isOpen} />
        {modules.length > 0 && modules.map(module => (
          <div key={`module_${module.id}`}>
          <Grid>
            <Grid.Row columns={2} className="course-admin-contents">
              <Grid.Column style={{ paddingLeft: 0 }}>
                  <p className="contents-left-heading">{module.name}</p>
                  Lectures and Assignments
              </Grid.Column>
              <Grid.Column style={{ paddingRight: 0 }}>
                <a  className="contents-right-heading" 
                  href='/course/add-assignment/1'
                >
                  + Add Assignment
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="contents-table-container">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Content</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2'>Status</Table.HeaderCell>
                  <Table.HeaderCell>Start Date</Table.HeaderCell>
                  <Table.HeaderCell>End Date</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2'>Views</Table.HeaderCell>
                  <Table.HeaderCell colSpan='3'>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              
              <Table.Body>

                {video.length > 0 &&
                  video.map((item, index) => (
                    this.generateRowsForAll(item,module.id)
                  ))
                }

                {exam.length > 0 &&
                  exam.map((item, index) => (
                    this.generateRowsForAll(item, module.id)
                  ))
                }
                
                {practice.length > 0 &&
                  practice.map((item, index) => (
                    this.generateRowsForAll(item, module.id)
                  ))
                }
              </Table.Body>
            </Table>
          </div>
        </div>
        ))}
      </div>
    )
  }
};