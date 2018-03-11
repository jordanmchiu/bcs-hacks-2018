import React from 'react';
import './App.css'

const EntryForm = ({addEntry, addDriver}) => {
    let currUrl
    let time
    let priority
    let drivers
    let startloc
    let endloc
    return (
        <div className="form">

            <input className="submit-input-url" placeholder="Enter Craigslist URL" ref={node => {
                currUrl = node;
            }} />
            <input className="submit-input-time" placeholder="Enter appointment time HH:MM" ref={node => {
                time = node;
            }} />
            <input className="submit-input-priority" placeholder="Enter Priority: high, low, medium" ref={node => {
                priority = node;
            }} />
            <input className="submit-input-drivers" placeholder="Enter Number of Searchers" ref={node => {
                drivers = node;
            }} />
            <input className="submit-input-startloc" placeholder="Start point: 2350 Wesbrook Mall" ref={node => {
                startloc = node;
            }} />
            <input className="submit-input-endloc" placeholder="End point: 2366 Main Mall" ref={node => {
                endloc = node;
            }} />
            <button className="add" onClick={() => {
                addEntry(currUrl.value, time.value, priority.value);
                currUrl.value = '';
                time.value = '';
                priority.value = '';
            }}>
                add URL
            </button>
            <button className="submit" onClick={() => {
                addEntry(currUrl.value, time.value, priority.value);
                addDriver(drivers.value, startloc.value, endloc.value);
                currUrl.value = '';
                time.value = '';
                priority.value = '';
                drivers.value = '';
                startloc.value = '2350 Wesbrook Mall';
                endloc.value = '2366 Main Mall';
            }}>
                submit
            </button>
        </div>
    )
}

export default EntryForm
