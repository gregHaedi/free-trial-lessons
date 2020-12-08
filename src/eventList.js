import React, { Component } from 'react'
import { load } from './spreadsheet'
import config from './config'

class EventList extends Component {
  
  state = {
    error: null,
    events: [],
    results: 0
  }

  componentDidMount() { // load the JavaScript client library
    window.gapi.load('client', this.start)
  }

  onLoad = (data, error) => {
    if (data) {
      this.setState({
        events: data.events,
        results: data.events.length
      })
    } else {
      this.setState({ error })
    }
  }

  start = () => {
    window.gapi.client // initialize the JavaScript client library.
      .init({
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        load(this.onLoad) // initialize and make the API request.
      })
  }

  render() {
    const {events, results, error} = this.state

    if (error) {
      return <div>{this.state.error}</div>
    }

    return (
      <div>
        <form method="post" id="event-form">

        <h1>Free Trial Lessons<span class="hint">{results} item(s)</span></h1>

        <table>
          <thead>
            <tr>
              <th>#</th><th>lcid</th><th class="tLeft">location</th><th>language</th><th>date</th><th>time</th>
            </tr>
          </thead>
          <tbody>
            { events.map((event,i) => (
            <tr>
              <td>{ i+1 }</td>
              <td>{ event.lcid }</td>
              <td class="tLeft">{ event.locationName }</td>
              <td>{ event.language }</td>
              <td>{ event.formatedDate }</td>
              <td>{ event.time }</td>
            </tr>
            )) }
          </tbody>
        </table>
        </form>
      </div>
    )
    
  }
}

export default EventList