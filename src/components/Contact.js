import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends React.Component {

    // react-hot-loader의 side effect로
    // 소스 반영시 constructor가 호출되지 않음
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            selectedKey: -1,
            contactData: [{
                name: 'Smith',
                phone: '010-1234-1252'
            }, {
                name: 'Taylor',
                phone: '010-1325-5863'
            }, {
                name: 'Betty',
                phone: '010-2496-9380'
            }]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: this.state.selectedKey != key ? key : -1
        });
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove() {
        this.setState({
            contactData: update(this.state.contactData, { $splice: [[this.state.selectedKey, 1]] }),
            selectedKey: -1
        });
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        })
    }

    // 이하 Component LifeCycle API

    // constructor(props) {
    //      // 기본 state 설정
    //      ...
    // }

    componentWillMount() {
        // DOM 처리 불가
        const contactData = localStorage.contactData;
        if ( contactData ) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    // componentDidMount() {
    //      // setTimeout, setInterval, ajaxCall
    //      // DOM 처리 가능
    // }

    // componentWillRecieveProps(nextProps) {
    //      // setState 가능
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //      // props/state 변경시 리렌더링 여부 반환
    // }

    // componentWillUpdate(nextProps, nextState) {
    //      // 절대 setState 사용 금지 -> 무한Loop
    // }

    componentDidUpdate(prevProps, prevState) {
        // 절대 setState 사용 금지 -> 무한Loop
        if ( JSON.stringify(prevProps.contactData) != JSON.stringify(this.state.contactData) ) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    // componentWillUnmount() { ... }

    render() {
        const mapToComponents = (data) => {
            // 기본 unicode에 따른 sorting
            data.sort();
            // keyword에 의한 filtering
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >= 0;
            });
            return data.map((contact, i) => {
                return (<ContactInfo 
                            contact={contact} 
                            key={i}
                            // 버튼에 bind 했던 onClick과 달리
                            // 컴포넌트는 props로 전달되는 것에 주의 
                            onClick={() => { this.handleClick(i); }}/>);
            });
        }

        return (
            <div>
                <h1>Contact</h1>
                <input
                    name='keyword'
                    placeholder='Search'
                    value={this.state.keyword}
                    onChange={this.handleChange}/>
                <ul>
                    {mapToComponents(this.state.contactData)}
                </ul>
                <ContactDetail 
                    isSelected={this.state.selectedKey >= 0}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}/>
                <ContactCreate
                    onCreate={this.handleCreate}/>
            </div>
        );
    }
}