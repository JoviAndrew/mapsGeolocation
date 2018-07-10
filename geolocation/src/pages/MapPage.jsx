import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getData, getAlertData } from '../store/maps/maps.action'
import Leaflet from 'leaflet'
import { ACCESS_TOKEN } from '../config';
import '../styles/mapStyle.css';

class MapPage extends Component {
  componentDidMount () {
    this.props.getData();
    this.props.getAlertData();
    this.initialSetup()
  }

  constructor() {
    super()
    this.state = {
      currentMap: '',
      isShown: false,
      markers: []
    }
  }
  
  initialSetup = () => {
    var mymap = Leaflet.map('mapId').setView([-6.1753924,106.82496419], 13);
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: ACCESS_TOKEN
    }).addTo(mymap);
    this.setState({currentMap: mymap})
  }

  renderMarker = () => {
    if(!this.state.isShown)
    {
      let markers = []
      this.props.map.forEach(mapData => {
        let marker = Leaflet.marker([mapData.lat, mapData.lng]).addTo(this.state.currentMap);
        marker.bindPopup(
          `<img src=${mapData.image_url} alt=${mapData.image_url} height="300" width="300"/><br>
            <b style="font-size: 30">${mapData.title}</b><br>
            <p>${mapData.description}</p>
            <p style="color:blue; font-weight:bold">${mapData.tag1}, ${mapData.tag2}</p>
          `
        );
        markers.push(marker)
      })
  
      this.props.alertData.alerts.forEach(alert => {
        let marker = Leaflet.marker([alert.location.y, alert.location.x]).addTo(this.state.currentMap);
        marker.bindPopup(
          `<b><p style="font-size:">${alert.subtype}</p></b>`
        )
        markers.push(marker)
      })
      this.setState({isShown: true, markers: markers})
    }
  }

  hideMarker = () => {
    if (this.state.isShown) {
      this.state.markers.forEach(marker => {
        marker.setOpacity(0)
      })
      this.setState({isShown: false})
    }
  }

  render() {
    return (
      <div>
        <div id="mapHeader">
          <label className="markerLabel">Marker Control:</label>
          <button className="btn btn-outline-primary m-3" onClick={this.renderMarker}>Show</button>
          <button className="btn btn-outline-primary m-3" onClick={this.hideMarker}>Hide</button>
        </div>
        <div id="mapId"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    map: state.map.mapData.data,
    alertData: state.map.alertData.data,
    loading: state.map.loading 
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  getData,
  getAlertData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);