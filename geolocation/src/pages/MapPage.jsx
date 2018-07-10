import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getData } from '../store/maps/maps.action'
import '../styles/mapStyle.css';
import Leaflet from 'leaflet'
import { ACCESS_TOKEN } from '../config'

class MapPage extends Component {
  componentDidMount () {
    this.props.getData();
    this.initialSetup()
  }

  initialSetup = () => {
    var mymap = Leaflet.map('mapId').setView([51.505, -0.09], 13);
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: ACCESS_TOKEN
}).addTo(mymap);
  }

  render() {    
    return (
      <div>
        <div id="mapId"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { map: state.map.mapData.data, loading: state.map.loading }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  getData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);