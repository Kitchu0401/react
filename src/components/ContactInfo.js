import React from 'react';

export default class ContactInfo extends React.Component {
    render() {
        return (
            <li onClick={this.props.onClick}>{this.props.contact.name}</li>
        );
    }
}