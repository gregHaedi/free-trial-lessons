import React, { Component } from 'react'
import { load } from './spreadsheet'
import { googleSettings, languageMap } from './config'

class EventList extends Component {
  
  state = {
    error: null,
    events: [],
    options: [],
    results: 0,
    selected: ''
  }

  componentDidMount() { // load the JavaScript client library
    window.gapi.load('client', this.start)
  }

  onLoad = (data, error) => {
    if (data) {
      // consolidate lcid and location name options and sort them
      let unique = {}
      for (let item of data.events) {
        unique[item.lcid] = item.locationName
      }
      this.setState({
        events: data.events,
        results: data.events.length,
        options: Object.entries(unique).sort((a, b) => a[1].localeCompare(b[1]))
      })
    } else {
      this.setState({ error })
    }
  }

  start = () => {
    window.gapi.client // initialize the JavaScript client library.
      .init({
        apiKey: googleSettings.apiKey,
        discoveryDocs: googleSettings.discoveryDocs
      })
      .then(() => {
        load(this.onLoad) // initialize and make the API request.
      })
  }

  renderLClist = () => (
    this.state.options.length ? (
      <select name="lcid" id="lcid" onChange={e => this.handleChange(e)}>
      { this.state.options.map((option, i) => (
        <option id={ i } value={ option[0] }>{ option[1] }</option>
      )) }
      </select>
    ) : (
      <div>
        <p>We do not offer free trail lessons at the moment. Please do not hesitate to send us a message.</p>
        <textarea name="message" id="message" rows="3"></textarea>
      </div>
    )
  );

  handleChange = e => {
    // const selected = e.target.value;
    console.log(e.target.value);
  }

  render() {
    const {events, results, error} = this.state

    if (error) {
      return <div>{ this.state.error }</div>
    }

    return (
      <div>
        <form method="post" id="event-form">

        <h1>Free Trial Lessons<span className="hint">{results} item(s)</span></h1>

        <div className="lc-list">{ this.renderLClist() }</div>

        <table>
          <thead>
            <tr>
              <th>#</th><th>lcid</th><th className="tLeft">location</th><th className="tLeft">language</th><th>date</th><th>time</th>
            </tr>
          </thead>
          <tbody>
            { events.map((event,i) => (
            <tr>
              <td>{ i+1 }</td>
              <td>{ event.lcid }</td>
              <td className="tLeft">{ event.locationName }</td>
              <td className="tLeft">{ languageMap[event.language] }</td>
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