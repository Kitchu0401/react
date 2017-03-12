import React from 'react';

export default class ContactDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        if ( !this.state.isEdit ) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            this.handleEdit();
        }

        // setState는 비동기 함수이기 때문에
        // 후술된 console.log 함수보다 늦게 실행된다.
        this.setState({
            isEdit: !this.state.isEdit
        });
        // console.log(this.state.edit);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress(e) {
        if ( e.charCode === 13 ) {
            this.handleToggle();
        }
    }

    render() {
        const edit = (
            <div>
                <p>
                    Name: 
                    <input 
                        type='text'
                        name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </p>
                <p>
                    Phone: 
                    <input
                        type='text'
                        name='phone'
                        placeholder='phone'
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </p>
            </div>
        );
        const detail = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const view = this.state.isEdit ? edit : detail;
        const blank = (<div>Not selected</div>);

        return (
            <div>
                <h2>Contact Detail</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? 'Ok' : 'Edit'}
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }

}

ContactDetail.defaultProps = {
    contact: {
        name: '',
        phone: '',
        onEdit: () => { console.error('onEdit not defined.'); },
        onRemove: () => { console.error('onRemove not defined.'); }
    }
}